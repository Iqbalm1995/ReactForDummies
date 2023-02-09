import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { DataTable } from "./DataTable";
import FlexContent from "./HeaderContent";
import { Link, Outlet } from "react-router-dom";
import { getUserList } from "../services/UserServices";

interface IdataUsers {
  id: number;
  username: string;
  fullName: string;
  createdAt: Date;
  createdBy: string;
}

interface IResponseData {
  statusCode: number;
  message: string;
  count: number;
  countTotal: number;
  data: IdataUsers[];
}

const columnHelper = createColumnHelper<IdataUsers>();

const columns = [
  columnHelper.accessor("username", {
    cell: (info) => info.getValue(),
    header: "Username",
  }),
  columnHelper.accessor("fullName", {
    cell: (info) => info.getValue(),
    header: "Full Name",
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <Link to={`/form?userId=${info.getValue()}`}>
        <Button colorScheme="teal" variant="solid">
          Edit
        </Button>
      </Link>
    ),
    header: "Action",
  }),
];

const limit = 10;
const page = 1;
const search = "";

export const TablePage = () => {
  const TitlePage = "Table Page";
  const BreadcrumbData = ["Home", "Table Page"];
  const [dataUsers, setDataUsers] = React.useState<IdataUsers[] | []>([]);

  let UserID = null;
  let GenerateLinkForm = UserID != null ? `/form?userId=${UserID}` : "/form";
  // let dataUsers: ResponseData;
  useEffect(() => {
    try {
      var UserData = getUserList({ limit, page, search });
      UserData.then(function (response) {
        setDataUsers(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <FlexContent titleName={TitlePage} breadCrumb={BreadcrumbData} />
      {/* <MidContentAlt /> */}
      <Flex minWidth="max-content" justifyContent="flex-end" gap="2" m="3">
        <Link to={GenerateLinkForm}>
          <Button colorScheme="teal" size="lg" variant="solid">
            Add User
          </Button>
        </Link>
      </Flex>
      <Card m="3">
        <CardHeader>
          <Heading size="md">Client Report</Heading>
        </CardHeader>

        <CardBody>
          <DataTable columns={columns} data={dataUsers} />
        </CardBody>
      </Card>
    </div>
  );
};
