import { Button } from "@/components/Button";
import { getDate } from "@/utils/helpers";
// import { CalendarIcon } from "@/components/Icons/CalnedarIcon";
import { Icon } from "@/components/Icon";
import "./newsCard.scss";
import { ROUTES } from "@/config";
import { FC, memo } from 'react';

interface IProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
  date?: string;
  slug: string;
}

const NewsCard = ({ title, text, date, slug }: IProps) => {
  return (
    <div className="news-card">
      <div className="news-card-inner">
        {!!date && (
          <div className="news-card-date">
            <Icon name="Calendar" />
            {getDate(date, 'DD.MM.YYYY')}
          </div>
        )}
        {/* {!!date && <div className="news-card-date"><CalendarIcon />{getDate(date, 'DD.MM.YYYY')}</div>} */}
        {!!title && <div className="news-card-title">{title}</div>}
        {!!text && <div className="news-card-text">{text}</div>}
        <div className="news-card-actions">
          <Button
            href={ROUTES.newsSingle(slug)}
            type="primary"
            size="md"
            weight="bold"
          >
            Читати
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(NewsCard);