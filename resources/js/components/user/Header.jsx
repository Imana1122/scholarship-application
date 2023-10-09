import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Link as MuiLink,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import ApplicationLogo from '../ApplicationLogo';
import { Link } from '@inertiajs/react';

export const Header = ({ navigation }) => {

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>


            <ApplicationLogo className="flex-shrink-0 md:h-[5rem] h-10"/>


          <div style={{ flexGrow: 1 }} />
          <div className="hidden md:flex md:items-end space-x-5">
            <div>
            {navigation.map((item) => (
              <Button
                key={item.name}
                component={Link}
                href={item.to}
                color={window.location.pathname === item.to ? 'primary' : 'inherit'}
                variant="text"
              >
                {item.name}
              </Button>
            ))}
            </div>
            <Button
              color="primary"
              href="/login-choose-user"
              component={Link}
              variant="contained"
            >
              Login
            </Button>

          </div>
          <div className="flex md:hidden">
            <IconButton
              color="inherit"
              onClick={toggleMobileMenu}
              edge="end"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        variant="temporary"
      >
        <List component="nav">
          {navigation.map((item) => (
            <ListItem
              color={window.location.pathname === item.to ? 'primary' : 'inherit'}
              key={item.name}
              component={Link}
              href={item.to}
              onClick={toggleMobileMenu}
            >
              <Button
                color={window.location.pathname === item.to ? 'primary' : 'inherit'}
                variant="text"
              >
                {item.name}
              </Button>
            </ListItem>
          ))}
          <ListItem
          >
           <Button
              color="primary"
              href="/login-choose-user"
              component={Link}
              variant="contained"
            >
              Login
            </Button>
          </ListItem>


        </List>
      </Drawer>
    </div>
  );
};
