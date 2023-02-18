import React, { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import arun from "../assets/arun.png";
import mitresh from "../assets/mitresh.jpg";
import { URL } from "../api";
import Styles from "../components/pages.module.css";

const avatars = [
  {
    name: "mitresh",
    url: mitresh,
  },
  {
    name: "Arun",
    url: arun,
  },
];

export const Signup = () => {
  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState({});
  const [profileUrl, setProfileUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (
      user_name !== "" &&
      email !== "" &&
      password !== "" &&
      profileUrl !== ""
    ) {
      const payload = {
        user_name,
        email,
        password,
        avatar: profileUrl,
      };
      setLoading(false);
      axios.post(`${URL}auth/signup`, payload).then((res) => {
        if (res.data.message === "User already exists, Please Login") {
          toast({
            position: "top",
            duration: 2000,
            render: () => (
              <Box
                color="white"
                // bgGradient="linear(to-r, red.400,pink.400)"
                fontSize={"xl"}
                borderRadius={"10px"}
                p={3}
              >
                😡User Exist! Please Login
              </Box>
            ),
          });
          navigate("/login");
          setUsername("");
          setEmail("");
          setPassword("");
        } else if (res.data.message === "User registred successfully.") {
          // console.log(res.data);
          setLoading(true);

          toast({
            position: "top",
            duration: 2000,
            render: () => (
              <Box
                color="white"
                bgGradient="linear(to-r, red.400,pink.400)"
                fontSize={"xl"}
                borderRadius={"10px"}
                p={3}
              >
                😊 Hi connections!
                <br />
                😍 It's our pleauser
              </Box>
            ),
          });
          navigate("/login");
          setUsername("");
          setEmail("");
          setPassword("");
        }
      });
    } else if (user_name === "" || email === "" || password === "") {
      return toast({
        position: "top",
        duration: 2000,
        render: () => (
          <Box
            color="white"
            bgGradient="linear(to-r, red.400,pink.400)"
            fontSize={"xl"}
            borderRadius={"10px"}
            p={3}
          >
            😡😡Please Fill all the fields below
          </Box>
        ),
      });
    }
  };

  const goToLogin = () => {
    return navigate("/Login");
  };

  const handleProfilePic = async (e) => {
    e.preventDefault();

    console.log(profilePic);
    let formData = new FormData();
    await formData.append("image", profilePic);
    // console.log(formData);

    axios
      .post(`${URL}profileUrl`, formData)
      .then((res) => {
        // console.log(res.data.data[0].url);
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
        setProfileUrl(res.data.data[0].url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 8, lg: 25 }}
        py={{ base: 6, sm: 25, lg: 27 }}
      >
        <Stack spacing={{ base: 8, md: 18 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Join our Blog App{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Connect with Whole World
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={{ base: "lg", md: "xl" }}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={{ base: "60px", md: "90px" }}
              minHeight={{ base: "60px", md: "90px" }}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Join our team
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              We’re looking for amazing bloggers just like you! Become a part of
              our rockstar blogging team and skyrocket your thinking!
            </Text>
          </Stack>
          <Box mt={7}>
            <Stack spacing={3}>
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
                    />
                    <span> Choose Profile pic</span>
                  </label>
                  <Button
                    bgGradient="linear(to-r, red.400,pink.400)"
                    color={"white"}
                    onClick={handleProfilePic}
                    _hover={{
                      bgGradient: "linear(to-r, red.400,pink.400)",
                      boxShadow: "xl",
                    }}
                  >
                    Upload
                  </Button>
                </Flex>
              </form>

              <Input
                placeholder="Enter Name"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Enter your email"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Enter your Password"
                bg={"gray.100"}
                type={show ? "text" : "password"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant={"link"}
                size="xs"
                w="half"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide Password" : "Show Password"}
              </Button>
            </Stack>
            <Button
              isDisabled={profileUrl ? false : true}
              fontFamily={"heading"}
              isLoading={loading ? true : false}
              loadingText="Submitting"
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              onClick={handleSubmit}
            >
              Register
            </Button>
            <Text
              textAlign={"center"}
              mt={5}
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "md" }}
            >
              Already a member!
            </Text>
            <Box>
              <Text textAlign={"center"}>
                <Button
                  fontFamily={"heading"}
                  mt={2}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  onClick={goToLogin}

                  //   variant="link"
                >
                  Login
                </Button>
              </Text>
            </Box>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
};

export const Blur = (props) => {
  return (
    <Icon
      width={{ base: "100%", md: "40vw", lg: "30vw" }}
      zIndex={{ base: -1, md: -1, lg: 0 }}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
