
import {
    Box,
    Card,
    CardContent,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
                    width: '100%',
                    height: 200,
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 2,
                }}
            >
                <img
                    src={content.image}
                    alt={content.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                    }}
                />
            </Box>
            <Typography gutterBottom className="text-black text-md">
                {content.title}
            </Typography>
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
            link: "https://services.conferences.computer.org/2025/cloud/",
            description: "Helsinki Public Transport",
            image: "/img/ieee.png",
        },
        {
            title: "IEEE EDGE",
            link: "https://services.conferences.computer.org/2025/edge/",
            description: "Current events",
            image: "/img/ieee.png",
        },
        {
            title: "IEEE ICDH",
            link: "https://services.conferences.computer.org/2025/icdh/",
            description: "History of Helsinki",
            image: "/img/ieee.png",
        },
        {
            title: "IEEE ICWS",
            link: "https://services.conferences.computer.org/2025/icws/",
            description: "Parks in Helsinki",
            image: "/img/ieee.png",
        },
        {
            title: "IEEE QSW",
            link: "https://services.conferences.computer.org/2025/qsw/",
            description: "Parks in Helsinki",
            image: "/img/ieee.png",
        },
        {
            title: "IEEE SSE",
            link: "https://services.conferences.computer.org/2025/sse/",
            description: "Parks in Helsinki",
            image: "/img/ieee.png",
        },
    ];

    return (
        <Box sx={{ px: isMobile ? 2 : 4, py: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', pb: 3 }}>
                Program
            </Typography>
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
