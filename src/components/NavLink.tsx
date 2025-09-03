import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '@/hooks/useLang';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = "", activeClassName = "" }) => {
    const pathname = usePathname();
    const { lang } = useLang();

    // Prefix href with '/ru' if lang is 'ru'
    const localizedHref = lang === 'ru' ? `/ru${href.startsWith('/') ? '' : '/'}${href}` : href;
    const isActive = pathname === localizedHref;

    if (isActive) {
        return (
            <span className={`${className} ${activeClassName}`} aria-current="page">
        {children}
      </span>
        );
    }

    return (
        <Link href={localizedHref} className={className}>
            {children}
        </Link>
    );
};

export default NavLink;
