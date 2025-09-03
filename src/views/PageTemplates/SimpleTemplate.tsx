import { Container } from "@/components/Container";

const SimpleTemplate = ({ pageData = {}, children }: any) => {
  const { title } = pageData;
  return (
    <div className="simple-template">
      <Container size="sm">
        <h1 className="simple-template-title">{title}</h1>
        {children}
      </Container>
    </div>
  );
};

export { SimpleTemplate };
