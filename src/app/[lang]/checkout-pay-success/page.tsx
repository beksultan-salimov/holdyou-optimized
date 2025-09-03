'use client';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { EmptyCard } from '@/components/EmptyCard';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import SuccessImg from '@/static/img/success.svg';
import './checkout-pay-success.scss';
import {SendAnalyticsClient} from "./sendAnalytics";

const CheckoutPaySuccessPage = () => {
  const slug = 'checkout-pay-success';
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const searchParams = useSearchParams();
  const certificateCode = searchParams.get('certificateCode');
  const certificateId = searchParams.get('certificateId');
  const certificateUrl = `/api/checkouts/${certificateCode}/${certificateId}/download-certificate`;
  const checkoutId = searchParams.get('checkoutId');

  return (
    <div className={`page-${slug}`}>
        {/*<SendAnalyticsClient transaction_id={checkoutId}></SendAnalyticsClient>*/}
      <Script id="fbq-track-Purchase" strategy="lazyOnload">
        {`
          fbq('track', 'Purchase', { currency: 'UAH', value: 990.0 });
        `}
      </Script>
      <Container size="sm">
        {!!certificateCode ? (
          <EmptyCard className="checkout-pay-success-certificate">
            <div className="row">
              <div className="col-left">
                <a
                  href={certificateUrl}
                  download={`certificate_${certificateCode}.jpg`}
                  className="certificate-manual-link"
                >
                  <Image
                    src={certificateUrl}
                    alt="certificate"
                    width="600"
                    height="500"
                  />
                </a>
                <a
                  href={certificateUrl}
                  download={`certificate_${certificateCode}.jpg`}
                >
                  <Button type="primary" size="sm">
                    {t('site.certificate_confirm_success_download')}
                  </Button>
                </a>
              </div>
              <div className="col-right">
                <div className="checkout-pay-success-certificate-text">
                  <p>
                    <strong>
                      {t('site.certificate_confirm_success_title')}
                    </strong>
                  </p>
                  <p>{t('site.certificate_confirm_success_subtitle')}</p>
                  <p>
                    {t('site.certificate_confirm_success_text')}{' '}
                    <strong className="checkout-pay-success-certificate-code">
                      {certificateCode}
                    </strong>
                  </p>
                  <p className="font-size-075">
                    {t('site.certificate_confirm_success_manual')}
                  </p>
                </div>
                <Button href={ROUTES.home} type="primary" size="sm">
                  {t('site.goto_home')}
                </Button>
              </div>
            </div>
          </EmptyCard>
        ) : (
          <EmptyCard
            text={t('site.checkout_confirm_success')}
            image={<Image src={SuccessImg} alt="" />}
            extra={
              <Button href={ROUTES.cabinet} type="primary" size="sm">
                {t('site.goto_cabinet')}
              </Button>
            }
          />
        )}
      </Container>
    </div>
  );
};

export default CheckoutPaySuccessPage;
