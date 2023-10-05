import AppBar from "@mui/material/AppBar"
import Toolbar from '@mui/material/Toolbar';
import * as Styles from "./styles"
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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

const Navbar = () => {
    const routes = navbarRoutes;
    const navigate = useNavigate();
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
                <Avatar sx={Styles.userNavigationAvatarStyle}/>
            </Toolbar>
        </AppBar>
    )
}


export default Navbar