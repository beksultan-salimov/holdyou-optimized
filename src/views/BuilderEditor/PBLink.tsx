import React from 'react';
import { Link } from '@/components/Link'

const PBLink = (props: any) => {
  const { href, text = 'Link', className = '', view = 'link', ...rest } = props || {};

  return (
    <div className={`pb-link pb-link--${view}`}>
      <Link href={href} className={className} {...rest}>
        {text}
      </Link>
    </div>
  );
}

export default PBLink;
