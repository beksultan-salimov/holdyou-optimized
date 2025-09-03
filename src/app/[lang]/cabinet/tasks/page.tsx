'use client'
import Image from 'next/image';
import clsx from 'clsx';
import { isEmpty } from '@/utils/helpers';
import { Spinner } from '@/components/Spinner';
import { EmptyCard } from '@/components/EmptyCard';
import { Page } from '@/cabinet/components/Page';
import { useTasks } from '@/cabinet/hooks/useTasks';
import TaskItem from '@/cabinet/views/TaskItem';
import EmptyImg from '@/static/img/empty-tasks.svg';

const TasksPage = () => {
  const slug = 'tasks';
  const { t, pagination, tasksIds, isLoading } = useTasks();

  return (
    <Page
      slug={slug}
      pagination={pagination}
      title={t('cabinet.tasks.title')}
    >
      <div className={clsx("tasks", { 'is-loading': isLoading })}>
        {isLoading && <Spinner />}
        {!isEmpty(tasksIds) ? (
          tasksIds!.map((taskId: number) => (
            <TaskItem taskId={taskId} key={taskId} />
          ))
        ) : (
          <EmptyCard
            text={t('cabinet.tasks.items.empty')}
            image={<Image src={EmptyImg} alt="" />}
          />
        )}
      </div>
    </Page>
  );
};

export default TasksPage;
