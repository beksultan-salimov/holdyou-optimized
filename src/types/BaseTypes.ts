
export interface IUploadImage {
  id: number;
  file: string;
  alt?: string | null;
}
export interface IPshAvatarGroup {
  img: string;
  link?: string;
  title?: string;
}

export interface ISpecialOffer {
  id: number;
  text: string;
  link_text: string;
  icon: string;
  url: string;
  is_active: boolean;
}