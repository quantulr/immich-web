import useAuthStore from "@/store/auth.ts";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const immichIsAuthenticated = useAuthStore(
    (state) => state.immichIsAuthenticated,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!immichIsAuthenticated) {
      navigate("/login");
    }
  }, [immichIsAuthenticated]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default RequireAuth;
