import React, { useEffect } from "react";
import { FormUsers } from "./FormUsers";
import FlexContent from "./HeaderContent";
import { useSearchParams } from "react-router-dom";
import { getUserDetail } from "../services/UserServices";

interface IDataBinding {
  id: string;
  username: string;
  fullName: string;
  password: string;
}

interface IResponseData {
  statusCode: number;
  message: string;
  data: IDataBinding;
}

export const FormPage = () => {
  const [searchParams] = useSearchParams();
  const [dataUsers, setDataUsers] = React.useState<IDataBinding>();

  let TitlePage = "Form Page";
  const BreadcrumbData = ["Home", "Form Page"];
  let UserID = searchParams.get("userId");
  let editMode = false;

  useEffect(() => {
    try {
      var UserData = getUserDetail(UserID?.toString());
      UserData.then(function (response) {
        setDataUsers(response.data.data);
      });
    } catch (error) {}
  }, []);

  let dataUserBinding: IDataBinding = {
    id: "",
    username: "",
    fullName: "",
    password: "",
  };

  if (UserID !== null) {
    editMode = true;

    if (dataUsers !== null) {
      dataUserBinding.id = dataUsers?.id.toString() ?? "";
      dataUserBinding.username = dataUsers?.username ?? "";
      dataUserBinding.fullName = dataUsers?.fullName ?? "";
      dataUserBinding.password = dataUsers?.password ?? "";
    }
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
