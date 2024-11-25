import { useRef } from "react";
import useSWR from "swr";
import { getTimeBucket, TimeBucketSize } from "@immich/sdk";
import { useInView } from "motion/react";
import { useNavigate } from "react-router-dom";

const TimeBucket = ({
  timeBucket,
  count,
}: {
  timeBucket: string;
  count: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const {
    data: photos,
    isLoading,
    /*    isValidating,*/
    error,
  } = useSWR(
    isInView
      ? {
          timeBucket,
          isArchived: false,
          size: TimeBucketSize.Month,
          withPartners: true,
          withStacked: true,
        }
      : null,
    (params) => getTimeBucket(params),
  );

  return (
    <div
      ref={ref}
      className={"mt-4 grid grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-6"}
    >
      {error || isLoading || !photos
        ? [...Array(count).keys()].map((photo) => (
            <div
              key={photo}
              className={"aspect-square rounded bg-blue-200"}
            ></div>
          ))
        : photos.map((photo) => (
            <div
              key={photo.id}
              className={"cursor-pointer"}
              onClick={() => {
                navigate(`./photos/${photo.id}`);
              }}
            >
              <img
                className={"aspect-square w-full rounded object-cover"}
                src={`/api/assets/${photo.id}/thumbnail`}
                alt={""}
              />
            </div>
          ))}
    </div>
  );
};

export default TimeBucket;
