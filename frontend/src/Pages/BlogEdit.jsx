import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL } from "../api";
import Styles from "../components/pages.module.css";

export const BlogEdit = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImageUrl] = useState("");
  let [value, setValue] = useState(0);
  const [data, setData] = useState("");
  const [profilePic, setProfilePic] = useState({});
  const [profileUrl, setProfileUrl] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const { id } = useParams();
  const toast = useToast();
  let count = 0;

  // console.log(id)
  const getBlogs = () => {
    return axios
      .get(`${URL}blog/posts/${id}`, {
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

  const handleProfilePic = async (e) => {
    e.preventDefault();

    console.log(profilePic);
    let formData = new FormData();
    await formData.append("image", profilePic);
    console.log(formData);

    axios
      .post(`${URL}profileUrl`, formData)
      .then((res) => {
        // console.log(res.data.data[0].url);
        setProfileUrl(res.data.data[0].url);
        setImageUpload(true)
        toast({
          position: "top",
          duration: 2000,
          render: () => (
            <Box
              color="black"
              mt={"80px"}
              bgColor="gray.50"
              fontSize={"lg"}
              borderRadius={"10px"}
              p={3}
            >
              Image Upload Successfuly
            </Box>
          ),
        });
      })
      .catch((err) => console.log(err));
  };

  const handleBlog = () => {
    const payload = {
      images:
        profileUrl ||
        data.images ||
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: title || data.title,
      desc: desc || data.desc,
    };
    axios
      .patch(`${URL}blog/update/${id}`, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("blogToken")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        toast({
          position: "top",
          duration: 2000,
          render: () => (
            <Box
              color="black"
              mt={"80px"}
              // bgGradient="linear(to-r, red.400,pink.400)"
              bgColor="gray.50"
              fontSize={"lg"}
              borderRadius={"10px"}
              p={3}
            >
              😊Your Blog update successfully!!
            </Box>
          ),
        });
        setImageUrl({});
        setProfileUrl({})
        setValue(0);
        setDesc("");
        setTitle("");
      });
  };

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setDesc(inputValue);
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === " ") {
        count++;
      }
    }
    setValue(count + 1);
  };

  return (
    <>
      <Navbar />
      <Box height={"65px"} scrollBehavior="smooth"></Box>
      <Center
        fontFamily={"cursive"}
        fontSize={["2xl", "4xl"]}
        bg="tomato"
        h="60px"
        bgGradient="linear(to-r, red.400,pink.400)"
        color="white"
      >
        Edit Your Blog
      </Center>

      <Container
        boxShadow="rgba(0, 0, 0, 0.10) 0px 2px 4px, rgba(0, 0, 0, 0.5) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
        p={5}
        borderRadius={10}
        maxW={["90%", "60%", "50%", "40%"]}
        mt={"0.5rem"}
      >
        <FormControl>
          <FormLabel>Select Image</FormLabel>
          <form encType="multipart/form-data">
            <Flex columnGap={2}>
              <label className={Styles.label}>
                <Input
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  // value = {profilePic}
                  type="file"
                  color={"gray.500"}
                  accept="png/jpeg"
                  required
                  isDisabled={profileUrl ? true : false}
                />
                <span> Choose Picture</span>
              </label>
              <Button
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                onClick={handleProfilePic}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                isDisabled={profileUrl ? true : false}
              >
                Upload
              </Button>
            </Flex>
          </form>
          <br />
          <FormLabel>Image Url</FormLabel>
          <Input
            type="text"
            onChange={(e) => setProfileUrl(e.target.value)}
            placeholder="Image Url"
            isDisabled={imageUpload ? true : false}
          />
          <br />
        <br />
          <FormLabel>Give Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
          />
          <br />

          <br />
          <FormLabel>Describe Your Blog</FormLabel>
          <Textarea
            value={desc}
            //   onChange={(e)=>setDesc(e.target.value)}
            onChange={handleInputChange}
            placeholder="Write your blog..."
            size="sm"
          />
          <Text mb="8px" mt={"3px"}>
            Total Word: {value}
          </Text>
        </FormControl>
        <br />
        <Button  onClick={handleBlog}>
        Edit Blog
        </Button>
      </Container>
    </>
  );
};
