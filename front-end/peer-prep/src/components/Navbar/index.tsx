import AppBar from "@mui/material/AppBar"
import Toolbar from '@mui/material/Toolbar';
import * as Styles from "./styles"
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../Auth/Firebase";

const navbarRoutes = [
    {
        text: "Question",
        link: "/home"
    },
    {
        text: "Profile",
        link: "/user"
    }
]

const settings = [
    {
        text:   "User Profile",
        link: "/user",
        icon: <PersonIcon/>
    },
    {
        text: "Appearance",
        link: "/home",
        icon: <Brightness6Icon/>
    },
    {
        text: "Sign Out",
        link: "/signin",
        icon: <LogoutIcon/>
    }

]

const Navbar = () => {
    const routes = navbarRoutes;
    const navigate = useNavigate();
    const [isMenuToggled,toggleMenu] = useState(false)
    const [signOut,loading,error] = useSignOut(auth)
    return (
        <AppBar position="absolute" style={Styles.navbarContainerStyle}>
            <Toolbar>
                <Box sx={Styles.navbarButtonContainerStyle}>
                    {routes.map((item) => (
                    <Button key={item.link} sx={Styles.navbarButtonStyle} onClick={(e) => {
                        e.stopPropagation();
                        navigate(item.link)
                    }}>
                        {item.text.toLowerCase()}
                    </Button>
                    ))}
                </Box>
                <Avatar sx={Styles.userNavigationAvatarStyle} onClick={() => toggleMenu(!isMenuToggled)}/>
            </Toolbar>
            <Menu
              sx={Styles.MenuStyle}
              id="menu-appbar"
              keepMounted
              open={isMenuToggled}
              onClose={() => toggleMenu(false)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} 
                    onClick={() => {
                        if (setting.text == "Sign Out") {
                            signOut();
                            toggleMenu(false);
                        } else {
                            toggleMenu(false);
                            navigate(setting.link);
                        }
                    }}
                    sx={Styles.MenuItemsStyle}
                >
                    {setting.icon}
                    <Typography textAlign="center" sx={{marginLeft: "10px"}}>{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </AppBar>
    )
}


export default Navbar