
import {
  Box,
  Card,
  CardContent,
  Link,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ConferenceScheduleTable from '../../components/Schedule';

interface ContentProps {
  title: string;
  link: string;
  description: string;
  image: string;
}

interface CardTextProps {
  content: ContentProps;
}

const CardText = ({ content }: CardTextProps) => (
  <>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          background:"#dee7ea"
        }}
      >
        <Typography gutterBottom className="text-black text-md">
        {content.title}
      </Typography>
      </Box>
      <Typography variant="body2" className="text-gray-700">
        {content.description}
      </Typography>
    </CardContent>
  </>
);

const Program = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contents: ContentProps[] = [
    {
      title: "IEEE CLOUD",
      link: "https://services.conferences.computer.org/2025/cloud-program/",
      description: "Program for IEEE CLOUD",
      image: import.meta.env.BASE_URL + 'img/ieee.png',
    },
    {
      title: "IEEE EDGE",
      link: "https://services.conferences.computer.org/2025/edge-program/",
      description: "Program for IEEE EDGE",
      image: import.meta.env.BASE_URL + 'img/ieee.png',
    },
    {
      title: "IEEE ICDH",
      link: "https://services.conferences.computer.org/2025/icdh-program/",
      description: "Program for IEEE ICDH",
      image: import.meta.env.BASE_URL + 'img/ieee.png',
    },
    {
      title: "IEEE ICWS",
      link: "https://services.conferences.computer.org/2025/icws-program/",
      description: "Program for IEEE ICWS",
      image: import.meta.env.BASE_URL + 'img/ieee.png',
    },
    {
      title: "IEEE QSW",
      link: "https://services.conferences.computer.org/2025/qsw-program/",
      description: "Program for IEEE QSW",
      image: import.meta.env.BASE_URL + 'img/ieee.png',
    },
    {
      title: "IEEE SSE",
      link: "https://services.conferences.computer.org/2025/sse/",
      description: "Program for IEEE SSE",
      image: import.meta.env.BASE_URL + 'img/ieee.png',
    },
  ];

  return (
    <Box sx={{ px: isMobile ? 0.5 : 4, py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', pb: 3 }}>
        SERVICES 2025 Program
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '24px', pb: 4}}>
        Up-to-date program can be found <Link href="https://services.conferences.computer.org/2025/wp-content/uploads/sites/3/2025/07/SERVICES_webprogram7-5.pdf">here</Link>
      </Typography>
      <ConferenceScheduleTable/>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
          alignItems: 'stretch',
          marginTop: '1em',
        }}
      >
        {contents.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener"
            style={{ textDecoration: 'none' }}
          >
            <Card
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: "#EEEEEE",
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardText content={item} />
            </Card>
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default Program;
