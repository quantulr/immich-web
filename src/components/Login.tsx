// import { login } from "@immich/sdk";
// import { PasswordInput } from "@/components/ui/password-input.tsx";
import { Field } from "@/components/ui/field.tsx";
import { Image, Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input.tsx";
import { Button } from "@/components/ui/button.tsx";

const Login = () => {
  return (
    <div className={"flex h-screen w-screen items-center justify-center"}>
      <div className={"rounded-xl border-[1px] px-32 py-16 shadow-2xl"}>
        <Image src={"/favicon-144.png"} className={"mx-auto w-24"} />
        <form className={"flex flex-col items-center justify-center"}>
          <Field label={"邮箱"}>
            <Input
              placeholder={"邮箱"}
              className={
                "border-2 border-gray-100 px-2 outline-none focus:border-gray-200"
              }
            />
          </Field>
          <Field label={"密码"}>
            <PasswordInput
              placeholder={"密码"}
              className={
                "border-2 border-gray-100 px-2 outline-none focus:border-gray-200"
              }
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
