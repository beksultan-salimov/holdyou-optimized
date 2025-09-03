import { Spinner } from "@/components/Spinner";

export default async function GlobalLoading() {
  return (
    <div className="page-loading">
      <Spinner />
    </div>
  );
}
