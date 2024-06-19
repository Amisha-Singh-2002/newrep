import React,{ useState } from 'react'
import "./navbar.css"
import logo from "./assets/logo1.png"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import {SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
const Menu = () => (
  <>
    <p><a className='navlink' href='/'>Home</a></p>
    <p><a className='navlink' href='/chat'>Chat Bot</a></p>
  </>
)

const Navbar = () => {
  const User = useUser();
  React.useEffect(() => {
   const f=async() =>{
     if(User && User.isLoaded && User.user)
      {
        
        
        console.log(User.user.emailAddresses[0].emailAddress);
      }
   else{
      console.log("User not loaded");
      
   }
  }
  f();
   
  }, [User])
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div style={{display:"flex",alignItems:"center"}} className="gpt3__navbar-links_logo">
          <img src={logo} alt="GPT3 Logo" /> <h1>Criti<span className="picc">-Q</span> </h1>
        </div>
        <div className="gpt3__navbar-links_container">
          <Menu />
        </div>
        <div className="gpt3__navbar-wrapper">

          <div className="gpt3__navbar-sign">
            <p>
              <SignedOut>
                <SignInButton className="navlink" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </p>
            
          </div>
          {/* Responsive part for mobiles devices */}
          {/* hamburger menu */}
          <div className="gpt3__navbar-menu">
            {toggleMenu
              ? <RiCloseLine color="black" size={27} onClick={() => setToggleMenu(false)} />
              : <RiMenu3Line color="black" size={27} onClick={() => setToggleMenu(true)} />
            }
            {toggleMenu &&
              <div className="gpt3__navbar-menu_container scale-up-center">
                <div className="gpt3__navbar-menu_container-links">
                  <Menu />
                </div>
                <div className="gpt3__navbar-menu_container-links-sign">
                  <p>
                    <SignedOut>
                      <SignInButton className="nav_button" />
                    </SignedOut>
                    <SignedIn>
                      <UserButton className="nav_link" />
                    </SignedIn>
                  </p>
                  
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar