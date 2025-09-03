'use client';
import TaskModal from '@/cabinet/views/TaskModal';
import { ConfirmModal } from './ConfirmModal';

const GlobalCabinetComponents = () => {
  return (
    <>
      <ConfirmModal />
      <TaskModal />
    </>
  );
};

export default GlobalCabinetComponents;
