import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

export default function NavigationBar({ auth }) {
    console.log(auth)
    const navigate = useNavigate();
    const handleNavigate = () => {
        auth ? navigate('/') : window.location.href = 'http://localhost:5001/auth/google';
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component={Link} sx={{ flexGrow: 1 }} to='/trends' style={{ textDecoration: "none", color: "inherit" }}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
