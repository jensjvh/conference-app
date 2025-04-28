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
            sx={{ mb: 0.5 }}
        >
            Floor {floor_n}
        </Button>
    );

    return (
        <Box sx={{ height: "100%" }}>
            <Typography variant="h4" gutterBottom>
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
                borderRadius: 1
            }}>
                {FloorButton(1)}
                {FloorButton(2)}
                {FloorButton(3)}
                {FloorButton(4)}
            </Box>
            <Box sx={{
                height: "calc(100vh - 500px)",
                width: "100%",
                overflow: "hidden"
            }}>
                <MapInteractionCSS>
                <img 
            src={image_path} 
            alt={`Conference Map - Floor ${currentFloor}`}
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block"
            }}
          />
                </MapInteractionCSS>
            </Box>
        </Box>
    );
}

export default ConferenceMap;
