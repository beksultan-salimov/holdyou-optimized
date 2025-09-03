
export interface IOfflineCenter {
  id: number;
  address: string;
  phone: string;
  description: string;
  latitude: string;
  longitude: string;
  services: IOfflineCenterService[];
}

export interface IOfflineCenterService {
  id: number;
  center: number;
  name: string;
  descriptions: string;
  url?: string;
  service_descriptions: IOfflineCenterServiceDescription[];
}

export interface IOfflineCenterServiceDescription {
  id: number;
  service: number;
  text: string;
  price: string;
}