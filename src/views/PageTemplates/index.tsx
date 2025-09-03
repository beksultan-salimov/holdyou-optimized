import { PAGE_TEMPLATES, PAGE_TEMPLATES_TYPES } from "@/config";
import { get } from '@/utils/helpers';
import { SimpleTemplate } from "./SimpleTemplate";
import { DefaultTemplate } from "./DefaultTemplate";
import { ConsultationsTemplate } from "./ConsultationsTemplate";
import { PostTemplate } from "./PostTemplate";
import { ProblemsTemplate } from "./ProblemsTemplate";

export const getTemplate = (
  template: PAGE_TEMPLATES_TYPES = PAGE_TEMPLATES.DEFAULT as PAGE_TEMPLATES_TYPES,
  { content, pageData, t, ...rest }: any
) => {
  const templates = {
    [PAGE_TEMPLATES.DEFAULT]: DefaultTemplate,
    [PAGE_TEMPLATES.SIMPLE]: SimpleTemplate,
    [PAGE_TEMPLATES.CONSULTATIONS]: ConsultationsTemplate,
    [PAGE_TEMPLATES.POST]: PostTemplate,
    [PAGE_TEMPLATES.PROBLEMS]: ProblemsTemplate,
    [PAGE_TEMPLATES.COURSES]: ProblemsTemplate,
    [PAGE_TEMPLATES.DOROSLY_TEMY]: ProblemsTemplate,
    [PAGE_TEMPLATES.PERSONALITIES]: ProblemsTemplate,
    [PAGE_TEMPLATES.PSY_TEST]: ProblemsTemplate,
  };
  let TagName = get(templates, template, DefaultTemplate);

  return (
    <TagName pageData={pageData} t={t} template={template} {...rest}>
      {content}
    </TagName>
  );
};
