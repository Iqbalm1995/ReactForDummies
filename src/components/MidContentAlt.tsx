import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

const MidContentAlt = () => {
  return (
    <Card m="3">
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box h="500px">
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
              <GridItem colSpan={9} h="500" bg="blue.500" />
              <GridItem colSpan={3} h="500" bg="blue.500" />
            </Grid>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MidContentAlt;
