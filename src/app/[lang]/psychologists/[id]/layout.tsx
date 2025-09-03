import './psychologist.scss';
import './checkout.scss';
import './offline-order.scss';

export default function PshLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
