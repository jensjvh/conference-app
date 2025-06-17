import { useState, useEffect } from "react";
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, ImageOverlay, Marker, Popup, useMap, Pane } from "react-leaflet";
import L from "leaflet";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import InfoIcon from '@mui/icons-material/Info';

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

const getLeafletIcon = (type: 'room' | 'food' | 'info') => {
  const iconSvgString = renderToStaticMarkup(iconMap[type]);
  return L.divIcon({
    html: iconSvgString,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const LegendControl = () => {
  const map = useMap();

  const legendIcons = {
    room: renderToStaticMarkup(<MeetingRoomIcon style={{ color: '#E91E63', fontSize: 20 }} />),
    food: renderToStaticMarkup(<RestaurantIcon style={{ color: '#FF9800', fontSize: 20 }} />),
    info: renderToStaticMarkup(<InfoIcon style={{ color: '#2196F3', fontSize: 20 }} />),
  };

  useEffect(() => {
    const legend = L.control.attribution({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
      div.style.padding = "10px";
      div.style.borderRadius = "5px";
      div.style.fontSize = "14px";

      div.innerHTML = `
        <strong>Map Legend</strong><br />
        <div style="display:flex; align-items:center; margin-top:5px;">
          <span style="margin-right:8px; display:flex; align-items:center;">${legendIcons.room}</span>
          Conference Rooms
        </div>
        <div style="display:flex; align-items:center; margin-top:5px;">
          <span style="margin-right:8px; display:flex; align-items:center;">${legendIcons.food}</span>
          Food
        </div>
        <div style="display:flex; align-items:center; margin-top:5px;">
          <span style="margin-right:8px; display:flex; align-items:center;">${legendIcons.info}</span>
          Information
        </div>
      `;

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map, legendIcons]);

  return null;
};


function ConferenceMap({ floor = 1 }: MapProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentFloor, setCurrentFloor] = useState(floor);

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
  ];

  const toLatLng = (xPercent: number, yPercent: number): [number, number] => {
    const lat = (yPercent / 100) * imageHeight;
    const lng = (xPercent / 100) * imageWidth;
    return [lat, lng];
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", pb: 2 }}>
        Conference Map
      </Typography>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 1,
          borderRadius: 1,
        }}
      >
        {[1, 2, 3, 4].map((floor_n) => (
          <Button
            key={floor_n}
            color="primary"
            variant="outlined"
            onClick={() => setCurrentFloor(floor_n)}
            sx={{
              mb: 0.5,
              backgroundColor: currentFloor === floor_n ? theme.palette.primary.main : "transparent",
              color: currentFloor === floor_n ? "#fff" : theme.palette.primary.main,
              "&:hover": {
                backgroundColor:
                  currentFloor === floor_n ? theme.palette.primary.dark : theme.palette.action.hover,
              },
            }}
          >
            Floor {floor_n}
          </Button>
        ))}
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
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          key={currentFloor} // reset map when floor changes
        >
          <ImageOverlay url={`/floor_${currentFloor}.png`} bounds={bounds} />

          <Pane name="markers" style={{ zIndex: 600 }}>
            {hotspots
              .filter((h) => h.floor === currentFloor)
              .map((hotspot) => {
                const position = toLatLng(hotspot.x, hotspot.y);
                return (
                  <Marker
                    key={hotspot.id}
                    position={position}
                    icon={getLeafletIcon(hotspot.icon)}
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
    </Box>
  );
}

export default ConferenceMap;
