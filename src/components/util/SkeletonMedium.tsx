import { Card, CardBody, Skeleton, Stack } from "@chakra-ui/react";

function SkeletonMedium() {
  return (
    <Card m="3">
      <CardBody>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="40px" />
        </Stack>
      </CardBody>
    </Card>
  );
}

export default SkeletonMedium;
