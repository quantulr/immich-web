import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu.tsx";
// import useConfigStore from "../store/config.ts";
// import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
// import { useState } from "react";
// import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const RootLayout = () => {
  // const [collapsed, setCollapsed] = useState(false);
  // const collapsed = useConfigStore((state) => state.collapsed);
  // const toggleCollapsed = useConfigStore((state) => state.toggleCollapse);
  return (
    <div className="relative flex">
      {/*{collapsed && (*/}
      {/*  <TbLayoutSidebarLeftCollapse*/}
      {/*    onClick={() => {*/}
      {/*      toggleCollapsed();*/}
      {/*    }}*/}
      {/*    className={*/}
      {/*      "absolute left-2 top-2 z-20 cursor-pointer text-2xl text-[#0071e3] transition-none"*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}
      <SideMenu />
      <Outlet />
    </div>
  );
};

export default RootLayout;
