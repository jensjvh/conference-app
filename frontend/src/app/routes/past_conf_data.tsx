import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = [
  { year: 2023, conferences: 2121, attendees: 562030, countries: 0 },
  { year: 2022, conferences: 2008, attendees: 534000, countries: 106 },
  { year: 2021, conferences: 1899, attendees: 572000, countries: 102 },
  { year: 2020, conferences: 1611, attendees: 465000, countries: 96 },
  { year: 2019, conferences: 1969, attendees: 547000, countries: 103 },
  { year: 2018, conferences: 1966, attendees: 561000, countries: 103 },
];

const ChartComponent = ({
  label,
  dataPoints,
  backgroundColor,
  title,
}: {
  label: string;
  dataPoints: number[];
  backgroundColor: string;
  title: string;
}) => {
  const chartData = {
    labels: data.map((d) => d.year.toString()),
    datasets: [
      {
        label,
        data: dataPoints,
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, font: { size: 18 } },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
            return value.toString();
          },
        },
      },
      x: {
        ticks: { font: { size: 14 } },
      },
    },
  };

  return (
    <Box sx={{ height: 300 }}> 
      <Bar data={chartData} options={options} />
    </Box>
  );
};

const TimelineFacts = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const factsMap: Record<number, string[]> = {
    2023: [
      '2,121 Conferences',
      '562,030 Conference Attendees',
      'CRA Sets Attendance Record with 6,000 participants',
    ],
    2022: [
      '2,008 Conferences in 106 countries',
      '534,000 Attendees - returned to pre-pandemic levels',
      'Increase in number of conferences',
    ],
    2021: [
      '1,899 Conferences in 102 countries',
      '572,000 Attendees (virtual & in-person)',
      'Hybrid conferences increased',
    ],
    2020: [
      '1,611 Conferences in 96 countries',
      '465,000+ Attendees (virtual & in-person)',
      'Pivot to virtual conferences due to COVID-19',
    ],
    2019: [
      '1,969 Conferences in 103 countries',
      '547,000 Attendees',
    ],
    2018: [
      '1,966 Conferences in 103 countries',
      '561,000+ Attendees',
    ],
  };

  return (
    <Box
      sx={{
        mt: 8,
        px: isSmall ? 2 : 6,
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {data.map(({ year }) => (
        <Box
          key={year}
          sx={{
            position: 'relative',
            pl: 4,
            borderLeft: '3px solid',
            borderColor: 'primary.main',
          }}
        >
          {/* Year circle */}
          <Box
            sx={{
              position: 'absolute',
              left: '-28px',
              top: 0,
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              cursor: 'pointer',
            }}
            title={`Year ${year}`}
          >
            {year}
          </Box>

          {/* Rectangle */}
          <Box
            sx={{
              mt: 1,
              ml: 4,
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)', 
              cursor: 'default',
              fontSize: 14,
              maxHeight: 220,
              overflowY: 'auto',
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

const PastConferenceData = () => {
  return (
    <Box>

        <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 3 }}>
             Past IEEE Conference Data
        </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
          mb: 6,
        }}
      >
        <Box sx={{ flex: '1 1 300px', maxWidth: 360 }}>
          <ChartComponent
            label="Conferences"
            dataPoints={data.map((d) => d.conferences)}
            backgroundColor="rgba(25, 118, 210, 0.7)"
            title="Number of Conferences"
          />
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: 360 }}>
          <ChartComponent
            label="Attendees"
            dataPoints={data.map((d) => d.attendees)}
            backgroundColor="rgba(76, 175, 80, 0.7)"
            title="Number of Attendees"
          />
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: 360 }}>
          <ChartComponent
            label="Countries"
            dataPoints={data.map((d) => d.countries)}
            backgroundColor="rgba(255, 193, 7, 0.7)"
            title="Number of Countries"
          />
        </Box>
      </Box>

      <TimelineFacts />
      <br />
      source: IEEE Annual Reports
    </Box>
  );
};

export default PastConferenceData;
