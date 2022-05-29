import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { config } from 'config/index';
import Session from './session';
import { Announcement } from './Types/Announcement';
import { User } from './Types/User';
import { CreateAnnouncementRequest } from './Models/Requests/CreateAnnoucementRequest';
import { CreateAnnouncementResponse } from './Models/Responses/CreateAnnouncementResponse';
import { LoginResponse } from './Models/Responses/LoginResponse';
import { LoginRequest } from './Models/Requests/LoginRequest';
import { RegistrationResponse } from './Models/Responses/RegistrationResponse';
import { RegistrationRequest } from './Models/Requests/RegistrationRequest';
import { AddAnswerRequest } from './Models/Requests/AddAnwerRequest';
import { AddQuestionRequest } from './Models/Requests/AddQuestionRequest';
import { UpdateUserRequest } from './Models/Requests/UpdateUserRequest';

export default class Api {
  private static instance: AxiosInstance;

  public static createClient(): AxiosInstance {
    if (this.instance === undefined) {
      const headers = Api.getHeaders();
      this.instance = axios.create({
        baseURL: config.baseUrl,
        timeout: 10000,
        headers,
      });
    }
    return this.instance;
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

  public static async getAnnouncements(
    tags?: string[],
  ): Promise<Announcement[]> {
    const response = await Api.createClient().get('/announcements/', {
      params: {
        tags: tags?.join(','),
      },
    });
    return response?.data;
  }

  public static async createAnnouncement(
    query: CreateAnnouncementRequest,
  ): Promise<CreateAnnouncementResponse> {
    const response = await Api.createClient().post('/announcement/', query);
    return response?.data;
  }

  public static async getAnnoucementById(
    annoucementId: string,
  ): Promise<Announcement> {
    const response = await Api.createClient().get(
      `/announcement/${annoucementId}`,
    );
    return response?.data;
  }

  public static async login(body: LoginRequest): Promise<LoginResponse> {
    const response = await Api.createClient().post('/auth/login', body);

    if (response.data.token) {
      Session.saveSession(response.data.token);
    }

    return response?.data;
  }

  public static async register(
    body: RegistrationRequest,
  ): Promise<RegistrationResponse> {
    const response = await Api.createClient().post('/auth/register', body);
    return response?.data;
  }

  public static async getUser(email: string): Promise<User> {
    const response = await Api.createClient().get(`/users/${email}`);
    return response?.data;
  }

  public static async updateUser({ email, ...data }: UpdateUserRequest): Promise<void> {
    const response = await Api.createClient().put(`/users/${email}`, data);
    return response?.data;
  }

  public static async addNewQuestion({
    announcementId,
    question,
  }: {
    announcementId: string;
    question: AddQuestionRequest;
  }): Promise<any> {
    const response = await Api.createClient().post(
      `/announcement/${announcementId}/question`,
      question,
    );
    return response?.data;
  }

  public static async addNewAnswer({
    announcementId,
    questionId,
    answer,
  }: {
    announcementId: string;
    questionId: string;
    answer: AddAnswerRequest;
  }): Promise<any> {
    const response = await Api.createClient().post(
      `/announcement/${announcementId}/question/${questionId}/answer`,
      answer,
    );
    return response?.data;
  }

  public static async checkout({
    announcementId,
  }: {
    announcementId: string;
  }): Promise<any> {
    const response = await Api.createClient().post(
      `/announcement/${announcementId}/checkout`,
    );
    return response;
  }
}
