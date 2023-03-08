
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {NavLink,DropdownItem,NavbarText,Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem,UncontrolledDropdown,DropdownToggle,DropdownMenu, Container} from "reactstrap";
import React,{useContext, useEffect, useState} from "react";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

const CustomNavbar=()=>{

  const userContextData=useContext(userContext)
   let navigate =useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [login,setLogin]=useState(false)

    const [user,setUser]=useState(undefined)

    useEffect(()=>{
      setLogin(isLoggedIn( ))
      setUser(getCurrentUserDetail())
    },[login])

    const logout=()=>{
      doLogout(()=>{
        //logged out
        setLogin(false)
        userContextData.setUser({
          data:null,
          login:false
        })
        navigate("/")
      })
    }
    
    return(
     <div>
         <Navbar color="dark" dark fixed="" expand="md" className="px-5">
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/about">About </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/services">Contact us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>LinkedIn</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={ReactLink} to="/www.youtube.com">Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <Nav navbar>
            {
              login && (
                <>

              <NavItem>
                <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                  Profile Info
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={ReactLink} to="/user/dashboard">
                  {user.email}
                </NavLink>
              </NavItem>

              
              <NavItem>
                <NavLink onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
                </>
              )
            }
          {
            !login && (
               <>
               <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
          <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>
               </>
            )
          }
          </Nav>
        </Collapse>
      </Navbar>
     </div>

    );
};
export default CustomNavbar;