import {
  Box,
  Button,
  Center,
  Container,
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

export const BlogEdit = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImageUrl]= useState('')
  let [value, setValue] = useState(0);
  const [ data, setData] = useState("")
  const {id} = useParams()
  const toast = useToast();
  let count = 0;

  // console.log(id)
  const getBlogs = () => {
    return axios
      // .get(`https://blogapp-gp7t.onrender.com/blog/posts/${id}`, {
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

  // console.log(data.images)
  




  
  const handleBlog = () => {
      const payload = {
        images : images || data.images || 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600', 
        title : title || data.title,
        desc : desc || data.desc
      };
      console.log(payload);
      // axios.patch(`https://blogapp-gp7t.onrender.com/blog/update/${id}`,
      axios.patch(`${URL}blog/update/${id}`,
          JSON.stringify(payload),
          {
            headers: {
              "Content-Type": "application/json",
              Authentication: `Bearer ${localStorage.getItem("blogToken")}`
            },
          }
        )
        .then((res) => {
          console.log(res);
           toast({
            position: "top",
            duration: 2000,
            render: () => (
              <Box
                color="black"
                mt={'80px'}
                // bgGradient="linear(to-r, red.400,pink.400)"
                bgColor='gray.50'
                
                fontSize={"lg"}
                borderRadius={"10px"}
                p={3}
              >
                😊Your Blog update successfully!!
              </Box>
            )
          })
          setImageUrl('')
          setValue(0);
          setDesc("");
          setTitle("");
        });
    
    //  else if( images==='' || title === "" || desc === "") {
    //   return toast({
    //     position: "top",
    //     duration: 2000,
    //     render: () => (
    //       <Box
    //         color="black"
    //         mt={'80px'}
    //         // bgGradient="linear(to-r, red.400,pink.400)"
    //         bgColor='gray.50'
            
    //         fontSize={"lg"}
    //         borderRadius={"10px"}
    //         p={3}
    //       >
    //         😡Please fill all the fields below!!
    //       </Box>
    //     ),
    //   });
    // }
  }

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
        fontSize={['2xl',"4xl"]}
        bg="tomato"
        h="100px"
        bgGradient="linear(to-r, red.400,pink.400)"
        color="white"
      >
        Edit Your Blog
      </Center>

      <Container
        boxShadow="rgba(0, 0, 0, 0.10) 0px 2px 4px, rgba(0, 0, 0, 0.5) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
        p={5}
        borderRadius={10}
        maxW={['90%', '60%','50%','40%']}
        mt={"2rem"}
      >
        <FormControl>
          <FormLabel>Image Url</FormLabel>
          <Input
            type="text"
            value={images}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="ImageUrl.."
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
          <Text mb="8px" mt={'3px'}>Total Word: {value}</Text>
        </FormControl>
        <br />
        <Button onClick={handleBlog}>Add Blog</Button>
      </Container>
    </>
  );
};

// function Example() {
//     let [value, setValue] = React.useState('')
//     let [len,setLen]=React.useState('')
//   let count=0
//     let handleInputChange = (e) => {
//       let inputValue = e.target.value
//       setValue(inputValue)
//      for(let i=0;i<inputValue.length;i++)
//      {
//      if(inputValue[i]===' ')
//      {
//      count++
//      }
//      }
//       setLen(count+1)

//     }
//     return (
//       <>
//         <Text mb='8px'>Value: {value}</Text>
//         <Text mb='8px'>Word: {len}</Text>
//         <Textarea
//           value={value}
//           onChange={handleInputChange}
//           placeholder='Here is a sample placeholder'
//           size='sm'
//         />
//       </>
//     )
//   }
