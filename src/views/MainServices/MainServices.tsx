'use client';
import Slider from 'react-slick';
import { useTranslationClient } from '@/config/i18n/client';
import { ROUTES } from '@/config/routes';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { useLang } from '@/hooks/useLang';
import './main-services.scss'

// TODO need real data
const topServices:any = [1, 2, 3];
interface IProps {
  items: any[]
}

const MainServices = ({ items }: IProps) => {
  const { lang } = useLang()
  const { t } = useTranslationClient(lang, ['home','site'])

  const slickSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="main-services">
      <Slider {...slickSettings}>
        {topServices?.map((id: any, idx: any) => (
          <div className="main-services-item" key={id}>
            <div className={`main-services-card main-services-card--${idx}`}>
              <div className="main-services-card__inner">
                <div className="main-services-card__title">
                  {t(`home.pricing.options.${idx}.title`)}
                </div>
                <div className="main-services-card__sessions">
                  {t(`home.pricing.options.${idx}.sessions`)}
                </div>
                <div className="main-services-card__price">
                  {t(`home.pricing.options.${idx}.price`)}
                </div>
                <ul className="main-services-card__advantages">
                  <li>{t(`home.pricing.options.${idx}.advantages.0`)}</li>
                  <li>{t(`home.pricing.options.${idx}.advantages.1`)}</li>
                </ul>
                <Link
                  href={idx === 1 ? ROUTES.psychologists : ROUTES.prices}
                  className="main-services-card__link"
                >
                  {t(`home.pricing.options.${idx}.button`)}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="main-services-more">
        <Button href={ROUTES.prices} type="primary-old" size="md" weight="bold">
          {t('site.more')}
        </Button>
      </div>
    </div>
  );
};

export { MainServices };
