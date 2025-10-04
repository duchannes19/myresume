import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Language from './language';
import Flag from 'react-flagkit';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import ResponsiveImage from './ResponsiveImage';
import logoImage from './images/logo.png?w=96;128&as=picture&imagetools';
import logoPlaceholder from './images/logo.png?w=24&blur=35&q=45&as=base64&imagetools';

const Navbar = ({ setCenter, preloadSection }) => {
    const { i18n, t } = useTranslation();
    const [selectedLanguage, setLanguage] = useState('en');

    const pages = [t('navbar.about'), t('navbar.resume'), 'Portfolio', t('navbar.contact')];
    const it = { flag: <Flag country="IT" className='flag' />, name: t('navbar.italian'), value: 'it' }
    const en = { flag: <Flag country="US" className='flag' />, name: t('navbar.english'), value: 'en' }
    const settings = [it, en];

    const changeLanguage = (language) => {
        const selectedLanguage = language;
        i18n.changeLanguage(selectedLanguage);
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlePrefetch = (value) => {
        if (typeof preloadSection === 'function') {
            preloadSection(value);
        }
    };

    const handlesection = (value) => {
        handlePrefetch(value);
        setCenter(value);
    };

    return (
        <AppBar position="static">
            <Toolbar disableGutters className='navbar'>
                <IconButton sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, ml: 1 }} >
                    <ResponsiveImage
                        data={logoImage}
                        placeholder={logoPlaceholder}
                        alt='Andrea Massignan personal logo'
                        className='navbar-logo'
                        loading='eager'
                        fetchpriority='high'
                        useCdn={false}
                        sizes='64px'
                    />
                </IconButton>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page, index) => (
                            <MenuItem
                                key={page}
                                onPointerEnter={() => handlePrefetch(index)}
                                onFocus={() => handlePrefetch(index)}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    handlesection(index);
                                }}
                            >
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page, index) => (
                        <Button
                            key={page}
                            onMouseEnter={() => handlePrefetch(index)}
                            onFocus={() => handlePrefetch(index)}
                            onTouchStart={() => handlePrefetch(index)}
                            onClick={() => {
                                handleCloseNavMenu();
                                handlesection(index);
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            className='navbar-buttons'
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title={t('navbar.language')}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }} >
                            <Language selectedLanguage={selectedLanguage} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                {setting.flag}
                                <Typography textAlign="center"
                                    onClick={() => {
                                        setLanguage(setting.value);
                                        changeLanguage(setting.value);
                                    }}
                                >{setting.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;