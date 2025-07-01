import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
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

// Main Component
const History: React.FC = () => {

  return (
    <Box sx={{ p: 4, bgcolor: '#f9fafb', minHeight: '100vh', padding:'1em' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
       IEEE History
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

      <TimelineFacts />

      <Typography sx={{ mt: 4, textAlign: "center" }} variant="caption">
        Source: IEEE Annual Reports
      </Typography>
    </Box>
  );
};

export default History;
