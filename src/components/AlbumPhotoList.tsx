import {
  AssetOrder,
  getTimeBucket,
  getTimeBuckets,
  TimeBucketSize,
} from "@immich/sdk";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { HashLoader } from "react-spinners";
import { TbChevronLeft } from "react-icons/tb";
import useSWRInfinite from "swr/infinite";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AlbumPhotoList = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { data: buckets, isLoading: isBucketsLoading } = useSWR(albumId, (id) =>
    getTimeBuckets({
      albumId: id,
      size: TimeBucketSize.Month,
      order: AssetOrder.Desc,
    }),
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
        albumId,
      };
    },
    ({ tb, albumId }) =>
      getTimeBucket({
        albumId,
        size: TimeBucketSize.Month,
        timeBucket: tb,
        order: AssetOrder.Desc,
      }),
    {
      revalidateFirstPage: false,
      parallel: true,
    },
  );

  const scrollRef = useRef<HTMLDivElement>(null);
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
        root: scrollRef.current,
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
  /*  const { isIntersecting, ref } = useIntersectionObserver({
      root: scrollRef.current,
      threshold: 0.5,
      onChange: (i) => {
        console.log(size);
        if (i && !isValidating && !isLoading) {
          console.log("到底了");
          // setSize(size + 1);
          //   .then(() => {
          //   // console.log(pgsRef.current);
          //   console.log(pgsRef.current?.children.length ?? 0 - 1);
          // });
          // console.log(`children: ${pgsRef.current?.children.length ?? 0 - 1}`);
        }
        // setTimeout(() => {
        // });
        // console.log(isIntersecting, size);
        // while (isIntersecting) {
        // setSize(size + 1);
        // }

      }
    });

    // const pgsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      console.log(`intersection: ${isIntersecting}, count: ${pages?.length}`);
      // setTimeout(() => {
      // console.log(pgsRef.current?.children.length);
      if (isIntersecting && !isLoading && !isValidating) {
        // console.log(`页数变化${size}--${pgsRef.current?.children.length ?? 0 - 1}`);
        void setSize(size + 1);
      }
      // }, 0);
    }, [pages?.length]);*/

  if (error) return <div>failed to load</div>;
  if (isLoading || isBucketsLoading)
    return (
      <div className={"flex h-screen w-full items-center justify-center"}>
        <AiOutlineLoading3Quarters className={"animate-spin text-5xl"} />
      </div>
    );
  return (
    <div className={"flex h-screen w-full flex-col"}>
      <div className={"flex h-10 items-center bg-blue-50"}>
        <TbChevronLeft
          className={"ml-10 cursor-pointer text-2xl text-[#0071e3]"}
          onClick={() => {
            navigate("/albums");
          }}
        />
      </div>
      <div ref={scrollRef} className={"flex-1 overflow-y-auto p-5"}>
        {pages?.map((photos, index) => (
          <div key={buckets?.[index].timeBucket} className={"mt-8"}>
            <h3 className={"text-sm"}>
              {dayjs(buckets![index].timeBucket).format("YYYY年M月")}
            </h3>
            <div
              className={
                "mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6"
              }
            >
              {photos?.map((photo) => (
                <div className={""} key={photo.id}>
                  <img
                    className={"aspect-square w-full rounded object-cover"}
                    src={`/api/assets/${photo.id}/thumbnail`}
                    alt={"thumbnail"}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div ref={ref} className={"flex justify-center py-2"}>
          {pages?.length === buckets?.length ? (
            <div>
              -<span className={"text-xs"}>没有更多</span>-
            </div>
          ) : (
            <HashLoader size={24} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumPhotoList;
