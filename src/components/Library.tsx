import TimeBuckets from "@/components/TimeBuckets.tsx";

const Library = () => {
  // const params = useParams();

  return (
    <div className={"flex h-screen flex-1 flex-col"}>
      <div className={"flex h-10 items-center"}></div>
      {/*<TimeLine*/}
      {/*  bucketsParams={{*/}
      {/*    isArchived: false,*/}
      {/*    size: TimeBucketSize.Month,*/}
      {/*    withPartners: true,*/}
      {/*    withStacked: true,*/}
      {/*  }}*/}
      {/*  timelineParams={{*/}
      {/*    isArchived: false,*/}
      {/*    withStacked: true,*/}
      {/*    withPartners: true,*/}
      {/*    size: TimeBucketSize.Month,*/}
      {/*  }}*/}
      {/*/>*/}
      <TimeBuckets />
    </div>
  );
};

export default Library;
