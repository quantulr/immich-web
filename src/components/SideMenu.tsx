import useConfigStore from "../store/config.ts";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const SideMenu = () => {
  const collapsed = useConfigStore((state) => state.collapsed);
  const toggleCollapsed = useConfigStore((state) => state.toggleCollapse);
  return (
    <div
      className={`${collapsed ? "w-0 -translate-x-full p-0" : "w-60 p-2"} relative h-screen shrink-0 overflow-hidden bg-blue-50 transition-all`}
    >
      {
        <TbLayoutSidebarLeftCollapse
          onClick={() => {
            toggleCollapsed();
          }}
          className={`${collapsed ? "hidden" : "block"} cursor-pointer text-2xl text-[#0071e3] transition-none`}
        />
      }
    </div>
  );
};

export default SideMenu;
