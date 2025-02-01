import instance, { request } from './instance';

interface AuthResponse {
  message:string,
  token: string;
  user:{
    username:string,
    role:string
  }
}
export class Auth {
  static login(username: string, password: string) {
    console.log(username,password)
    return instance.post<AuthResponse>(`/auth/admin`, { username, password });
  }
}
