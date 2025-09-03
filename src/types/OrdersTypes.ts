import { IService } from "."

export type OrderStatusType = "CREATED" | "CANCELED" | "COMPLETED" | "EXPIRED"

export interface PaymentsData {
  uid: string
  payment_id: number
  order_status: string
}

export interface IOrder {
  id: string;
  product_content_object: IService & { service?: IService };
  status: OrderStatusType;
  price: string;
  uid: string;
  product_object_id: number;
  initial_price: string;
  billing_url: string;
  payment_id: number;
  payments_data: PaymentsData;
  user: number;
  promo: any;
  product_content_type: number;
  paid_at: string;
}