import { getAllAlbums, AlbumResponseDto } from "@immich/sdk";
import { TbPhoto } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const Albums = () => {
  const navigate = useNavigate();
  const {
    data: albums,
    error,
    isLoading,
  } = useSWR("albums", () => getAllAlbums({}));
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className={"flex h-screen flex-col"}>
      <div className={"flex h-10 items-center"}></div>
      <div className={"flex-1 overflow-y-auto p-5"}>
        <div className={"grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6"}>
          {albums?.map((album: AlbumResponseDto) => (
            <div
              onClick={() => {
                //TODO: navigate to photos list page of the album
                navigate(`/albums/${album.id}`);
              }}
              className={"cursor-pointer rounded-xl transition-all"}
              key={album.id}
            >
              {album.albumThumbnailAssetId ? (
                <img
                  className={
                    "aspect-square w-full rounded-xl object-cover hover:shadow-xl"
                  }
                  src={`/api/assets/${album.albumThumbnailAssetId}/thumbnail`}
                />
              ) : (
                <div
                  className={
                    "flex aspect-square w-full items-center justify-center rounded-xl border-[1px]"
                  }
                >
                  <TbPhoto className={"text-6xl"} />
                </div>
              )}
              <h2 className={"mt-3 truncate text-center font-bold"}>
                {album.albumName}
              </h2>
              <p className={"text-center text-sm text-gray-600"}>
                {album.assetCount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Albums;
