import { useEffect } from "react";
import { isEmpty } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "./useStore";
import { clearPsychologist, fetchPsychologistScheduler, getIsLoadedScheduler, getPsychologistScheduler, setPsychologist } from "@/store/psychologistSlice";
import { clearCheckout, getAllowedConsultations, getSelectedSchedule } from "@/store/checkoutSlice";
import { IPsychologist } from "@/types";

interface IProps {
  psychologistId: number | string;
}

export const useSchedule = ({ psychologistId }: IProps) => {
  const dispatch = useAppDispatch();
  const psychologistScheduler = useAppSelector(getPsychologistScheduler);
  const isLoadedScheduler = useAppSelector(getIsLoadedScheduler);
  const hasScheduler = !isEmpty(psychologistScheduler);
  const selectedSchedule = useAppSelector(getSelectedSchedule);

  useEffect(() => {
    dispatch(fetchPsychologistScheduler(psychologistId as string));
  }, [dispatch, psychologistId]);

  return {
    isLoadedScheduler,
    hasScheduler,
    selectedSchedule,
    psychologistScheduler,
  };
};

export const useCheckout = ({ psychologist }: { psychologist: IPsychologist }) => {
  const dispatch = useAppDispatch();
  const allowedConsultations = useAppSelector(getAllowedConsultations);
  const psychologistScheduler = useAppSelector(getPsychologistScheduler);
  const hasConsultation = !isEmpty(allowedConsultations);
  const hasScheduler = !isEmpty(psychologistScheduler);

  useEffect(() => {
    return () => {
      dispatch(clearCheckout({}));
      dispatch(clearPsychologist({}));
    };
  }, [dispatch]);

  useEffect(() => {
    // dispatch(selectPsychologist(psychologistId as string));
    dispatch(setPsychologist(psychologist));
  }, [dispatch, psychologist]);

  return { allowedConsultations, hasConsultation, hasScheduler };
};