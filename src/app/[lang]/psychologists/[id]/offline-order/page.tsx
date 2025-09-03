import { Metadata, ResolvingMetadata } from 'next';
import { LangType } from '@/config/i18n/settings';
import { Title } from '@/components/Title';
import { PsychologistCard } from '@/views/PsychologistCard';
import { getTranslationServer } from '@/config/i18n';
import { Container } from '@/components/Container';
import { getOfflineCenters, getPsychologist } from '@/utils/services';
import { PsychologistOfflineOrder } from '@/views/PsychologistViews/PsychologistOfflineOrder';
import { IOfflineCenter } from '@/types/OfflineCenterTypes';
import { IPsychologist } from '@/types';
import { Breadcrumbs } from '@/views/Breadcrumbs';
import { ROUTES } from '@/config';

interface IProps {
  params: { lang: LangType; id: string };
}

export async function generateMetadata(
  { params }: IProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang, id } = params;
  const { t } = await getTranslationServer(lang, ['offline_order']);
  const psychologist: IPsychologist = await getPsychologist({ id, lang });

  return {
    title: `${psychologist?.fullname} | ${t('offline_order.title')}`,
    description: psychologist?.description,
  };
}

export default async function OfflineOrderPage({ params: { lang, id } }: IProps) {
  const { t } = await getTranslationServer(lang, ['offline_order', 'site']);
  const psychologist: IPsychologist = await getPsychologist({ id, lang });
  const offlineCenters: IOfflineCenter[] = await getOfflineCenters({ lang });

  return (
    <div className="page page-offline-order">
      <Container size="md">
        <Title
          tag="h1"
          size="xlg"
          isCenter
          className="page-offline-order__title"
        >
          {t('offline_order.title')}
        </Title>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.psychologists'),
              link: ROUTES.psychologists,
            },
            {
              label: t('offline_order.breadcrumbs'),
              link: ROUTES.offlineCenters,
            },
            {
              label: psychologist?.fullname || '-',
            },
          ]}
        />

        <div className="offline-order">
          <div className="offline-order-col-sidebar">
            <PsychologistCard item={psychologist} type="simple" />
          </div>
          <div className="offline-order-col-content">
            <PsychologistOfflineOrder
              offlineCenters={offlineCenters}
              psychologist={psychologist}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

