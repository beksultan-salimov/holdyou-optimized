import { Container } from "@/components/Container";
import CtaButton from "@/views/CtaButton";
import { Breadcrumbs } from "../Breadcrumbs";
import { ROUTES } from "@/config";
import { get } from "@/utils/helpers";

const ProblemsTemplate = async ({ pageData = {}, children, t, template = '' }: any) => {
  const { title } = pageData;

  return (
    <div className="consultations-template problems-template">
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
              label: t(`site.breadcrumbs.${template?.toLowerCase()}`),
              link: get(ROUTES, [template?.toLowerCase()], ''),
            },
            {
              label: title,
            },
          ]}
        />
        {children}
      </Container>
    </div>
  );
};

export { ProblemsTemplate };