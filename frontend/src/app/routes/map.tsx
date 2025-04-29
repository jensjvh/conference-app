import { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface MapProps {
    floor?: number;
}

function ConferenceMap(props: MapProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentFloor, setCurrentFloor] = useState<number>(props.floor || 1);

    useEffect(() => {
        if (props.floor !== undefined) {
            setCurrentFloor(props.floor);
        }
    }, [props.floor]);

    const image_path: string = `/floor_${currentFloor}.png`;

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

    return (
        <Box sx={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
            <Typography
            variant="h4"
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
                position: "sticky",
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
  }}
>
  <MapInteractionCSS key={currentFloor}>
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
  </MapInteractionCSS>
</Box>

        </Box>
    );
}

export default ConferenceMap;
