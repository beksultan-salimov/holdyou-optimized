'use client'
import { LinkProps } from 'next/link';
import React, { PropsWithChildren } from 'react';

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>;
type ScrollLinkProps = AnchorProps &
  LinkProps &
  PropsWithChildren & { offset?: number; href?: string };

const ScrollLink = ({ children, offset = 0, href, ...props }: ScrollLinkProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.href.replace(/.*\#/, '');
    window.scrollTo({
      top: Number(document.getElementById(targetId)?.offsetTop) + offset,
      behavior: 'smooth',
    });
  };

  return (
    <a href={href} {...props} onClick={handleScroll}>
      {children}
    </a>
  );
};

export { ScrollLink };
