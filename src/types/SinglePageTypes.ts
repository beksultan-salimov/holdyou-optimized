import { PAGE_TEMPLATES_TYPES } from "@/config";
import { LangType } from "@/config/i18n/settings";


export interface ISinglePagePreview {
  original: string
  thumbnail: string
}
export interface ISinglePage {
  id: number;
  title: string;
  preview: ISinglePagePreview;
  description: string;
  slug: string;
  author: number;
  html_content: string;
  created: string;
  updated: string;
  status: string;
  locale: LangType;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  template: PAGE_TEMPLATES_TYPES;
}
