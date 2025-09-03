'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface ITabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  badge?: React.ReactNode;
}
interface IProps {
  items: ITabItem[];
  onChange?: (id: string) => void;
  className?: string;
  extraContent?: React.ReactNode;
  defaultActiveKey?: string;
  type?: 'default' | 'card';
}

const Tabs = ({
  items,
  onChange,
  className = '',
  defaultActiveKey,
  extraContent,
  type = 'default'
}: IProps) => {
  const _defaultActiveKey = defaultActiveKey || items[0]?.key;
  const [activeKey, setActiveKey] = useState<string>(_defaultActiveKey);
  useEffect(() => {
    setActiveKey(_defaultActiveKey);
  }, [_defaultActiveKey])
  const handleChange = (key: any) => {
    setActiveKey(key);
    typeof onChange === 'function' && onChange(key);
  };

  if (!items) return null
  return (
    <div
      className={`tabs tabs--${type} ${className}`}
      data-avtive-tab={activeKey}
    >
      <div className="tabs-header">
        <div className="tabs-nav">
          {items?.map(({ key, label, badge }: ITabItem) => (
            <div
              key={key}
              className={clsx('tabs-nav-item', { active: key === activeKey })}
              onClick={() => handleChange(key)}
              data-id={key}
            >
              <span className="tabs-nav-item-label">{label}</span>
              {!!badge && <span className="badge">{badge}</span>}
            </div>
          ))}
          <span className="tabs-nav-ink-bar" />
        </div>
      </div>
      <div className="tabs-body">
        {!!extraContent && (
          <div className="tabs-extra-content">{extraContent}</div>
        )}
        <div className="tabs-content">
          {items?.map(({ key, children }: ITabItem) => {
            if (activeKey !== key) return null;
            return (
              <div className="tabs-content-item" key={key} data-id={key}>
                {children}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Tabs };
