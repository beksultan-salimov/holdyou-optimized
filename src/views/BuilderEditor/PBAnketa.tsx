'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { PopupButton, Widget } from '@typeform/embed-react';
import { get } from '@/utils/helpers';

const PBAnketa = (props: any) => {
  const { className = '', embed, widgetId, buttonId, buttonText, iframeLink } = props || {};
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);

  const embedData = useMemo(() => {
    if (iframeLink) {
      const regex = /\/to\/([^\/?]+)/;
      const match = iframeLink.match(regex);
      if (match) {
        const widgetId = match[1];
        return { widgetId }
      }
    }
    if (!embed) return {};
    const regexWidgetId = /data-tf-widget="(\w+)"/;
    const matchWidgetId = regexWidgetId.exec(embed);
    const widgetId = get(matchWidgetId, [1]);

    const regexButtonId = /data-tf-popup="(\w+)"/;
    const matchButtonId = regexButtonId.exec(embed);
    const buttonId = get(matchButtonId, [1]);

    const regexButtonText = /<button[^>]*>(.*?)<\/button>/i;
    const matchButtonText = regexButtonText.exec(embed);
    const buttonText = get(matchButtonText, [1]);

    return { widgetId, buttonId, buttonText };
  }, [embed, iframeLink]);

  if (!isMounted) return null;
  return (
    <div className={`pb-anketa ${className}`}>
      {(!!embed || !!widgetId || buttonId || !!iframeLink) && (
        <div className="pb-anketa-embed">
          {(!!embedData?.widgetId || !!widgetId) && (
            <Widget
              id={widgetId || embedData?.widgetId}
              className="pb-anketa-embed-form"
            />
          )}
          {(!!embedData?.buttonId || !!buttonId) && (
            <PopupButton
              id={buttonId || embedData?.buttonId}
              className="btn btn--primary-old btn--sm pb-anketa-embed-btn"
            >
              {buttonText || embedData?.buttonText || 'Заповнити форму'}
            </PopupButton>
          )}
        </div>
      )}

      <p className="pb-anketa-admin-title">Анкета</p>
    </div>
  );
}

export default PBAnketa;
