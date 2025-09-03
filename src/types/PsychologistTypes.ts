export type PsychologistPhotoType =
  | 'md'
  | 'original'
  | 'sm'
  | 'thumbnail'
  | 'xs';
export interface IPshProblem {
  id: number;
  name: string;
}

export interface IFilterItem {
  id: number;
  type: string;
  text: string;
  order: number;
  is_active: boolean;
}

export interface IPsychologistDiploma {
  id: number;
  file: {
    original: string;
    thumbnail: string;
  };
  ordering: number;
  psychologist: number;
}
export interface IPsychologist {
  id?: string;
  activate?: boolean;
  online?: boolean;
  offline?: boolean;
  photo?: Record<PsychologistPhotoType, string>;
  fullname?: string;
  description?: string;
  experience?: 'string';
  experience_years?: number;
  approaches?: string;
  life_credo?: string;
  help_with?: string;
  work_principles?: string;
  values?: string;
  user?: number;
  filter_ids?: number[];
  filter_data?: IFilterItem[];
  centers?: number[];
  problems?: Array<IPshProblem>;
  reviews?: Array<any>;
  is_junior?: boolean;
  is_tester?: boolean;
  is_vip?: boolean;
  is_pair_consultation?: boolean;
  nearest_schedule: INearestTime;
  diplomas?: IPsychologistDiploma[];
  consultation_count?: number;
  features?: any;
  higher_education?: string;
  professional_courses?: string;
  another?: string;
  video_desktop?: string;
  video_mobile?: string;
}

export interface INearestTime {
  id: number;
  start_datetime: string;
  end_datetime: string;
  taken: boolean;
  psychologist: number;
}

export interface IPsychologistSchedule {
  id: string;
  start_datetime: string;
  end_datetime: string;
  taken: boolean;
  psychologist: number;
  time: string;
}
