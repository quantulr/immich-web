import useSWR from "swr";
import { getTimeBuckets, TimeBucketSize } from "@immich/sdk";
import TimeBucket from "@/components/TimeBucket.tsx";
import style from "./TimeBuckets.module.css";
import { useRef } from "react";
/*interface BucketsParams {
  size: TimeBucketSize;
  order?: AssetOrder;
  albumId?: string;
  isArchived?: boolean;
  withPartners?: boolean;
  withStacked?: boolean;
}*/

const TimeBuckets = () => {
  const {
    data: buckets,
    isLoading: isBucketsLoading,
    error,
  } = useSWR(
    {
      isArchived: false,
      size: TimeBucketSize.Month,
      withPartners: true,
      withStacked: true,
    },
    (params) => getTimeBuckets(params),
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);

  if (error) return <div>Error: {error.message}</div>;
  if (isBucketsLoading) return <div>Loading...</div>;
  return (
    <>
      <button
        onClick={() => {
          scrollRef.current?.scrollTo({
            top: 49000,
          });
        }}
      >
        scroll
      </button>
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-10 ${style.scrollbarHidden}`}
      >
        {buckets?.map((bucket) => (
          <TimeBucket
            key={bucket.timeBucket}
            timeBucket={bucket.timeBucket}
            count={bucket.count}
          />
        ))}
      </div>
    </>
  );
};

export default TimeBuckets;
