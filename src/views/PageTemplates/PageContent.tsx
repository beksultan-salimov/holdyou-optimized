/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classNames from 'classnames';
import { get, isEmpty, minifyString } from '@/utils/helpers';
import { reactComponents } from '@/views/BuilderEditor/ReactComponents';
import PBOrderButton from '@/views/BuilderEditor/PBOrderButton';
import PBLink from '@/views/BuilderEditor/PBLink';
import PBAnketa from '@/views/BuilderEditor/PBAnketa';
import './pageContent.scss';
import '@/views/BuilderEditor/pbcomponents.scss'


const renderContent = (component: any, Tag: any = 'div') => {
  const { attributes, components, content, classes } = component || {};

  if (!!content) {
    return (
      <Tag
        {...attributes}
        className={classNames(classes)}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    );
  } else {
    return (
      <Tag {...attributes} className={classNames(classes)}>
        {!!components && components?.length > 0 && components.map(renderComponent)}
      </Tag>
    );
  }
};

const renderComponent = (component: any) => {
  let { tagName, type, attributes, components, content, classes } = component || {};

  if (!tagName) {
    if (type === 'image') {
      return (
        <img
          {...attributes}
          src={attributes?.src}
          alt={attributes?.alt}
          className={classNames(classes)}
        />
      );
    }
    if (type === 'textnode') return <>{content}</>;
    return renderContent(component, 'div');
  } else {
    if (reactComponents.includes(type)) {
      switch (type) {
        case 'OrderButton':
          return (
            <PBOrderButton
              {...attributes}
              className={classNames(classes, attributes?.className)}
            />
          );
        case 'Link':
          return (
            <PBLink
              {...attributes}
              className={classNames(classes, attributes?.className)}
            />
          );
        case 'Anketa':
          return (
            <PBAnketa
              {...attributes}
              className={classNames(classes, attributes?.className)}
            />
          );
      }
    } else {
      return renderContent(component, tagName);
    }
  }
};

interface IProps {
  pageId: string;
  template: string;
  data: any;
}
const PageContent = ({ pageId, data, template = '' }: IProps) => {
  const components = get(data, [
    'data',
    'pages',
    0,
    'frames',
    0,
    'component',
    'components',
  ]);

  if (isEmpty(data)) return null;

  return (
    <div className={`pb-container pb-template-${template.toLowerCase()}`}>
      {components?.map((component: any) => renderComponent(component))}
    </div>
  );
};



export { PageContent };
