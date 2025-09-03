
export interface IUser {
  id: number;
  last_login: any;
  is_superuser: boolean;
  fullname: string;
  fullname_uk: string;
  fullname_ru: any;
  username: string;
  email: any;
  language: string;
  is_staff: boolean;
  is_confirmed: boolean;
  date_joined: string;
  groups: any[];
  user_permissions: any[];
  phone?: any;
  phone_slave?: any;
  photo?: {
    original: string,
    thumbnail: string,
    md: string,
    sm: string,
    xs: string,
  }
}

