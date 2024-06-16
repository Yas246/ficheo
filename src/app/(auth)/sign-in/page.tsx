"use client";

import InputPassword from "@/components/Form/InputPassword";
import InputText from "@/components/Form/InputText";
import { Button } from "@/components/ui/button";
import authApi from "@/services/auth.service";
import useCookie from "@/shared/helpers/useCookie";
import useToast from "@/shared/helpers/useToast";
import { authUserSelector } from "@/stores/useUserStore";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSetRecoilState } from "recoil";
import * as Yup from "yup";

const SignIn: React.FC = () => {
  const [credentials] = React.useState({
    email: "admin@plania.com",
    password: "password",
  });

  const setAuthUser = useSetRecoilState(authUserSelector);

  const [loading, setLoading] = React.useState(false);

  const { signIn } = authApi();

  const { setCookie } = useCookie();

  const router = useRouter();

  const { toastSuccess } = useToast();

  const { handleChange, errors, handleSubmit, values } = useFormik({
    initialValues: credentials,
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string().required("Mot de passe requis"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      signIn(values)
        .then((response: any) => {
          toastSuccess(response.message);

          setCookie("auth_token", response.data.token);

          setAuthUser(response.data.user);

          router.push("/");
        })
        .finally(() => setLoading(false));
    },
  });

  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-9 text-2xl text-center font-bold text-green-800 dark:text-green-500 sm:text-title-xl2">
        Se connecter à FicheInfo
      </h2>
      {loading}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputText
          label="Email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          errors={errors.email}
          required
        />

        <InputPassword
          label="Mot de passe"
          name="password"
          placeholder="Mot de passe"
          value={values.password}
          onChange={handleChange}
          errors={errors.password}
          required
        />

        <Button
          type="submit"
          variant="default"
          className="w-full bg-green-800 text-white hover:bg-green-700"
          loading={loading}
        >
          Se connecter
        </Button>

        <div className="text-center">
          <p>
            Pas encore de compte ?{" "}
            <Link href="/sign-up" className="text-primary">
              Creer un compte
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
