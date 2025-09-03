import { ROUTES } from "@/config";
import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { getDate, isEmpty } from "@/utils/helpers";
import { RelatedPosts } from "@/views/RelatedPosts";
import { Breadcrumbs } from '@/views/Breadcrumbs';
import { FlashCard } from '@/views/FlashCard';

const PostTemplate = ({ pageData = {}, children, t, relatedItems }: any) => {
  const { title, created, preview } = pageData;
  return (
    <div className="post-template post">
      <Container size="sm">
        <div className="post-template__header">
          <Title size="sm" tag="h1">
            {title}
          </Title>
          <span className="post-template__date">
            {getDate(created, 'DD.MM.YYYY')}
          </span>
        </div>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.news'),
              link: ROUTES.news,
            },
            {
              label: title,
            },
          ]}
        />
        <div className="post-template__content">
          {!!preview?.original && (
            <div className="post-template__preview">
              <img src={preview?.original} alt={title} />
            </div>
          )}
          {children}
        </div>
        <FlashCard />
        {!isEmpty(relatedItems) && (
          <RelatedPosts items={relatedItems} title={t('site.read_also')} />
        )}
      </Container>
    </div>
  );
};

export { PostTemplate };
