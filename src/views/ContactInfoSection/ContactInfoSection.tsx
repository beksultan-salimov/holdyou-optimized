import clsx from 'clsx';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Title } from '@/components/Title';
import './contact-info-section.scss';

interface IProps {
  items: any[];
  title: React.ReactNode;
  className?: string;
}

const ContactInfoSection = ({ title, items, className = '' }: IProps) => {
  if (!items) return null;

  return (
    <Section className={clsx('contact-info-section', className)}>
      <Container size="sm">
        {!!title && (
          <Title tag="h5" className="contact-info-section__title">
            {title}
          </Title>
        )}
        <div className="contact-info-items">
          {items?.map(({ title, text }: any, idx: number) => (
            <div className="contact-info-item" key={idx}>
              <div className="contact-info-item__label">{title}</div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export { ContactInfoSection };
