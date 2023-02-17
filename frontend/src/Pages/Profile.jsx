import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Container,
  SimpleGrid,
  GridItem,
  Divider,
  useColorMode,
  Spinner,
} from "@chakra-ui/react";
import { URL } from "../api";
import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "../components/pages.module.css";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";

export const Profile = () => {
  let CurrentUser = JSON.parse(localStorage.getItem("CurrentUser"));
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  // console.log(CurrentUser._id)
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const getProfile = () => {
    axios
      .get(`${URL}user/${CurrentUser._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
        },
      })
      .then((res) => {
        // console.log(res)
        setUser(res.data);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getBlogs = () => {
    axios
      .get(`${URL}blog/own/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // console.log(data)

  return (
    <>
      <Navbar />
      <Box height={"65px"} scrollBehavior="smooth"></Box>
      <Center py={6}>
        <Box
          maxW={"270px"}
          w={"full"}
          // bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"120px"}
            w={"full"}
            src={user?.avatar}
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              name={user?.user_name}
              src={user?.avatar}
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {user?.user_name}
              </Heading>
              <Text color={"gray.500"}>{user?.email}</Text>
            </Stack>

            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Followers
                </Text>
              </Stack>
            </Stack>

            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Center>

      <br />
      <Divider />
      <br />
      <Box>
        <Text
          textAlign={"center"}
          fontSize={"3xl"}
          fontFamily="cursive"
          fontWeight="700"
        >
          My Blogs
        </Text>
      </Box>
      <br />
      <Container
        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        maxW={["97%", "90%", "90%"]}
        p='1rem'
      >
        <Box>
          {data.length == 0 ? (
            <Flex columnGap='5px' justifyContent={'center'} alignItems="center">
              <Box >
                <Button
                  isLoading
                  loadingText="Write some blog!!"
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="start"
                >
                  Submit
                </Button>
               
              </Box>
              <Box>
              <Button onClick={()=>navigate('/writeblog')}>
              <ArrowRightIcon/> Write blogs
                </Button>
              </Box>
            </Flex>
          ) : (
            <SimpleGrid p={3} columns={[1, 2, 3]} spacing={3} gap={5}>
              {data.length > 0 &&
                data.map((blogs) => {
                  return (
                    <GridItem
                      cursor={"pointer"}
                      key={blogs._id}
                      onClick={() => navigate(`/singleblog/${blogs._id}`)}
                      borderRadius="5px"
                      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    >
                      <Box p={5} margin={"auto"}>
                        <Image src={blogs.images} borderRadius="5px" />
                        <Text
                          color={colorMode === "light" ? "black" : "red"}
                          fontSize={["md", "lg"]}
                          mt={4}
                          className={Styles.blog_title}
                          fontWeight="700"
                        >
                          {blogs.title}
                        </Text>
                        <Text className={Styles.blog_desc} mt="5px">
                          {blogs.desc}
                        </Text>
                      </Box>
                    </GridItem>
                  );
                })}
            </SimpleGrid>
          )}
        </Box>
      </Container>
      <br />
      <br />
      <br />
    </>
  );
};
