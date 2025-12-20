import apiClient from "@/api/clients";

export class UserApiService {
  static async getAllowedEmails(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>("/Users/GetAllowedEmails");

      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
