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
import arun from "../assets/arun_png.png";
import mitresh from "../assets/mitresh.jpg";
import axios from "axios";
import { URL } from "../api";

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

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    if (email !== "" && password !== "") {
      const payload = {
        email,
        password,
      };

      axios.post(`${URL}auth/login`, payload).then((res) => {
        if (res.data.token) {
          console.log(res.data);
          localStorage.setItem("blogToken", res.data.token);
          localStorage.setItem("CurrentUser", JSON.stringify(res.data.user));

          return (
            // console.log(res.data),
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
                  👉Login Successfully!!
                </Box>
              ),
            }),
            navigate("/blog")
          );
        } else {
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
                🤔Invalid Credentials!! 👉 Please try again later!!
              </Box>
            ),
          });
        }
      });
    } else if (email === "" || password === "") {
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
            😡Please fill all the fields below!!
          </Box>
        ),
      });
    }
  };

  const goToSignup = () => {
    return navigate("/signup");
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
            Already our member{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Login from here!
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
              Login
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
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
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
              {/* <Button  fontFamily={"heading"} bg={"gray.200"} color={"gray.800"}>
                Signup
              </Button> */}
              <Button variant={"link"} size="xs" onClick={() => setShow(!show)}>
                {show ? "Hide Password" : "Show Password"}
              </Button>
            </Stack>
            <Button
              fontFamily={"heading"}
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
              Login
            </Button>
            <Text
              textAlign={"center"}
              mt={5}
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "md" }}
            >
              If you are new to our blog app
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
                  onClick={goToSignup}

                  //   variant="link"
                >
                  Register
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
