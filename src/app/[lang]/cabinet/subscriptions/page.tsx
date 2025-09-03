'use client'
import { Page } from '@/cabinet/components/Page';
import { Title } from '@/components/Title';
import Balance from '@/cabinet/views/Balance';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { PromocodeModal } from '@/views/PromocodeModal';
import { TariffsContainer } from '@/views/Tariffs/Tariffs';
import {createSuccessPayUrl} from "@/utils/helpers";
import {ROUTES} from "@/config";
// import PromocodesTable from '@/cabinet/views/PromocodesTable';
// import { getPromocodes } from '@/_demo/promo'; //TODO demo

interface IProps {
  props?: any;
}

const ShopPage = ({ props }: IProps) => {
  const slug = 'shop';
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const successUrl = createSuccessPayUrl(ROUTES.cabinet);

  return (
    <Page slug={slug}>
      <TariffsContainer title={<Title>{t('cabinet.tariffs.title')}</Title>} isOnceFetching={true} successUrl={successUrl} />
      <Balance header={<Title>{t('cabinet.balance')}</Title>} />
      {/* <PromocodesTable data={getPromocodes()} /> */}
      <PromocodeModal />
    </Page>
  );
};

export default ShopPage;
