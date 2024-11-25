// import { login } from "@immich/sdk";
// import { PasswordInput } from "@/components/ui/password-input.tsx";
import { Field } from "@/components/ui/field.tsx";
import { Image, Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input.tsx";
import { Button } from "@/components/ui/button.tsx";
// import { useEffect } from "react";
// import Cookies from "js-cookie";
import { useFormik } from "formik";
import useAuthStore from "@/store/auth.ts";

const Login = () => {
  const immichLogin = useAuthStore((state) => state.immichLogin);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const { email, password } = values;
      immichLogin({
        email,
        password,
      });
    },
  });
  return (
    <div className={"flex h-screen w-screen items-center justify-center"}>
      <div className={"rounded-xl border-[1px] px-32 py-16 shadow-2xl"}>
        <Image src={"/favicon-144.png"} className={"mx-auto w-24"} />
        <form
          onSubmit={formik.handleSubmit}
          className={"flex flex-col items-center justify-center"}
        >
          <Field label={"邮箱"}>
            <Input
              id={"email"}
              name={"email"}
              placeholder={"邮箱"}
              className={
                "border-2 border-gray-100 px-2 outline-none focus:border-gray-200"
              }
              onChange={formik.handleChange}
              // onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Field>
          <Field label={"密码"}>
            <PasswordInput
              id={"password"}
              name={"password"}
              placeholder={"密码"}
              className={
                "border-2 border-gray-100 px-2 outline-none focus:border-gray-200"
              }
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Field>
          <Button
            type={"submit"}
            className={"mt-4 w-full bg-[#0071e3] px-5 text-white"}
          >
            登录
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
