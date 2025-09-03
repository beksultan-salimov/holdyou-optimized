import { get } from '@/utils/helpers';
export type TaskStatusType = 'new' | 'processing' | 'success' | 'canceled';

export const getTaskStatus = (
  status: TaskStatusType,
  part: 'label' | 'iconName' | 'color' = 'label',
  { t }: { t: any }
) => {
  const statusMap: any = {
    new: {
      label: t('tasks.status.1'),
      iconName: 'ClipboardCheck',
      color: '#00BDC2',
    },
    processing: {
      label: t('tasks.status.2'),
      iconName: 'Revote',
      color: '#F3A871',
    },
    success: {
      label: t('tasks.status.3'),
      iconName: 'CheckSquare',
      color: '#92BE66',
    },
    canceled: {
      label: t('tasks.status.4'),
      iconName: 'CloseCircle',
      color: '#ff5500',
    },
  };

  return get(statusMap, [status, part], '-');
};
