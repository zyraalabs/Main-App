import { cliBackendAxiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";

interface ApproveRequestData {
  requestId: string;
  userId: string;
  token: string;
}

interface ApproveResponseData {
  success: boolean;
  data?: { message: string };
  error?: string;
}

export const approveCliLogin = (
  data: ApproveRequestData,
  authToken: string,
) => {
  return requestHandler(() =>
    cliBackendAxiosInstance.post<ApproveResponseData>(
      "/api/cli/login/approve",
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    ),
  )();
};
