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
    <MenuItem border={'1px solid transparent'} _hover={{border:'1px solid gray'}} onClick={()=>navigate('/writeblog')}  icon={<AddIcon />}>
      Write Your Blog
    </MenuItem>
    <MenuItem border={'1px solid transparent'} _hover={{border:'1px solid gray'}}  icon={<ExternalLinkIcon />} >
      New Window
    </MenuItem>
    <MenuItem border={'1px solid transparent'} _hover={{border:'1px solid gray'}}  icon={<RepeatIcon/>} >
      Open Closed Tab
    </MenuItem>
    <MenuItem border={'1px solid transparent'} _hover={{border:'1px solid gray'}}  icon={<EditIcon />}>
      Open File...
    </MenuItem>
  </MenuList>
</Menu>
    
    </>
  )
}
