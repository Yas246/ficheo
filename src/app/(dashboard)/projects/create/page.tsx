"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateEditProject from "@/components/CreateEditForm/Project";

export default function Create() {
  return (
    <div>
      <Breadcrumb pageName="Créer Mission" />
      <CreateEditProject />
    </div>
  );
}
