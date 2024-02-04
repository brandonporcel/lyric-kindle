export interface User {
  info: UserInfo | undefined;
}

export interface UserInfo {
  avatar_url: string;
  email: string;
  full_name: string;
  name: string;
  picture: string;
}
