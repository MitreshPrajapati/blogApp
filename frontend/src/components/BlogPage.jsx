import {
  Container,
  Box,
  Center,
  Heading,
  Text,
  Avatar,
  Image,
  useColorMode,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Card,
  CardHeader,
  Flex,
  IconButton,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./pages.module.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { URL } from "../api";

export const BlogPage = () => {
  const [data, setData] = useState([]);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  // console.log(colorMode);

  let currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

  const getBlogs = () => {
    return (
      axios
        // .get(`https://blogapp-gp7t.onrender.com/blog/posts`, {
        .get(`${URL}blog/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
        })
    );
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleDelete = (id) => {
    try {
      axios
        // .delete(`https://blogapp-gp7t.onrender.com/blog/delete/${id}`, {
        .delete(`${URL}blog/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
          },
        })
        .then((res) => {
          // console.log(res);

          getBlogs();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container overflow={"hidden"} maxW="100%">
      {data.length === 0 ? (
        <Center mt="6rem">
          <Box>
            <Text>👉Loading </Text>
          </Box>
          <br />

          <Box>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        </Center>
      ) : (
        data.length > 0 &&
        data?.map((blogs) => (
          <Center marginTop={5}>
            <Card border="1px solid lightgray" w="md">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={blogs.username}
                      src="https://bit.ly/sage-adebay"
                      // src={blogs.avatar}
                    />

                    <Box>
                      <Heading
                        size="sm"
                        _hover={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {blogs.username}
                      </Heading>
                      <Text
                        color={colorMode === "light" ? "black" : "white"}
                        fontSize={"xs"}
                      >
                        Posted: {blogs.createdAt.slice(0, 10)}
                      </Text>
                    </Box>
                  </Flex>

                  {currentUser.user_name.toLowerCase() ===
                  blogs.username.toLowerCase() ? (
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                    >
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Button"
                          icon={<BsThreeDotsVertical />}
                          variant="host"
                        />

                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              navigate(`/blog/${blogs._id}`);
                            }}
                            icon={<EditIcon />}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDelete(blogs._id)}
                            icon={<DeleteIcon />}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Flex>
              </CardHeader>
              <Image
                height={"220px"}
                onClick={() => navigate(`/singleblog/${blogs._id}`)}
                cursor="pointer"
                src={blogs.images}
                alt="Chakra UI"
                objectFit={'contain'}
              />
              <CardBody>
                <Text
                  fontSize={"xl"}
                  className={Styles.blog_title}
                  mb={2}
                  onClick={() => navigate(`/singleblog/${blogs._id}`)}
                  color={colorMode === "light" ? "black" : "red"}
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                  fontWeight="700"
                >
                  {blogs.title}
                </Text>
                <Text className={Styles.blog_desc}>{blogs.desc}</Text>
              </CardBody>

              <CardFooter justify="space-between" flexWrap="wrap">
                <Button flex="1" variant="ghost">
                  <AiOutlineLike /> Like
                </Button>
                <Button flex="1" variant="ghost">
                  <BiMessageAlt /> Comment
                </Button>
              </CardFooter>
            </Card>
          </Center>
        ))
      )}
    </Container>
  );
};
