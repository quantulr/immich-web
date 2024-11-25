import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getAssetInfo } from "@immich/sdk";

const PhotoViewer = () => {
  const { photoId } = useParams();
  const {
    data: assetInfo,
    isLoading,
    error,
  } = useSWR(photoId, (id) =>
    getAssetInfo({
      id,
    }),
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className={"h-screen w-full"}>
      <img
        className={"h-full w-full object-contain"}
        src={`/api/assets/${photoId}/thumbnail?size=preview&c=${assetInfo?.checksum}`}
        alt={""}
      />
    </div>
  );
};

export default PhotoViewer;
