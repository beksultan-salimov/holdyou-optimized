export enum ServiceEnum {
  pair = "pair",
  standard = "standard",
  subscription = "subscription",
  coop = "coop",
  junior = "junior",
  tester = "tester",
  vip = "vip",
}

export interface IService {
  id: number
  content_type_id?: number
  price: string
  type: ServiceEnum
  sessions: number
  minutes?: number
  duration?: string
  code?: string
  instead?: string
}

export interface IAllowedConsultation {
  count: number
  duration: number
  name: string
  service_type: ServiceEnum
}

export const ServicesForPrices = [
  ServiceEnum.pair,
  ServiceEnum.coop,
  ServiceEnum.standard,
  ServiceEnum.subscription,
  ServiceEnum.junior,
  ServiceEnum.vip,
];
// export const ServicesForTariffs = [ServiceEnum.pair, ServiceEnum.standard, ServiceEnum.subscription]
export const ServicesForCheckout = [
  ServiceEnum.standard,
  ServiceEnum.pair,
  ServiceEnum.subscription,
  ServiceEnum.coop,
  ServiceEnum.junior,
  ServiceEnum.tester,
  ServiceEnum.vip,
];
export const ServicesForBalance = [
  ServiceEnum.standard,
  ServiceEnum.pair,
  ServiceEnum.subscription,
  ServiceEnum.coop,
  ServiceEnum.junior,
  ServiceEnum.vip,
];

export const serviceIconsMap = {
  [ServiceEnum.pair]: 'UsersPair',
  [ServiceEnum.standard]: 'UserRounded',
  [ServiceEnum.subscription]: 'CalendarMinimalistic',
  [ServiceEnum.coop]: 'UsersGroup',
  [ServiceEnum.junior]: 'Smile',
  [ServiceEnum.tester]: 'EducationProf',
  [ServiceEnum.vip]: 'Award',
};