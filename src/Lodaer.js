import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Flex, Text } from "rebass";

export function Lodaer() {
  return (
    <Flex style={{ height: "100vh" }} alignItems="center" justifyContent="center" width="100%">
      <CircularProgress />
      <Text ml="20px" color="white" fontSize="22px">
        Loading...
      </Text>
    </Flex>
  );
}
