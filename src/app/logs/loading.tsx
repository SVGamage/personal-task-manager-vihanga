import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-[100px] rounded-xl" />
        <Skeleton className="h-[100px] rounded-xl" />
        <Skeleton className="h-[100px] rounded-xl" />
      </div>
    </div>
  );
}
