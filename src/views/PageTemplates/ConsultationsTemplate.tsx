import { getPsychologists, getServices } from "@/utils/services";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Title } from "@/components/Title";
// import { MobileAppSection } from "@/views/MobileAppSection";
import { Tariffs } from "@/views/Tariffs";
import { PsychologistsCarousel } from "@/views/PsychologistsCarousel";
import CtaButton from "../CtaButton";
import { ROUTES } from "@/config";
import { Breadcrumbs } from "../Breadcrumbs";

const ConsultationsTemplate = async ({ pageData = {}, children, t, lang }: any) => {
  const { title } = pageData;
  const services = await getServices({ lang });
  const psychologists = await getPsychologists({ lang });


  return (
    <div className="consultations-template">
      <Container size="sm">
        <div className="consultations-template-header">
          <h1 className="consultations-template-title">{title}</h1>
          <CtaButton
            text={t('site.btn_online_consult')}
            className="consultations-template-btn-cta"
          />
        </div>
        <Breadcrumbs
          items={[
            {
              label: title,
            },
          ]}
        />
        {children}
      </Container>

      {!!psychologists && psychologists?.length > 0 && (
        <Section className="consultations-template-psh" container="sm">
          <Title
            size="xlg"
            className="consultations-template-psh__title"
            isCenter
          >
            {t('site.consultations_template.psh_title')}
          </Title>
          <PsychologistsCarousel items={psychologists} />
          <div className="consultations-template-psh__footer">
            <Button
              href={ROUTES.psychologists}
              type="primary-old"
              weight="bold"
              size="sm"
            >
              {t('site.consultations_template.btn_all_psh')}
            </Button>
          </div>
        </Section>
      )}

      {!!services && services?.length > 0 && (
        <Section className="consultations-template-prices" container="sm">
          <Title
            size="xlg"
            className="consultations-template-prices__title"
            isCenter
          >
            {t('site.consultations_template.prices_title')}
          </Title>
          <Tariffs
            services={services}
            isVisiblePromocode={false}
            viewType="custom"
            isCarousel
          />
        </Section>
      )}

      {/* <MobileAppSection t={t} /> */}
    </div>
  );
};

export { ConsultationsTemplate };