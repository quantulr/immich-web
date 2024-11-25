import useConfigStore from "../store/config.ts";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const collapsed = useConfigStore((state) => state.collapsed);
  const toggleCollapsed = useConfigStore((state) => state.toggleCollapse);
  const navigate = useNavigate();
  return (
    <div
      className={`${collapsed ? "w-0 -translate-x-full p-0" : "w-60 p-2"} relative h-screen shrink-0 overflow-hidden bg-blue-50 transition-all`}
    >
      {
        <button
          onClick={() => {
            toggleCollapsed();
          }}
          className={`${collapsed ? "hidden" : "block"} mb-3 flex items-center justify-center rounded p-[1px] text-[#0071e3] hover:bg-[#7676801f]`}
        >
          <TbLayoutSidebarLeftCollapse className={"text-[26px]"} />
        </button>
      }
      <div className={"py-1 text-sm text-[#0000008f]"}>照片</div>
      <div
        className={
          "flex h-8 cursor-pointer items-center rounded-lg pl-2 transition-colors hover:bg-[#00000014]"
        }
        onClick={() => {
          navigate("/");
        }}
      >
        <span>图库</span>
      </div>
      <div className={"py-1 text-sm text-[#0000008f]"}>相簿</div>
      <div
        className={
          "flex h-8 cursor-pointer items-center rounded-lg pl-2 transition-colors hover:bg-[#00000014]"
        }
        onClick={() => {
          navigate("/albums");
        }}
      >
        <span>我的相簿</span>
      </div>
    </div>
  );
};

export default SideMenu;
