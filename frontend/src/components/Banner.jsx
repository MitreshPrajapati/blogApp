import { Box, Center, Flex, FormControl, Image, Text } from "@chakra-ui/react";
import React from "react";
import blogBanner from "../assets/banner3.jpg";
import { Navbar } from "./Navbar";

export const Banner = () => {
  return (
      <>
      <Navbar/>
      <Box height={'65px'} scrollBehavior='smooth'>
   </Box>
     <Center fontFamily={'cursive'} fontSize={['2xl','2xl']} bg='tomato' h='150px'  bgGradient="linear(to-r, red.400,pink.400)" color='white'>
  Write Your Blog
</Center>

    <FormControl>

    </FormControl>
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