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
import React from "react";
import { DataTable } from "./DataTable";
import FlexContent from "./HeaderContent";
import { Link, Outlet } from "react-router-dom";

type UnitConversion = {
  fromUnit: string;
  toUnit: string;
  factor: number;
};

const data: UnitConversion[] = [
  {
    fromUnit: "inches",
    toUnit: "millimetres (mm)",
    factor: 25.4,
  },
  {
    fromUnit: "feet",
    toUnit: "centimetres (cm)",
    factor: 30.48,
  },
  {
    fromUnit: "yards",
    toUnit: "metres (m)",
    factor: 0.91444,
  },
];

const columnHelper = createColumnHelper<UnitConversion>();

const columns = [
  columnHelper.accessor("fromUnit", {
    cell: (info) => info.getValue(),
    header: "To convert",
  }),
  columnHelper.accessor("toUnit", {
    cell: (info) => info.getValue(),
    header: "Into",
  }),
  columnHelper.accessor("factor", {
    cell: (info) => info.getValue(),
    header: "Multiply by",
    meta: {
      isNumeric: true,
    },
  }),
];

export const TablePage = () => {
  const TitlePage = "Table Page";
  const BreadcrumbData = ["Home", "Table Page"];

  return (
    <div>
      <FlexContent titleName={TitlePage} breadCrumb={BreadcrumbData} />
      {/* <MidContentAlt /> */}
      <Flex minWidth="max-content" justifyContent="flex-end" gap="2" m="3">
        <Link to="/form">
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
          <DataTable columns={columns} data={data} />
        </CardBody>
      </Card>
    </div>
  );
};
