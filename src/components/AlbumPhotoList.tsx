import {
  AssetOrder,
  getAlbumInfo,
  getTimeBucket,
  getTimeBuckets,
  TimeBucketSize,
} from "@immich/sdk";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { HashLoader } from "react-spinners";
import { TbChevronLeft, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import useSWRInfinite from "swr/infinite";
import { useEffect, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Separator } from "@chakra-ui/react";
import dayjs from "dayjs";
import useConfigStore from "@/store/config.ts";
// import { useInView } from "motion/react";

const AlbumPhotoList = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const collapsed = useConfigStore((state) => state.collapsed);
  const toggleCollapse = useConfigStore((state) => state.toggleCollapse);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { data: albumInfo } = useSWR({ albumId, index: 0 }, ({ albumId }) =>
    getAlbumInfo(
      {
        withoutAssets: true,
        id: albumId!,
      },
      { baseUrl: "/api" },
    ),
  );

  const { data: buckets, isLoading: isBucketsLoading } = useSWR(
    { albumId, index: 1 },
    ({ albumId }) =>
      getTimeBuckets({
        albumId,
        size: TimeBucketSize.Month,
        order: AssetOrder.Desc,
      }),
  );

  // const scrollRef = useRef<HTMLDivElement>(null);

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
  const ref = useRef<HTMLDivElement>(null);

  // const isInView = useInView(ref, {
  //   // root: scrollRef
  //   // amount: "all",
  //   // once: false
  // });

  /*  useEffect(() => {
      console.log(isInView);
      if (isInView && !isValidating && !isLoading) {
        void setSize(size + 1);
      }
    }, [isInView, pages]);*/

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect(); // 清除旧的观察器

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && !isValidating) {
          void setSize(size + 1);
        }
      },
      {
        // root: scrollRef.current,
        // threshold: 0.5
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    observerRef.current = observer;

    return () => observer.disconnect();
    /* return () => {
       if (ref.current) {
         observer.unobserve(ref.current);
       }
       observer.disconnect();
     };*/
  }, [pages]);

  if (error) return <div>failed to load</div>;
  if (isLoading || isBucketsLoading)
    return (
      <div className={"flex h-screen w-full items-center justify-center"}>
        <AiOutlineLoading3Quarters className={"animate-spin text-5xl"} />
      </div>
    );
  return (
    <div className={"flex h-screen w-full flex-col"}>
      <div className={"flex h-10 items-center px-2"}>
        {collapsed && (
          <button
            className={
              "flex h-7 w-7 items-center justify-center rounded p-[1px] text-[#0071e3] hover:bg-[#7676801f]"
            }
            onClick={() => {
              toggleCollapse();
            }}
          >
            <TbLayoutSidebarRightCollapse className={"text-[26px]"} />
          </button>
        )}
        <button
          className={
            "ml-1 flex h-7 w-7 items-center justify-center rounded p-[1px] text-[#0071e3] hover:bg-[#7676801f]"
          }
          onClick={() => {
            navigate("/albums");
          }}
        >
          <TbChevronLeft className={"text-[26px]"} />
        </button>
      </div>
      <div className={"py-4 pl-4"}>
        <h2 className={"text-lg font-bold"}>{albumInfo?.albumName ?? "no"}</h2>
        <div className={"mt-1 flex items-center text-sm"}>
          <span className={"text-gray-600"}>{albumInfo?.assetCount}</span>
          <span className={"ml-1 text-sm font-bold"}>项</span>
          <span className={"ml-4"}>
            {dayjs(albumInfo?.startDate).format("YYYY年M月D日")}
          </span>
          <span className={"mx-1"}>-</span>
          <span>{dayjs(albumInfo?.endDate).format("YYYY年M月D日")}</span>
        </div>
      </div>
      <div
        // ref={scrollRef}
        className={"flex-1 overflow-y-auto px-5 py-4"}
      >
        {pages?.map((photos, index) => (
          <div key={photos[0].id} className={`${index > 0 ? "mt-8" : ""}`}>
            <h3 className={"text-sm"}>
              {dayjs(buckets![index].timeBucket).format("YYYY年M月")}
            </h3>
            <div
              className={
                "mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6"
              }
            >
              {/* {photos?.map((photo) => (
                <div
                  key={photo.id}
                  className={"cursor-pointer"}
                >
                  <img
                    src={`/api/assets/${photo.id}/thumbnail`}
                    // className={"h-full w-full object-cover"}
                    className={"aspect-square w-full rounded object-cover"}
                  />
                </div>
              ))}
*/}
              {photos?.map((photo) => (
                // <div className={""} key={photo.id}>
                <img
                  key={photo.id}
                  className={"aspect-square w-full rounded object-cover"}
                  src={`/api/assets/${photo.id}/thumbnail`}
                  // loading="lazy"
                  alt={""}
                />
                // </div>
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
    </div>
  );
};

export default AlbumPhotoList;
