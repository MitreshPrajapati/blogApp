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
  useColorMode
  
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { getColor } from "@chakra-ui/theme-tools";

export const BlogPage = () => {
    const [data, setData]= useState([])
    const { colorMode } = useColorMode();

    
    
    
    // const {
    //   colorMode
    // } = useColorMode();

    // return colorMode === "dark" ? setThemeCol('gray.900') : setThemeCol('white');
    
   

   

  
  
    


    const getBlogs = ()=>
    {
        axios.get(`https://blogapp-gp7t.onrender.com/blog/posts`,{
            headers : {
                'Content-Type': 'application/json',
                'Authentication' : `Bearer ${localStorage.getItem("blogToken")}`
            }
        })
        .then(res=>
            {
                console.log(res.data)
                setData(res.data)
            })
    }

    useEffect(()=>
    {
        getBlogs()
    },[])

    
  return   (
    <Container
      overflow={"hidden"}
      position={"absolute"}
      
      maxW="100%"
    >
     
     {
        data.length>0 && data?.map((blogs)=>  <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={ colorMode === "dark" ? 'white' : 'gray.900'}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Box
            // h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <Image
              src={
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
            //   layout={"fill"}
            />
          </Box>
          <Stack>
            {/* <Text
              color={"yellow"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Blog
            </Text> */}
            <Heading
              color={colorMode === "dark" ? 'gray.900' : 'white'}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
             {blogs.title}
            </Heading>
            <Text color={ colorMode === "dark" ? 'gray.900' : 'white'}>
             {blogs.desc}
            </Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
              alt={"Author"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text color={'red'} fontWeight={600}>Achim Rolle</Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
        </Box>
      </Center>)
     }
      
     </Container>
  );
};
