import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
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
    <MenuItem border={'1px solid transparent'}  onClick={()=>navigate('/writeblog')}  icon={<AddIcon />}>
      Write Your Blog
    </MenuItem>
    
  </MenuList>
</Menu>
    
    </>
  )
}


// _hover={{border:'1px solid gray'}}