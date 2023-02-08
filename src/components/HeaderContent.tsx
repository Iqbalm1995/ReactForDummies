import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  chakra,
  Spacer,
} from "@chakra-ui/react";

function FlexContent({ titleName, breadCrumb }: any) {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" p="3">
      <Box p="2">
        <chakra.h2 fontSize="3xl" fontWeight="700">
          {titleName}
        </chakra.h2>
      </Box>
      <Spacer />
      <Breadcrumb p="2">
        {breadCrumb.map((item: string) => {
          return (
            <BreadcrumbItem key={item}>
              <BreadcrumbLink href="#">{item}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Flex>
  );
}

export default FlexContent;
