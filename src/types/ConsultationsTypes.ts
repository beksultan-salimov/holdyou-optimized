import { IService, IPsychologist, IPsychologistSchedule } from "."

export interface IMeeting {
  id: number
  meeting_id: string
  password: string
  sdk_key: string
  signature: string
}

export interface IAgoraCredentials {
  app_id: string;
  chanel_name: string;
  token: string;
  user_id: number;
}
export interface IConsultation {
  id: number;
  psychologist: IPsychologist;
  schedule: IPsychologistSchedule;
  type: 'video' | 'audio' | null;
  status: 'bought' | 'scheduled' | 'canceled' | 'provided';
  service_type: string;
  duration: string;
  duration_total: string;
  created_at?: string;
  expires_at?: string;
  ground_object_id?: any;
  user: number;
  service: IService;
  ground_content_type?: any;
  meeting: IMeeting;
  agora_credentials: IAgoraCredentials;
}
