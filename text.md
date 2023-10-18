// // import { Container } from '../Container/Container';
// import React, { useState, useEffect, useId } from 'react';
// // import { menu } from '../../assets'
// import { Logo, LogoutBtn} from '../index'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// function Header(){
//     const [ active, setActive ] = useState("Home");
//     const [ toggle, setToggle ] = useState(false);
//     // taking out from state whether its authenticated or not
//     const authStatus = useSelector((state) => state.auth.status)
//     // to navigate
//     // const navigate = useNavigate();
//     const navLinks = [
//         {
//             id: "home",
//             name: "Home",
//             slug: "/",
//             active: true,
//         },
//         {
//             id: "posts",
//             name: "Posts",
//             slug : "/posts",
//             active: true,
//         },
//         {
//             id: "add-post",
//             name: "Add Post",
//             slug: "/add-post",
//             active: authStatus,
//         },
//     ]
    
//     return (
//         <header className="py-2 shadow bg-primary">
//         {/* <Container> */}
//         <div className='w-full overflow-hidden'>
//             <div className={`sm:px-6 px-6 flex justify-center items-center`}>
//                 <div className={`xl:max-w-[1280px] w-full`}>
//                     <nav className='w-full flex py-6 justify-between items-center navbar'>
//                         {/* logo */}
//                         <h1 className='text-2xl text-white'>
//                             <Link to='/'>
//                                 <Logo width='70px'/>
//                             </Link>
                           
//                             </h1>
//                         {/* Desktop navigation */}
//                         <ul className='list-node sm:flex hidden justify-center items-center flex-1'>
//                             {navLinks.map((nav,index) => (
//                                 active ?
//                                 <li 
//                                 key={nav.id}
//                                 className={`cursor-pointer font-poppins font-normal text-[16px] text-white ${index === navLinks.length-1 ? "mr-0" : "mr-6"}`}
//                                 // onClick={() => navigate(nav.slug)}
//                                 >
//                                     <a href={`#${nav.id}`}>{nav.name}</a>
//                                 </li> : null
//                             ))}
//                         </ul>
//                         {/* mobile navigation */}
//                         <div className='sm:hidden flex flex-1 justify-end items-center'>
//                             <img 
//                             // src={menu}
//                             alt='menu'
//                             className='w-6 h-6 object-contain'
//                             onClick={() => setToggle(!toggle)}
//                             />
//                             {/* sidebar */}
//                             <div
//                             className={`${!toggle ? "hidden" : "flex"}
//                             p-6 bg-black gradiant absolute top-20 right-0 mx-4 my-2 min-2-[140px] rounded-xl sidebar`}
//                             >
//                                 <ul className='list-none flex justify-end items-start flex-1 flex-col'>
//                                 {navLinks.map((nav,index) => (
//                                     <li 
//                                     key={nav.id}
//                                     className={`cursor-pointer font-medium font-poppins text-[16px] text-white
//                                      ${index === navLinks.length-1 ? "mb-0" : "mb-4"}`}
//                                     //  onClick={() => navigate(nav.slug)}
//                                      >
//                                         <a href={`#${nav.id}`}>{nav.name}</a>
//                                     </li>
//                                 ))}
//                                 </ul>
//                             </div>
//                         </div>
//                         {!authStatus && (
//                             <div>
//                                 <button className='h-12 w-25 text-white mr-6'>Sign In</button>
//                                 <button className='h-12 w-25 text-white'>Sign Up</button>
//                             </div>
//                         )}
//                         {authStatus && <button className='h-12 w-25 text-white'><LogoutBtn/></button>}
//                     </nav>
//                 </div>
//             </div>
//         </div>
//         {/* </Container> */}
//         </header>
//     );
// };