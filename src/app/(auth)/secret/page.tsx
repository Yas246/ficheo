"use client";

import InputPassword from "@/components/Form/InputPassword";
import InputText from "@/components/Form/InputText";
import { Button } from "@/components/ui/button";
import authApi from "@/services/auth.service";
import useToast from "@/shared/helpers/useToast";
import { useFormik } from "formik";
import { useRouter } from "next-nprogress-bar";
import React, { useState } from "react";
import * as Yup from "yup";

const SignUp: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const { toastSuccess } = useToast();

  const router = useRouter();

  const [credentials] = React.useState({
    firstname: "azobo",
    lastname: "azobo",
    email: "azobo@yopmail.fr",
    password: "password",
    password_confirmation: "password",
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: credentials,
    validationSchema: Yup.object({
      firstname: Yup.string().required("Prénom requis"),
      lastname: Yup.string().required("Nom requis"),
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string().required("Mot de passe requis"),
      password_confirmation: Yup.string()
        .required("Confirmation mot de passe requis")
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe ne sont pas identiques"
        ),
    }),
    onSubmit: (values) => {
      setLoading(true);

      authApi()
        .signUp(values)
        .then((response: any) => {
          toastSuccess(response.message);
          // Vous pouvez ajouter ici des actions supplémentaires si nécessaire
        })
        .catch((error) => {
          // Handle error appropriately, e.g., show an error message
        })
        .finally(() => setLoading(false)); // Ensure loading is set to false regardless of outcome
    },
  });

  const [formData, setFormData] = useState({
    Role: "",
  });
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      Role: value,
    }));
  };

  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-9 text-2xl text-center font-bold text-green-700 dark:text-white sm:text-title-xl2">
        Créer un compte
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <span className="font-bold">Type de compte :</span>
        <label className="ml-5">
          <input
            type="checkbox"
            name="Role"
            value="administrateur"
            checked={formData.Role === "administrateur"}
            onChange={handleRoleChange}
          />{" "}
          Administrateur
        </label>
        <label className="ml-4">
          <input
            type="checkbox"
            name="Role"
            value="technicien"
            checked={formData.Role === "technicien"}
            onChange={handleRoleChange}
            className="ml-4"
          />{" "}
          Technicien
        </label>
        <InputText
          name="firstname"
          label="Prénom"
          placeholder="Prénom"
          value={values.firstname}
          onChange={handleChange}
          errors={errors}
          required
        />

        <InputText
          name="lastname"
          label="Nom"
          placeholder="Nom"
          value={values.lastname}
          onChange={handleChange}
          errors={errors}
          required
        />

        <InputText
          name="email"
          label="Email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          errors={errors}
          required
        />

        <InputPassword
          name="password"
          label="Mot de passe"
          placeholder="Mot de passe"
          value={values.password}
          onChange={handleChange}
          errors={errors}
          required
        />

        <InputPassword
          name="password_confirmation"
          label="Confirmer mot de passe"
          placeholder="Confirmer mot de passe"
          value={values.password_confirmation}
          onChange={handleChange}
          errors={errors}
          required
        />

        <Button
          type="submit"
          variant="default"
          className="w-full bg-green-800 text-white hover:bg-green-700"
          loading={loading}
        >
          Créer un compte
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
