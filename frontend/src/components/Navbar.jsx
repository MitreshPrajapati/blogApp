import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MenuBar } from "./MenuBar";
import lightImage from '../assets/2.png'
import darkImage from '../assets/1.png'

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    return( localStorage.removeItem("blogToken"),
    console.log('click'),
     navigate("/login")
    )
  };


  let currentUser = JSON.parse(localStorage.getItem('CurrentUser'))
  // console.log('currentUser', currentUser)

  return (
    <>
      <Box
        w="100%"
        position={"fixed"}
        zIndex="999999"
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <box>
            <MenuBar />
          </box>
          <Box
            fontSize={["lg", "2xl"]}
            fontWeight="bold"
            fontFamily={"cursive"}
          >
            <Box  cursor={"pointer"} onClick={() => navigate("/blog")}>
             <Image  boxSize='110px' w='130px'   src={colorMode === 'dark' ? lightImage : darkImage} />
            </Box>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    name={currentUser.user_name}
                    // src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      name={currentUser.user_name}
                      // src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{currentUser.user_name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => navigate("/profile")}>Your Profile</MenuItem>
                  <MenuItem onClick={ handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
