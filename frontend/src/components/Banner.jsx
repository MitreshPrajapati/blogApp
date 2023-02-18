import { Box, Center, Flex, FormControl, Image, Text } from "@chakra-ui/react";
import React from "react";
import blogBanner from "../assets/banner3.jpg";
import { Navbar } from "./Navbar";

export const Banner = () => {
  return (
    <>
      <Navbar />
      <Box height={"65px"} scrollBehavior="smooth"></Box>
      <Center
        fontFamily={"cursive"}
        fontSize={["2xl", "2xl"]}
        bg="tomato"
        h="150px"
        bgGradient="linear(to-r, red.400,pink.400)"
        color="white"
      >
        Write Your Blog
      </Center>

      <FormControl></FormControl>
    </>
  );
};
