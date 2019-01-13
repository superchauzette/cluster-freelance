import React from "react";
import { Image } from "rebass";

export const BigAvatar = ({ ...props }) => (
  <Image width={["60%", "170px"]} height={["60%", "170px"]} borderRadius="50%" {...props} />
);
