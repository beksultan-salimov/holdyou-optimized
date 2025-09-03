import { Error404 } from '@/views/Error404';

export default async function NotFound() {
  return (
    <div className="page-error-404">
      <Error404 />
    </div>
  );
}
