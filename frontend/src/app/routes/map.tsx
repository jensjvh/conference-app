import { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import { Box, Button, Typography, useMediaQuery, Popover, Paper, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import InfoIcon from '@mui/icons-material/Info';

interface MapProps {
  floor?: number;
}

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

function ConferenceMap(props: MapProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentFloor, setCurrentFloor] = useState<number>(props.floor || 1);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [touchedHotspotId, setTouchedHotspotId] = useState<string | null>(null);

  useEffect(() => {
    if (props.floor !== undefined) {
      setCurrentFloor(props.floor);
    }
  }, [props.floor]);

  const handleHotspotClick = (event: React.MouseEvent<HTMLDivElement>, hotspot: Hotspot) => {
    setAnchorEl(event.currentTarget);
    setActiveHotspot(hotspot);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveHotspot(null);
  };

  const open = Boolean(anchorEl);

  const image_path: string = `/floor_${currentFloor}.png`;

  const hotspots: Hotspot[] = [
    {
      id: "main-hall",
      x: 50,
      y: 70,
      floor: 1,
      title: "Entrance Hall",
      description: "",
      icon: 'room',
      color: "#E91E63"
    },
    {
      id: "registration",
      x: 45,
      y: 70,
      floor: 1,
      title: "Registration Desk",
      description: "",
      icon: 'info',
      color: "#2196F3"
    },
    {
      id: "cafeteria",
      x: 66.5,
      y: 48,
      floor: 1,
      title: "Cafeteria",
      description: "Coffee breaks and lunch",
      icon: 'food',
      color: "#FF9800"
    },
    {
      id: "room-a",
      x: 47.7,
      y: 59,
      floor: 2,
      title: "Room A",
      description: "",
      icon: 'room',
      color: "#4CAF50"
    },
    {
      id: "room-b",
      x: 47.7,
      y: 44,
      floor: 2,
      title: "Room B",
      description: "",
      icon: 'room',
      color: "#9C27B0"
    },
  ];

  const FloorButton = (floor_n: number) => (
    <Button
      color="primary"
      variant="outlined"
      onClick={() => setCurrentFloor(floor_n)}
      sx={{
        mb: 0.5,
        backgroundColor: currentFloor === floor_n ? theme.palette.primary.main : 'transparent',
        color: currentFloor === floor_n ? '#fff' : theme.palette.primary.main,
        '&:hover': {
          backgroundColor: currentFloor === floor_n ? theme.palette.primary.dark : theme.palette.action.hover,
        },
      }}
    >
      Floor {floor_n}
    </Button>
  );

  const getHotspotIcon = (type: string) => {
  switch (type) {
    case 'room': return <MeetingRoomIcon />;
    case 'food': return <RestaurantIcon />;
    case 'info': return <InfoIcon />;
    default: return <InfoIcon />;
  }
};

  return (
    <Box sx={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 'bold', pb: 2 }}
      >
        Conference Map
      </Typography>

      <Box sx={{
        mb: 2,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1,
        position: "center",
        top: isMobile ? 70 : 80,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 1,
        borderRadius: 1,
      }}>
        {FloorButton(1)}
        {FloorButton(2)}
        {FloorButton(3)}
        {FloorButton(4)}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #ccc",
          borderRadius: 1,
          padding: 1,
          height: isMobile ? "60vh" : "calc(100vh - 300px)",
          position: "relative"
        }}
      >
        <MapInteractionCSS key={currentFloor}>
          <Box sx={{ position: 'relative' }}>
            <img
              src={image_path}
              alt={`Conference Map - Floor ${currentFloor}`}
              style={{
                width: isMobile ? "auto" : "100%",
                height: "100%",
                objectFit: isMobile ? "cover" : "contain",
                display: "block",
              }}
            />
            {hotspots
              .filter(hotspot => hotspot.floor === currentFloor)
              .map(hotspot => (
                <Box
                  key={hotspot.id}
                  onClick={(e) => handleHotspotClick(e, hotspot)}
                  onTouchStart={() => setTouchedHotspotId(hotspot.id)}
                  onTouchEnd={() => setTouchedHotspotId(null)}
                  sx={{
                    position: 'absolute',
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    width: isMobile ? 12 : 36,
                    height: isMobile ? 12 : 36,
                    borderRadius: '50%',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    zIndex: 5,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    backgroundColor: touchedHotspotId === hotspot.id ?
                      theme.palette.primary.dark :
                      hotspot.color || theme.palette.primary.main,
                    transform: touchedHotspotId === hotspot.id ?
                      'translate(-50%, -50%) scale(1.2)' :
                      'translate(-50%, -50%)',
                    '&:hover': {
                      transform: 'translate(-50%, -50%) scale(1.1)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                    },
                  }}
                  aria-describedby={`popover-${hotspot.id}`}
                >
                  {/* Smaller icons on mobile */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& svg': {
                        fontSize: isMobile ? '10px' : '20px',
                        width: isMobile ? '10px' : '20px',
                        height: isMobile ? '10px' : '20px',
                      }
                    }}
                  >
                    {getHotspotIcon(hotspot.icon)}
                  </Box>
                </Box>
              ))}
          </Box>
        </MapInteractionCSS>
      </Box>
      {isMobile && (
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
                  color: 'white'
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
                  color: 'white'
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
                  color: 'white'
                }}
              >
                <InfoIcon fontSize="small" />
              </Box>
              <Typography variant="body2">Information</Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Popover
        id={activeHotspot ? `popover-${activeHotspot.id}` : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: isMobile ? 'bottom' : 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: isMobile ? 'top' : 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            maxWidth: isMobile ? '85vw' : 300,
            minWidth: isMobile ? '85vw' : 'auto',
            boxShadow: isMobile ? '0px 5px 15px rgba(0,0,0,0.2)' : undefined,
          }
        }}
      >
        {activeHotspot && (
          <Paper sx={{ p: 2, position: 'relative' }}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" component="h3" sx={{ pr: 4, color: activeHotspot.color }}>
              {activeHotspot.title}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {activeHotspot.description}
            </Typography>
          </Paper>
        )}
      </Popover>
    </Box>
  );
}

export default ConferenceMap;