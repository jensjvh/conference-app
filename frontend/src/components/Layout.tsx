import { useState } from "react";
import { useNavigate, Outlet } from "react-router";
import { 
  AppBar, 
  Toolbar, 
  Button,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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
            IEEE SERVICES 2025
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
              navigate("/program");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Program" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/map");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Conference Map" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/venues");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Venue Locations" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/links");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Visiting Helsinki" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/peopleflow");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="People Flow" />
          </ListItemButton>
           <ListItemButton
            onClick={() => {
              navigate("/history");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="IEEE History" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
    <Container style={{ marginTop: "6rem", paddingBottom: "2rem", textAlign: "center" }}>
  <Outlet />
  
  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 20, mt: 10 }}>
    <img src="./img/logoMegasense.png" alt="Megasense" style={{ height: 70 }}   />
    <img src="./img/logoUH.png" alt="Helsinki University" style={{ height: 95 }} />
    <img src="./img/logoUPF.png" alt="Untangling People Flow" style={{ height: 70 }} />
   
  </Box>

</Container>


    </div>
  );
};

export default Layout;
