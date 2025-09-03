'use client';
import { Suspense } from 'react';
import { PsychologistCheckout } from './PsychologistCheckout';

const PsychologistCheckoutInPshWrapper = (props: any) => {
  return (
    <>
      <Suspense>
        <PsychologistCheckout {...props} />
      </Suspense>
    </>
  );
};

export { PsychologistCheckoutInPshWrapper };
