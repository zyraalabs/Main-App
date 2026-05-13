"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";
import { passwordSchema, type PasswordInput } from "@/lib/validations";

interface PasswordResponse {
  success: boolean;
  data: { message: string };
}

const updatePassword = requestHandler((data?: PasswordInput) =>
  axiosInstance.post<PasswordResponse>("/dashboard/password", data),
);

export function usePassword() {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<PasswordInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(passwordSchema as any),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setSuccessMessage("");

    const result = await updatePassword(data);

    if (result.code === "success") {
      setSuccessMessage("Password updated successfully.");
      form.reset();
    } else {
      const message = isAxiosError<{ error?: string }>(result.error)
        ? (result.error.response?.data?.error ?? "Failed to update password.")
        : "Network error. Please try again.";
      form.setError("root", { message });
    }
  });

  return { form, onSubmit, successMessage };
}
