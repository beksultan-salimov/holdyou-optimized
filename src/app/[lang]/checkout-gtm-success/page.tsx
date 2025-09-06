'use client';
import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslationClient } from '@/config/i18n/client';
import { defaultLng } from '@/config/i18n/settings';
import { clientFetch } from '@/utils/service';
import { Spinner } from '@/components/Spinner';
import './checkout-gtm-success.scss';


const sendAnalytics = ({ checkout, t }: any) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });

  const item = !!checkout?.product_content_object?.code
    ? {
        item_id: checkout?.product_content_object?.service?.id,
        item_name: `Сертифікат. ${t('site.services.items.' + checkout?.product_content_object?.service?.type)}`,
      }
    : {
        item_id: checkout?.product_content_object?.id,
        item_name: t('site.services.items.' + checkout?.product_content_object?.type),
      };

  const obj = {
    event: 'purchase',
    ecomm_pagetype: 'purchase',
    ecommerce: {
      transaction_id: checkout?.payment_id,
      affiliation: 'Order through Checkout',
      value: checkout?.price,
      currency: 'UAH',
      purchaseDate: checkout.purchase_date,
      items: [
        {
          ...item,
          price: checkout?.price,
          quantity: 1,
          affiliation: 'Order through Checkout',
        },
      ],
    },
  };

  window.dataLayer.push(obj);
};

export async function downloadPdf(apiUrl: string, filename = "invoice.pdf") {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        //Accept: "application/pdf",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
}

const CheckoutGtmSuccessPage = () => {
  const slug = 'checkout-gtm-success';
  const { t } = useTranslationClient(defaultLng, ['site']);
  const searchParams = useSearchParams();
  const checkout_id = searchParams.get('checkout_id');
  const success_url = searchParams.get('success_url');
  const successUrl = !!success_url ? decodeURIComponent(atob(success_url as string)) : undefined;
  console.log(successUrl);
  const router = useRouter();

  const createQueryString = useCallback(
    (name?: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!!name && !!value) {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const fetchCheckout = useCallback(
    async (checkout_id: any) => {
      const checkout: any = await clientFetch(`/checkouts/${checkout_id}`);

      if (checkout?.id) {
        sendAnalytics({ checkout, t });

        if (!!successUrl) {
          router.replace(successUrl);
        } else {
          router.replace(`/checkout-pay-success?${createQueryString()}`);
        }
      }
    },
    [successUrl, router, createQueryString, t]
  );

  useEffect(() => {
    const run = async () => {
      const invoiceId = localStorage.getItem("invoiceId");

      if (invoiceId) {
        await downloadPdf("https://holdyou.net/api/checkout/receipt?invoiceId=" + invoiceId);
        localStorage.removeItem("invoiceId");
      }

      if (!!checkout_id) {
        fetchCheckout(checkout_id);
      } else {
        if (!!successUrl) {
          router.replace(successUrl);
        } else {
          router.replace(`/checkout-pay-success?${createQueryString()}`);
        }
      }
    };

    run();
  }, [checkout_id, fetchCheckout, createQueryString, router, successUrl]);


  return (
    <div className={`page-${slug}`}>
      <Spinner />
    </div>
  );
};

export default CheckoutGtmSuccessPage;
