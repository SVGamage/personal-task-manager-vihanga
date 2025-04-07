import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-8 w-32 rounded-xl" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
      </div>
    </div>
  );
}
