import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { config } from 'config/index';
import Session from './session';
import { Announcement } from './Types/Announcement';
import { CreateAnnouncementRequest } from './Models/Requests/CreateAnnoucementRequest';

export default class Api {
  public static createClient(): AxiosInstance {
    const headers = Api.getHeaders();

    const instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers,
    });

    return instance;
  }

  public static getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    } as Record<string, unknown>;
    const token = Session.getSessionToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers as AxiosRequestHeaders;
  }

  public static async getAnnoucements(
    tags?: string[],
  ): Promise<Announcement[]> {
    const response = await Api.createClient().get('/announcements/', {
      params: {
        tags: tags?.join(','),
      },
    });
    return response?.data;
  }

  public static async createAnnoucement(
    query: CreateAnnouncementRequest,
  ): Promise<Announcement[]> {
    const response = await Api.createClient().post('/announcement/', {
      query,
    });
    return response?.data;
  }
}
