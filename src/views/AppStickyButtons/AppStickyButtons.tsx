'use client';
import { Suspense, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PSYCHOLOGIST_SCHEDULER_ID, ROUTES } from '@/config';
import { Button } from '@/components/Button';
import { ScrollLink } from '@/components/ScrollLink';

const StickyButtonMain = ({ lang }: any) => {
  return (
    <Button
      href={ROUTES.homeQs('#hn-quiz')}
      // href={ROUTES.homeQs('?scroll_quiz=true')}
      type="primary-old"
      weight="bold"
      size="sm"
      shadow
    >
      {lang === 'ru' ? 'Пройти диагностику' : 'Пройти діагностику'}
    </Button>
  );
};

const StickyButtonHome = () => {
  return (
    <ScrollLink href={`#hn-quiz`} offset={-80}>
      <Button type="primary-old" weight="bold" size="sm" shadow>
        Пройти тест
      </Button>
    </ScrollLink>
  );
};

const StickyButtonPsychologist = ({ lang }: any) => {
  return (
    <ScrollLink href={`#${PSYCHOLOGIST_SCHEDULER_ID}`} offset={-30}>
      <Button type="primary-old" weight="bold" size="sm" shadow>
        {lang === 'ru' ? 'Выбрать время' : 'Обрати час'}
      </Button>
    </ScrollLink>
  );
};

const AppStickyButtons = ({ lang }: any) => {
  const pathname = usePathname();
  let ButtonToRender;

  if (pathname === '/' || pathname === '/ru') {
    ButtonToRender = StickyButtonHome;
  } else if (/^\/(ru\/)?psychologists\/[^/]+$/.test(pathname)) {
    ButtonToRender = StickyButtonPsychologist;
  } else {
    ButtonToRender = StickyButtonMain;
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <Suspense>
      <div className="app-sticky-buttons">
        <ButtonToRender lang={lang} />
      </div>
    </Suspense>
  );
};

export { AppStickyButtons };
