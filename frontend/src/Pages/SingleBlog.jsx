import {
  Box,
  Heading,
  Image,
  Text,
  Container,
  SimpleGrid,
  GridItem,
  Center,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../api";
import { Navbar } from "../components/Navbar";

export const SingleBlog = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  const { id } = useParams();

  const getSingleBlog = () => {
    setLoading(true);
    axios
      .get(`${URL}blog/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSingleBlog();
  }, []);

  if (loading) {
    return (
      <Center mt={"5rem"}>
        <Spinner />
      </Center>
    );
  } else {
    return (
      <>
        <Navbar />
        <Box height={"65px"} scrollBehavior="smooth"></Box>
        <Container
          mt="1rem"
          boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
          p={5}
          mb="1rem"
          maxW={["95%", "90%", "80%"]}
          borderRadius="0.5rem"
        >
          <SimpleGrid
            p="1rem"
            templateColumns={[
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(2,auto)",
            ]}
            gap="1.5rem"
            rowGap={"1rem"}
          >
            <GridItem>
              <Image borderRadius="0.35rem" m="auto" src={data.images} />
            </GridItem>
            <GridItem>
              <Heading
                as="h1"
                p="0 0 0.5rem 0"
                fontStyle="italic"
                fontSize={["xl", "2xl", "3xl"]}
              >
                {data.title}
              </Heading>
              <Text textAlign={"justify"} fontSize={["sm", "lg", "xl"]}>
                {data.desc}
              </Text>
            </GridItem>
          </SimpleGrid>

          <Box>
            <Text
              p="0.2rem 1rem"
              fontSize={"sm"}
              color={colorMode === "light" ? "black" : "gray.100"}
              fontWeight="600"
              fontFamily="cursive"
            >
              Author : {data.username}
            </Text>
            <Text
              p="0.2rem 1rem"
              fontSize={"sm"}
              color={colorMode === "light" ? "black" : "gray.100"}
              fontWeight="600"
              fontFamily="cursive"
            >
              Posted : {data.createdAt?.slice(0, 10)}
            </Text>
          </Box>
        </Container>
      </>
    );
  }
};
