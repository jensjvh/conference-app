import React, { useState, useEffect } from "react";
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, ImageOverlay, Marker, Popup, useMap, Pane } from "react-leaflet";
import L from "leaflet";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FloorIcon from '@mui/icons-material/Layers';

interface MapProps {
  floor?: number;
}

const iconMap = {
  room: <MeetingRoomIcon style={{ color: '#E91E63', fontSize: 24 }} />,
  food: <RestaurantIcon style={{ color: '#FF9800', fontSize: 24 }} />,
  info: <InfoIcon style={{ color: '#2196F3', fontSize: 24 }} />,
};

interface Hotspot {
  id: string;
  x: number;
  y: number;
  floor: number;
  title: string;
  description: string;
  icon: 'room' | 'food' | 'info';
  color?: string;
}



const getLeafletIcon = (type: 'room' | 'food' | 'info', color: string = '#E91E63') => {
  const iconElement = (
    <div style={{
      backgroundColor: color,
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      border: '2px solid white'
    }}>
      {React.cloneElement(iconMap[type], {
        style: {
          color: 'white',
          fontSize: 20
        }
      })}
    </div>
  );

  const iconSvgString = renderToStaticMarkup(iconElement);

  return L.divIcon({
    html: iconSvgString,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
};

const LegendControl = () => {
  const map = useMap();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const legendIcons = {
    room: renderToStaticMarkup(
      <div style={{
        backgroundColor: '#E91E63',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        border: '1px solid white'
      }}>
        <MeetingRoomIcon style={{ color: 'white', fontSize: 14 }} />
      </div>
    ),
    food: renderToStaticMarkup(
      <div style={{
        backgroundColor: '#FF9800',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        border: '1px solid white'
      }}>
        <RestaurantIcon style={{ color: 'white', fontSize: 14 }} />
      </div>
    ),
    info: renderToStaticMarkup(
      <div style={{
        backgroundColor: '#2196F3',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        border: '1px solid white'
      }}>
        <InfoIcon style={{ color: 'white', fontSize: 14 }} />
      </div>
    ),
  };

  useEffect(() => {
    if (isMobile) return;
    
    const legend = L.control.attribution({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      div.style.padding = "10px 12px";
      div.style.borderRadius = "6px";
      div.style.fontSize = "14px";
      div.style.fontWeight = "500";
      div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
      div.style.border = "1px solid rgba(0,0,0,0.1)";
      div.style.maxWidth = "200px";

      div.innerHTML = `
        <div style="margin-bottom: 8px; font-weight: bold; color: #333;">Map Legend</div>
        <div style="display:flex; align-items:center; margin-top:6px;">
          <span style="margin-right:10px; display:flex; align-items:center;">${legendIcons.room}</span>
          <span style="color: #333;">Conference Rooms</span>
        </div>
        <div style="display:flex; align-items:center; margin-top:6px;">
          <span style="margin-right:10px; display:flex; align-items:center;">${legendIcons.food}</span>
          <span style="color: #333;">Food</span>
        </div>
        <div style="display:flex; align-items:center; margin-top:6px;">
          <span style="margin-right:10px; display:flex; align-items:center;">${legendIcons.info}</span>
          <span style="color: #333;">Information</span>
        </div>
      `;

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map, legendIcons, isMobile]);

  return null;
};

const MobileLegend = () => {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        borderRadius: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
        Map Legend:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              bgcolor: '#E91E63',
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              color: 'white',
              border: '1px solid white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            <MeetingRoomIcon fontSize="small" />
          </Box>
          <Typography variant="body2">Conference Rooms</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              bgcolor: '#FF9800',
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              color: 'white',
              border: '1px solid white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            <RestaurantIcon fontSize="small" />
          </Box>
          <Typography variant="body2">Food</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              bgcolor: '#2196F3',
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              color: 'white',
              border: '1px solid white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            <InfoIcon fontSize="small" />
          </Box>
          <Typography variant="body2">Information</Typography>
        </Box>
      </Box>
    </Box>
  );
};

function ConferenceMap({ floor = 1 }: MapProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentFloor, setCurrentFloor] = useState(floor);

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  // Menu handlers
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFloorSelect = (floorNum: number) => {
    setCurrentFloor(floorNum);
    handleMenuClose();
  };

  useEffect(() => {
    setCurrentFloor(floor);
  }, [floor]);

  const imageWidth = 1200;
  const imageHeight = 800;
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [imageHeight, imageWidth],
  ];

  const hotspots: Hotspot[] = [
    {
      id: "main-hall",
      x: 50,
      y: 27.7,
      floor: 1,
      title: "Entrance Hall",
      description: "",
      icon: "room",
      color: "#E91E63",
    },
    {
      id: "registration",
      x: 45,
      y: 27.7,
      floor: 1,
      title: "Registration Desk",
      description: "",
      icon: "info",
      color: "#2196F3",
    },
    {
      id: "cafeteria",
      x: 66.5,
      y: 48,
      floor: 1,
      title: "Cafeteria",
      description: "Coffee breaks and lunch",
      icon: "food",
      color: "#FF9800",
    },
    {
      id: "room-a",
      x: 47.7,
      y: 59,
      floor: 2,
      title: "Room A",
      description: "",
      icon: "room",
      color: "#4CAF50",
    },
    {
      id: "room-b",
      x: 47.7,
      y: 44,
      floor: 2,
      title: "Room B",
      description: "",
      icon: "room",
      color: "#9C27B0",
    },
    {
      id: "u3032",
      x: 32.5,
      y: 78,
      floor: 3,
      title: "U3032",
      description: "FastCon WS & ICWS",
      icon: "room",
      color: "#9C27B0",
    },
    {
      id: "f3010",
      x: 32.5,
      y: 23,
      floor: 3,
      title: "F3032",
      description: "GraphD Symp, Sus/Res Symp & ICWS",
      icon: "room",
      color: "#9C27B0",
    },
  ];

  const toLatLng = (xPercent: number, yPercent: number): [number, number] => {
    const lat = (yPercent / 100) * imageHeight;
    const lng = (xPercent / 100) * imageWidth;
    return [lat, lng];
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", pb: 2 }}>
        Venue Map
      </Typography>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 1,
          borderRadius: 1,
        }}
      >
        <Button
          id="floor-button"
          aria-controls={menuOpen ? 'floor-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={handleMenuClick}
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowDownIcon />}
          startIcon={<FloorIcon />}
          sx={{
            width: isMobile ? '100%' : 'auto',
            textTransform: 'none',
          }}
        >
          Floor {currentFloor}
        </Button>
        <Menu
          id="floor-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              sx: {
                '& .MuiList-root': {
                  py: isMobile ? 0.5 : 1,
                }
              }
            }
          }}
          aria-labelledby="floor-button"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
>
          {[1, 2, 3, 4].map((floorNum) => (
            <MenuItem
              key={floorNum}
              onClick={() => handleFloorSelect(floorNum)}
              selected={currentFloor === floorNum}
              sx={{
                minWidth: 120,
                fontWeight: currentFloor === floorNum ? 'bold' : 'normal',
              }}
            >
              <ListItemIcon>
                <FloorIcon color={currentFloor === floorNum ? "primary" : "action"} />
              </ListItemIcon>
              Floor {floorNum}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          border: "2px solid #ccc",
          borderRadius: 1,
          overflow: "hidden",
          height: isMobile ? "60vh" : "calc(100vh - 200px)",
        }}
      >
        <MapContainer
          crs={L.CRS.Simple}
          bounds={bounds}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          center={[imageHeight / 2, imageWidth / 2]}
          zoomControl={true}
          zoom={0}
          minZoom={-1}
          maxZoom={2}
        >
          <ImageOverlay 
            key={`floor-${currentFloor}`}
            url={import.meta.env.BASE_URL + `img/floor_${currentFloor}.png`} 
            bounds={bounds} 
          />

          <Pane name="markers" style={{ zIndex: 600 }}>
            {hotspots
              .filter((h) => h.floor === currentFloor)
              .map((hotspot) => {
                const position = toLatLng(hotspot.x, hotspot.y);
                return (
                  <Marker
                    key={hotspot.id}
                    position={position}
                    icon={getLeafletIcon(hotspot.icon, hotspot.color)}
                  >
                    <Popup>
                      <Typography variant="h6" sx={{ color: hotspot.color, fontWeight: "bold" }}>
                        {hotspot.title}
                      </Typography>
                      <Typography variant="body2">{hotspot.description}</Typography>
                    </Popup>
                  </Marker>
                );
              })}
          </Pane>

          <LegendControl />
        </MapContainer>
      </Box>

      {isMobile && <MobileLegend />}
    </Box>
  );
}

export default ConferenceMap;
