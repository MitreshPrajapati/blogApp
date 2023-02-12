import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { BiHome, BiPlus } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'


export const MenuBar = () => {
const navigate = useNavigate()
    
  return (
    <>
    <Menu>
  <MenuButton
    as={IconButton}
    aria-label='Options'
    icon={<HamburgerIcon />}
    variant='outline'
  />
  <MenuList>
    <MenuItem border={'1px solid transparent'}  onClick={()=>navigate('/blog')}  icon={<BiHome />}>
      Home
    </MenuItem>
    <MenuItem border={'1px solid transparent'}  onClick={()=>navigate('/writeblog')}  icon={<BiPlus/>}>
      Write Blog
    </MenuItem>
    
  </MenuList>
</Menu>
    
    </>
  )
}


