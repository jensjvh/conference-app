import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Link,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const data = [
  { year: 2018, conferences: 1966, attendees: 561000, countries: 103 },
  { year: 2019, conferences: 1969, attendees: 547000, countries: 103 },
  { year: 2020, conferences: 1611, attendees: 465000, countries: 96 },
  { year: 2021, conferences: 1899, attendees: 572000, countries: 102 },
  { year: 2022, conferences: 2008, attendees: 534000, countries: 106 },
  { year: 2023, conferences: 2121, attendees: 562030, countries: 0 },
];

const factsMap: Record<number, string[]> = {
  2023: [
    "2,121 Conferences",
    "562,030 Conference Attendees",
    "CRA Sets Attendance Record with 6,000 participants",
  ],
  2022: [
    "2,008 Conferences in 106 countries",
    "534,000 Attendees - returned to pre-pandemic levels",
    "Increase in number of conferences",
  ],
  2021: [
    "1,899 Conferences in 102 countries",
    "572,000 Attendees (virtual & in-person)",
    "Hybrid conferences increased",
  ],
  2020: [
    "1,611 Conferences in 96 countries",
    "465,000+ Attendees (virtual & in-person)",
    "Pivot to virtual conferences due to COVID-19",
  ],
  2019: ["1,969 Conferences in 103 countries", "547,000 Attendees"],
  2018: ["1,966 Conferences in 103 countries", "561,000+ Attendees"],
};

const LineChartComponent = ({
  label,
  dataPoints,
  borderColor,
}: {
  label: string;
  dataPoints: number[];
  borderColor: string;
}) => {
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <Line
        data={{
          labels: data.map((d) => d.year.toString()),
          datasets: [
            {
              label,
              data: dataPoints,
              borderColor,
              fill: true,
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (tickValue: string | number) {
                  const value =
                    typeof tickValue === "number"
                      ? tickValue
                      : parseFloat(tickValue);
                  if (isNaN(value)) return tickValue;
                  return value >= 1_000_000
                    ? (value / 1_000_000).toFixed(1) + "M"
                    : value >= 1_000
                      ? (value / 1_000).toFixed(0) + "k"
                      : value.toString();
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

const TimelineFacts = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        mt: 8,
        px: isSmall ? 2 : 6,
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 0, textAlign: 'center' }}>
        IEEE Timeline
      </Typography>
      {[...data].reverse().map(({ year }) => (
        <Box
          key={year}
          sx={{
            position: "relative",
            pl: 4,
            borderLeft: "3px solid",
            borderColor: "primary.main",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "-28px",
              top: 0,
              width: 56,
              height: 56,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 18,
              cursor: "pointer",
            }}
            title={`Year ${year}`}
          >
            {year}
          </Box>
          <Box
            sx={{
              mt: 1,
              ml: 4,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
              fontSize: 14,
              maxHeight: 220,
              overflowY: "auto",
            }}
          >
            {factsMap[year]?.map((fact, i) => (
              <Typography
                key={i}
                variant="body1"
                color="text.secondary"
                sx={{ mb: i !== factsMap[year].length - 1 ? 1 : 0 }}
              >
                • {fact}
              </Typography>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

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

// Main Component
const DataDashboard: React.FC = () => {
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
          }`
        })
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
    <Box sx={{ p: 4, bgcolor: '#f9fafb', minHeight: '100vh', padding:'1em' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        People Flow
      </Typography>

      <Box
      component="img"
      src={import.meta.env.BASE_URL + "img/pastieeeconf.jpg"}
      alt="Past IEEE Conference"
      sx={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
      }}
      />

      <Typography
        variant="caption"
        display="block"
        sx={{ mt: 1, pb: 8, color: "text.secondary" }}
      >
          Jules van den Doel
          <Link
          href="https://creativecommons.org/licenses/by-nc-nd/2.0/deed.en"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          >(CC BY-NC-ND 2.0)</Link>
      
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >

        <Box
          sx={{
            flex: "1 1 500px",
            maxWidth: "600px",
            width: "100%",
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
            bgcolor: 'background.paper',
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            IEEE Conferences Over Time
          </Typography>
          <Divider />
          <Box sx={{ mt: 2, height: 300 }}>
            <LineChartComponent
              label="Conferences"
              dataPoints={data.map((d) => d.conferences)}
              borderColor="rgba(25, 118, 210, 1)"
            />
          </Box>
        </Box>

        <Box
          sx={{
            flex: "1 1 500px",
            maxWidth: "600px",
            width: "100%",
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
            bgcolor: 'background.paper',
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            IEEE Conference Attendees Over Time
          </Typography>
          <Divider />
          <Box sx={{ mt: 2, height: 300 }}>
            <LineChartComponent
              label="Attendees"
              dataPoints={data.map((d) => d.attendees)}
              borderColor="rgba(76, 175, 80, 1)"
            />
          </Box>
        </Box>
      </Box>

      <Typography sx={{ mt: 4, textAlign: "center" }} variant="caption">
        Source: IEEE Annual Reports
      </Typography>

      <Box sx={{ mt: 8, width: '100%', overflow: 'hidden' }}>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 'bold',
      mb: 3,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    }}
  >
    <img src={import.meta.env.BASE_URL + 'img/bike-svgrepo-com.svg'} alt="Bike" style={{ width: 28, height: 28 }} />
    Live HSL Bike Map
  </Typography>

  <Box
    sx={{
      display: 'flex',
      flexDirection: isSmall ? 'column' : 'row',
      gap: 4,
      justifyContent: 'center',
      alignItems: 'stretch',
      maxWidth: '100%', // Prevent horizontal overflow
      mx: 'auto',
    }}
  >
    {/* Map Container - Fixed */}
    <Box
      sx={{
        flex: 1.3,
        minWidth: isSmall ? '100%' : 300, // Full width on small screens
        maxWidth: isSmall ? '100%' : 'none', // Prevent overflow on small screens
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      <Box 
        sx={{ 
          height: 400, 
          mt: 0, 
          borderRadius: 3, 
          overflow: 'hidden',
          width: '100%', // Ensure full width usage
          position: 'relative', // For proper leaflet positioning
        }}
      >
        <MapContainer 
          center={[60.171, 24.951]} 
          zoom={15} 
          style={{ 
            height: '100%', 
            width: '100%',
            borderRadius: '12px' // Match parent border radius
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {stations.map((station) => (
            <Marker key={station.stationId} position={[station.lat, station.lon]}>
              <Popup>
                <strong>{station.name}</strong>
                <br />
                {station.allowPickup ? 'Pickup allowed' : 'Pickup not allowed'}
                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                  {station.availableVehicles.byType.map((vehicle: Vehicle, idx: number) => (
                    <li key={idx}>
                      {vehicle.count} {vehicle.vehicleType.formFactor.toLowerCase()}(s)
                    </li>
                  ))}
                </ul>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>

    {/* Image Container - Fixed */}
    <Box
      sx={{
        flex: 1,
        minWidth: isSmall ? '100%' : 300, // Full width on small screens
        maxWidth: isSmall ? '100%' : 'none', // Prevent overflow on small screens
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
        p: 2,
      }}
    >
      <Box
        component="img"
        src={import.meta.env.BASE_URL + "img/Bikes.jpg"}
        alt="Bikes"
        sx={{
          width: '100%',
          height: 400,
          objectFit: 'cover',
          borderRadius: 2,
          maxWidth: '100%', // Prevent image overflow
        }}
      />
      <Typography variant="subtitle1" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
        HSL offers bikes for sustainable travel
      </Typography>
    </Box>
  </Box>
</Box>


      <TimelineFacts />

      <Typography sx={{ mt: 4, textAlign: "center" }} variant="caption">
        Source: IEEE Annual Reports
      </Typography>
    </Box>
  );
};

export default DataDashboard;
