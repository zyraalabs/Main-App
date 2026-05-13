"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";
import { profileSchema, type ProfileInput } from "@/lib/validations";

interface ProfileResponse {
  success: boolean;
  data: { message: string };
}

const updateProfile = requestHandler((data?: ProfileInput) =>
  axiosInstance.patch<ProfileResponse>("/dashboard/profile", data),
);

interface UseProfileOptions {
  defaultFirstName?: string;
  defaultLastName?: string;
}

export function useProfile({ defaultFirstName = "", defaultLastName = "" }: UseProfileOptions = {}) {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<ProfileInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(profileSchema as any),
    defaultValues: { firstName: defaultFirstName, lastName: defaultLastName },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setSuccessMessage("");

    const result = await updateProfile(data);

    if (result.code === "success") {
      setSuccessMessage("Profile updated successfully.");
    } else {
      const message = isAxiosError<{ error?: string }>(result.error)
        ? (result.error.response?.data?.error ?? "Failed to update profile.")
        : "Network error. Please try again.";
      form.setError("root", { message });
    }
  });

  return { form, onSubmit, successMessage };
}
