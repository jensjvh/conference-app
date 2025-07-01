// BikeMapSection.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface VehicleType {
  formFactor: string;
}

interface Vehicle {
  count: number;
  vehicleType: VehicleType;
}

const backend_url =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001/graphql-proxy"
    : `${import.meta.env.BASE_URL}api/graphql-proxy`;

const BikeMap: React.FC = () => {
  const [stations, setStations] = useState<any[]>([]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchStations = () => {
      fetch(backend_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            vehicleRentalStations {
              stationId
              name
              lat
              lon
              allowPickup
              availableVehicles {
                byType {
                  count
                  vehicleType {
                    formFactor
                  }
                }
              }
            }
          }`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors)
            throw new Error(data.errors.map((e: any) => e.message).join(", "));
          setStations(data.data.vehicleRentalStations);
        })
        .catch((err) => console.error("Error fetching stations:", err));
    };

    fetchStations();
    const interval = setInterval(fetchStations, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: 8, width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <img
          src={import.meta.env.BASE_URL + "img/bike-svgrepo-com.svg"}
          alt="Bike"
          style={{ width: 28, height: 28 }}
        />
        Live HSL Bike Map
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: "100%",
          mx: "auto",
        }}
      >
        {/* Map Container */}
        <Box
          sx={{
            flex: 1.3,
            minWidth: isSmall ? "100%" : 300,
            maxWidth: isSmall ? "100%" : "none",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
            bgcolor: "background.paper",
            p: 2,
          }}
        >
          <Box
            sx={{
              height: 400,
              mt: 0,
              borderRadius: 3,
              overflow: "hidden",
              width: "100%",
              position: "relative",
            }}
          >
            <MapContainer
              center={[60.171, 24.951]}
              zoom={15}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "12px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {stations.map((station) => (
                <Marker
                  key={station.stationId}
                  position={[station.lat, station.lon]}
                >
                  <Popup>
                    <strong>{station.name}</strong>
                    <br />
                    {station.allowPickup
                      ? "Pickup allowed"
                      : "Pickup not allowed"}
                    <ul style={{ margin: 0, paddingLeft: "16px" }}>
                      {station.availableVehicles.byType.map(
                        (vehicle: Vehicle, idx: number) => (
                          <li key={idx}>
                            {vehicle.count}{" "}
                            {vehicle.vehicleType.formFactor.toLowerCase()}(s)
                          </li>
                        )
                      )}
                    </ul>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </Box>

        {/* Image Container */}
        <Box
          sx={{
            flex: 1,
            minWidth: isSmall ? "100%" : 300,
            maxWidth: isSmall ? "100%" : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
            p: 2,
          }}
        >
          <Box
            component="img"
            src={import.meta.env.BASE_URL + "img/Bikes.jpg"}
            alt="Bikes"
            sx={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: 2,
              maxWidth: "100%",
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontStyle: "italic", textAlign: "center" }}
          >
            HSL offers bikes for sustainable travel
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BikeMap;
