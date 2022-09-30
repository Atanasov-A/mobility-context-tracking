import { AccountCircle } from "@mui/icons-material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MenuIcon from "@mui/icons-material/Menu";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import "moment/locale/de";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../../api/server/auth/login";
import { RoutesComponent } from "../../routes/RoutesComponent";
import { useAuthToken } from "../shared/hooks/useAuthToken";
import { AppBar } from "./AppBar";
import { DrawerHeader } from "./DrawerHeader";
import { ListItemLink } from "./ListItemLink";
import { Main } from "./Main";

const drawerWidth = 240;

function AppBarWithMainLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { getToken, clearTokenStorage } = useAuthToken();
  const navigate = useNavigate();

  const authToken = getToken();

  React.useEffect(() => {
    if (authToken != null) {
      validateToken()
        .then()
        .catch((e) => {
          clearTokenStorage();
          navigate("/login");
        });
    }
  }, [authToken, clearTokenStorage, navigate]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearTokenStorage();
    handleClose();
    navigate("/login");
  };

  React.useEffect(() => {
    moment.locale("de");
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ flexGrow: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mobi context tracking
          </Typography>
          {authToken && (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemLink
            to="/add-route"
            primary="Add activity"
            icon={<AddLocationAltIcon />}
          />
          <ListItemLink
            to="/overall-statistics"
            primary="Overall statistics"
            icon={<PieChartIcon />}
          />
          <ListItemLink
            to="/personal-statistics"
            primary="Personal statistics"
            icon={<LeaderboardIcon />}
          />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <RoutesComponent />
      </Main>
    </Box>
  );
}

export { AppBarWithMainLayout };
