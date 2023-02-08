import React from "react";
import { FormUsers } from "./FormUsers";
import FlexContent from "./HeaderContent";
import { useSearchParams } from "react-router-dom";

export const FormPage = () => {
  const [searchParams] = useSearchParams();

  let TitlePage = "Form Page";
  const BreadcrumbData = ["Home", "Form Page"];
  let UserID = searchParams.get("userId");
  let editMode = false;
  let dataUserBinding = {
    username: "",
    fullName: "",
    password: "",
  };

  if (UserID != null) {
    editMode = true;

    dataUserBinding.username = "iqbalm1995";
    dataUserBinding.fullName = "Mohamad Iqbal Musyaffa";
    dataUserBinding.password = "oakwokawo";
  }

  if (editMode) {
    TitlePage = "Detail Users";
  } else {
    TitlePage = "Add Users";
  }

  return (
    <div>
      <FlexContent titleName={TitlePage} breadCrumb={BreadcrumbData} />
      <FormUsers editMode={editMode} dataBinding={dataUserBinding} />
    </div>
  );
};
