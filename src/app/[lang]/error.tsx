'use client';
import { Button } from '@/components/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-error">
      <div className="page-error__header">
        <span className="page-error__title">Oops</span> <br />
        something went wrong!
      </div>
      <Button type="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
