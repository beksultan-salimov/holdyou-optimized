import { defaultLng } from "@/config/i18n/settings";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  let payload, data, certificateCode, merchantData, certificateId;
  const cookieStore = cookies();
  const django_language = cookieStore.get('django_language');
  const lang = django_language?.value || defaultLng;
  const { searchParams } = new URL(request.url);

  try {
    payload = await request.formData();
    if (!!payload) {
      data = payload.get('data');
      data = !!data ? JSON.parse(atob(data as string)) : {};
      merchantData = data?.order?.merchant_data;
      certificateCode = merchantData?.split(':')[0];
      certificateId = merchantData?.split(':')[1];
      if (!!certificateCode && certificateCode !== 'None' && certificateId) {
        searchParams.append('certificateCode', certificateCode);
        searchParams.append('certificateId', certificateId);
      }
    }
  } catch (err) {
    console.log('err', err);
  }

  const searchParamsString = searchParams.toString();
  const qs = !!searchParamsString ? '?' + searchParamsString : '';
  const url = process.env.NEXT_SERVER_URL + `/${lang}/checkout-gtm-success${qs}`;

  return NextResponse.redirect(url, 303);
}