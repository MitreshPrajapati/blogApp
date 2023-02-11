import {
  Container,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
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
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./pages.module.css";
import { AddIcon, ChevronDownIcon, DeleteIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { AiOutlineLike, AiOutlinePoweroff } from "react-icons/ai";
import { BiHomeAlt, BiMessageAlt } from "react-icons/bi";

export const BlogPage = () => {
  const [data, setData] = useState([]);
  const { colorMode } = useColorMode();
  console.log(colorMode)

  const getBlogs = () => {
   return axios
      .get(`https://blogapp-gp7t.onrender.com/blog/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);



  const handleDelete = (id)=>
  {
    try{
      axios.delete(`https://blogapp-gp7t.onrender.com/blog/delete/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
        },
      })
      .then((res=>{
        console.log(res)
        getBlogs()
        

      }))
    }
    catch(err)
    {
      console.log(err)
    }
  }


 



  return (
    <Container overflow={"hidden"}  maxW="100%">
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
            <Card border='1px solid lightgray' maxW="md">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={blogs.username}
                      src="https://bit.ly/sage-adebay"
                    />

                    <Box>
                      <Heading size="sm" _hover={{textDecoration:"underline", cursor:'pointer'}}>{blogs.username}</Heading>
                      <Text color={ colorMode==='light' ? 'black'  : "white"} fontSize={"xs"}>
                        Posted: {blogs.createdAt.slice(0, 10)}
                      </Text>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                  >
                    <Menu >
                      <MenuButton
                        as={IconButton}
                        aria-label="Button"
                        icon={<BsThreeDotsVertical />}
                        variant="host"
                      />
                      <MenuList>
                        <MenuItem icon={<EditIcon />} >
                          Edit
                        </MenuItem>
                        <MenuItem onClick={()=>handleDelete(blogs._id)}  icon={<DeleteIcon />}>
                          Delete
                        </MenuItem>
                        
                      </MenuList>
                    </Menu>
                  </IconButton>
                </Flex>
              </CardHeader>
              <Image  height={'220px'} src={blogs.images} alt="Chakra UI" />
              <CardBody>
                <Text className={Styles.blog_desc}>{blogs.desc}</Text>
              </CardBody>

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button flex="1" variant="ghost">
                  <AiOutlineLike /> Like
                </Button>
                <Button flex="1" variant="ghost">
                  <BiMessageAlt /> Comment
                </Button>
                <Button flex="1" variant="ghost">
                  <FiShare /> Share
                </Button>
              </CardFooter>
            </Card>
          </Center>
        ))
      )}
    </Container>
  );
};
