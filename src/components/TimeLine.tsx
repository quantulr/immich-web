import useSWR from "swr";
import {
  AssetOrder,
  getTimeBucket,
  getTimeBuckets,
  TimeBucketSize,
} from "@immich/sdk";
import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import dayjs from "dayjs";
import { Image, Separator } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface BucketsParams {
  size: TimeBucketSize;
  order?: AssetOrder;
  albumId?: string;
  isArchived?: boolean;
  withPartners?: boolean;
  withStacked?: boolean;
}

interface TimelineParams {
  // timeBucket: string;
  size: TimeBucketSize;
  order?: AssetOrder;
  albumId?: string;
  isArchived?: boolean;
  withPartners?: boolean;
  withStacked?: boolean;
}

const TimeLine = ({
  bucketsParams,
  timelineParams,
}: {
  bucketsParams: BucketsParams;
  timelineParams: TimelineParams;
}) => {
  const navigate = useNavigate();
  const { data: buckets, isLoading: isBucketsLoading } = useSWR(
    { ...bucketsParams, index: 1 },
    () => getTimeBuckets(bucketsParams),
  );

  const {
    data: pages,
    size,
    setSize,
    isLoading,
    error,
    isValidating,
  } = useSWRInfinite(
    (index) => {
      if (buckets && index > buckets.length - 1) {
        return null;
      } // 已经到最后一页
      return {
        tb: buckets![index].timeBucket,
        albumId: bucketsParams.albumId,
      };
    },
    ({ tb, albumId }) =>
      getTimeBucket({
        albumId,
        timeBucket: tb,
        ...timelineParams,
      }),
    {
      revalidateFirstPage: false,
      parallel: true,
    },
  );

  // const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && !isValidating) {
          void setSize(size + 1);
        }
      },
      {
        // root: scrollRef.current,
        threshold: 0.5,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [pages]);

  if (error)
    return (
      <div className={"flex h-screen w-full items-center justify-center"}>
        <h1>failed to load</h1>
      </div>
    );
  if (isLoading || isBucketsLoading)
    return (
      <div className={"flex h-screen w-full items-center justify-center"}>
        <AiOutlineLoading3Quarters className={"animate-spin text-5xl"} />
      </div>
    );
  return (
    <div className={"flex-1 overflow-y-auto px-5 py-4"}>
      {pages?.map((photos, index) => (
        <div
          key={buckets?.[index].timeBucket}
          className={`${index > 0 ? "mt-8" : ""}`}
        >
          <h3 className={"text-sm"}>
            {dayjs(buckets![index].timeBucket).format("YYYY年M月")}
          </h3>
          <div
            className={
              "mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6"
            }
          >
            {photos?.map((photo) => (
              <div
                className={"cursor-pointer"}
                onClick={() => {
                  navigate(`./photos/${photo.id}`);
                }}
                key={photo.id}
              >
                <Image
                  className={
                    "aspect-square w-full rounded object-cover backdrop-blur"
                  }
                  src={`/api/assets/${photo.id}/thumbnail`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div ref={ref} className={"flex justify-center py-2"}>
        {pages?.length === buckets?.length ? (
          <div className={"flex w-32 items-center justify-center"}>
            <Separator className={"h-0 border-[1px] border-[#e4e4e7]"} />
            <span className={"mx-2 shrink-0 text-xs"}>没有更多</span>
            <Separator className={"h-0 border-[1px] border-[#e4e4e7]"} />
          </div>
        ) : (
          <HashLoader size={24} />
        )}
      </div>
    </div>
  );
};

export default TimeLine;
