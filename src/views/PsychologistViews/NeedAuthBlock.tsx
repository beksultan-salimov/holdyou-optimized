'use client';
import { Button } from '@/components/Button';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';

interface IProps {
  onClickAuth: () => void;
  title: string;
}
const NeedAuthBlock = ({ onClickAuth, title }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  return (
    <div className="need-auth-block">
      <div className="need-auth-block__inner">
        <div className="need-auth-block__icon" />
        <div className="need-auth-block__title">{title}</div>
        <Button
          className="need-auth-block__btn"
          size="md"
          type="primary"
          weight="bold"
          onClick={onClickAuth}
        >
          {t('site.signup')}
        </Button>
      </div>
    </div>
  );
};

export { NeedAuthBlock };
