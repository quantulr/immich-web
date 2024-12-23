import useAuthStore from "@/store/auth.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UnAuth = () => {
  const immichIsAuthenticated = useAuthStore(
    (state) => state.immichIsAuthenticated,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (immichIsAuthenticated) {
      navigate("/");
    }
  }, [immichIsAuthenticated]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default UnAuth;
