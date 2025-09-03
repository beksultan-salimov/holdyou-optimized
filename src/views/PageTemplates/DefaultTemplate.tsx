import { Container } from "@/components/Container";
import { Breadcrumbs } from "../Breadcrumbs";
import { ROUTES } from "@/config";

const DefaultTemplate = ({ pageData = {}, children }: any) => {
  const { title } = pageData;
  return (
    <div className="default-template">
      <Container size="sm">
        <div className="default-template-header">
          <h1 className="default-template-title">{title}</h1>
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
    </div>
  );
};

export { DefaultTemplate };
