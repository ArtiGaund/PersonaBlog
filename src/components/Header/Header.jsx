import React, { useEffect, useState, useId } from 'react';
// using container
import { Container, Logo, LogoutBtn } from '../index';
// Links for redirections
import { Link, useNavigate } from 'react-router-dom';
// selector to check in store whether user is login or not
import { useSelector } from 'react-redux';
import {
Navbar,
Typography,
List,
Button,
Collapse, 
IconButton,
ListItem,
} from "@material-tailwind/react"
import {
HomeModernIcon,
Bars3Icon,
PhotoIcon,
Square3Stack3DIcon,
UserCircleIcon,
XMarkIcon,
} from "@heroicons/react/24/outline"


function Header(){
    // taking out from state whether its authenticated or not
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    // state for navigation bar 
    const [ openNav, setOpenNav ] = useState(false)
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >=960 && setOpenNav(false)
        )
    },[])

    // when this type of navigation is made, we take array and loop through it, array contain multiple objects
    // slug means where url is going

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
            icon: <HomeModernIcon className='h-[18px] w-[18px]'/>,
            key: 1,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: true,
            icon: <Square3Stack3DIcon className='h-[18px] w-[18px]'/>,
            key: 2,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
            icon: <PhotoIcon className='h-[18px] w-[18px]'/>,
            key: 3,
        },
    ]
    
    return(
        <header className='py-5'>
            <Container className='bg-gray-800'>
                <Navbar className='mx-auto max-w-screen-xl px-4 py-2 bg-gray-700 border-transparent rounded-full'>
                    <div className='flex items-center justify-between text-blue-gray-900'>
                        {/* <Typography
                        as="a"
                        href='/'
                        variant='h6'
                        className='mr-4 cursor-pointer py-1.5 lg:ml-2 text-white'
                        onClick={() => navigate("/")}
                        >
                            Arti Gaund
                        </Typography> */}
                        <Link to="/">
                            <Logo width='70px'/>
                        </Link> 
                        {/* {/* navbar list */}
                       <div className='hidden lg:block'>
                            {/* <NavList /> */}
                            <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
                                {navItems.map(({ name, slug, active, icon, key}) => (
                                    active ?
                                    <Typography
                                    key={key}
                                    as="a"
                                    variant='small'
                                    color={active ? 'blue-gray' : 'gray'}
                                    className='font-normal text-white border-transparent'
                                    onClick={()=> navigate(slug)}
                                    >
                                        <ListItem className='flex items-center gap-2 py-2 pr-4 font-bold' key={key}>
                                            {icon}
                                            {name}
                                        </ListItem>
                                    </Typography> : null
                                ))}
                            </List>
                       </div>
                       {!authStatus && (
                            <div className='hidden gap-2 lg:flex font-bold'>
                                <Button variant='text' size='sm' color='pink'
                                onClick={() => navigate("/login")}>Sign In</Button>
                                <Button variant='gradient' size='sm' color='pink'
                                onClick={() => navigate("/signup")} className='bg-pink-500'>Sign Up</Button>
                                
                            </div>
                        )}
                        {authStatus && (
                            <div className='hidden gap-2 lg:flex'>
                                <LogoutBtn />
                            </div>
                        )}
                        
                   {/* for small window size */}
                        <IconButton
                        variant='text'
                        color='blue-gray'
                        className='lg:hidden'
                        onClick={()=> setOpenNav(!openNav)}
                        >
                            {openNav ? 
                            <XMarkIcon color='white' className='h-6 w-6' strokeWidth={2}/> : <Bars3Icon color='white' className='h-6 w-6' strokeWidth={2}/>}
                        </IconButton>
                    </div>
                    <Collapse open={openNav}>
                        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
                            {navItems.map(({ name, slug, active, icon, key}) => (
                            active ?
                                <Typography
                                key={key}
                                as="a"
                                variant='small'
                                color={active ? 'blue-gray' : 'gray'}
                                className='font-normal text-white'
                                onClick={()=> navigate(slug)}
                                >
                                    <ListItem className='flex items-center gap-2 py-2 pr-4 font-bold'>
                                        {icon}
                                        {name}
                                    </ListItem>
                                </Typography> : null
                            ))}
                        </List>
                        {!authStatus && (<div className='flex w-full flex-nowrap items-center gap-2 lg:hidden'>
                            <Button variant='outlined' size='sm' color='pink' fullWidth
                            onClick={() => navigate("/login")}>Sign In</Button>
                            <Button variant='gradient' size='sm' fullWidth
                            onClick={() => navigate("/signup")} color='pink'>Sign Up</Button>
                        </div>)}
                        {authStatus && (
                            <div className='flex w-full flex-nowrap items-center gap-2 lg:hidden'>
                                <LogoutBtn />
                            </div>
                        )}
                    </Collapse>
                </Navbar>
            </Container>
        </header>
    )
}



export default Header;