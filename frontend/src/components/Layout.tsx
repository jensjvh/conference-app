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
          <Typography
            variant="h6"
            style={{ flexGrow: 1, color: theme.palette.secondary.main }}
            align="left"
          >
            IEEE Services 2025
          </Typography>
          <Button 
            color="secondary" 
            onClick={() => navigate("/")}
          >
            Conference info
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
            <ListItemText primary="Conference Info" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/map");
              setIsSidebarOpen(false);
            }}
          >
            <ListItemText primary="Map" />
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