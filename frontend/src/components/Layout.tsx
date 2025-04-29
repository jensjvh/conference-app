import { useState } from "react";
import { useNavigate, Outlet } from "react-router";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div>
      {/* AppBar */}
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Button
            color="secondary"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </Button>
          <Button
        color="secondary"
        onClick={() => navigate('/')}
        style={{ textTransform: 'none' }} 
      >
        IEEE Services 2025
      </Button>

        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <List sx={{ width: 240 }}>
          <ListItemButton
            onClick={() => {
              navigate("/");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/schedule");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Schedule" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/map");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Map" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/links");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Visiting Helsinki" />
          </ListItemButton>

        </List>
      </Drawer>

      {/* Main Content */}
      <Container style={{ marginTop: "5rem", paddingBottom: "2rem" }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;