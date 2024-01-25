import { showNotification } from "@mantine/notifications";
import { AxiosError, HttpStatusCode, AxiosResponse } from "axios";
import apiClient from "./apiClient";
import { LoginInput } from "../models/auth";
import { GetReq } from "../models/common-models";
import { GetResult } from "../models/result";
import { CreateAdminUserInput, CreateUserInput } from "../models/create-user";

export class ApiProvider {
  constructor(private readonly server: typeof apiClient) {}

  showAlertNotification(message: string, success: boolean) {
    showNotification({
      color: success ? "#6b7280" : "#9A031E",
      title: success ? "Success" : "Error",
      message,
    });
  }

  showAxiosErrorAlert(error: unknown | Error) {
    let message = "Something went wrong";
    if (error instanceof AxiosError && error.response) {
      message = error.response.data?.message ?? message;
    } else {
      message = String(error);
    }
    this.showAlertNotification(message, false);
  }

  isRequestSuccess(reqStatus: number): boolean {
    return (
      reqStatus === HttpStatusCode.Created || reqStatus === HttpStatusCode.Ok
    );
  }

  extractMessage(response: AxiosResponse) {
    const message: string = response.data?.message ?? "";
    return message;
  }

  extractData(response: AxiosResponse) {
    const data = response?.data?.data ?? [];
    return data;
  }

  async login(loginData: LoginInput) {
    try {
      const response = await this.server.post("auth", loginData);
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchAllUser(data: any) {
    try {
      const response = await this.server.get("user", { params: data });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchAllCourses(data: GetReq) {
    try {
      const response = await this.server.get("test", { params: data });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async addUserData(data: CreateUserInput) {
    try {
      const response = await this.server.post("/user", {
        date: data.date,
        ...data,
      });
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async UpdateUsers(data: any) {
    try {
      const response = await this.server.patch("/user", data);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchAllPosition(params: { page: number; search: string }) {
    try {
      const response = await this.server.get("position", { params: params });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchAllRole(params: { page: number; search: string }) {
    try {
      const response = await this.server.get("role", { params: params });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async viewQuestion(params: { page: number; search: string; id: number }) {
    try {
      const response = await this.server.get("question", { params: params });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async createQuestion(data: any) {
    try {
      const response = await this.server.post("/question", data);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async updateQuestion(data: any) {
    try {
      const response = await this.server.patch("/question", data);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async assignTest(data: any) {
    try {
      const response = await this.server.post("test/assign-test", data);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchReassignData(data: any) {
    try {
      const response = await this.server.get("test/get-reassign-tests", {
        params: data,
      });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async reassignTest(data: any) {
    try {
      const response = await this.server.patch("/test/test-reassign", data);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchAllResult(params: GetResult) {
    try {
      const response = await this.server.get("result", { params });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchAllTest(data: GetReq) {
    try {
      const response = await this.server.get("test/start-test", {
        params: data,
      });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async submitTest(data: any) {
    try {
      const response = await this.server.post("test/evaluate-test", data);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchDashBoardData() {
    try {
      const response = await apiClient.get("dashboard");
      if (this.isRequestSuccess(response.status)) {
        const data = response?.data?.data;
        return { isSuccess: true, data };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
      return { isSuccess: false };
    }
  }
}

export const apiProvider = new ApiProvider(apiClient);
