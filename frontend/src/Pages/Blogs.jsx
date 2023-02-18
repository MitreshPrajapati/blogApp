import { Box } from "@chakra-ui/react";
import React from "react";
import { BlogPage } from "../components/BlogPage";
import { Navbar } from "../components/Navbar";

export const Blogs = () => {
  return (
    <Box h={"90vh"}>
      <Navbar />
      <Box height={"65px"} scrollBehavior="smooth"></Box>

      <BlogPage />
    </Box>
  );
};
