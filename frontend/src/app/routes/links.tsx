
import {
    Box,
    Button,
    Card,
    CardActions,
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

        <CardActions>
            <Button
                size="small"
                className="text-blue-500"
                component="a"
                href={content.link}
                target="_blank"
                rel="noopener"
            >
                Learn More
            </Button>
        </CardActions>
    </>
);

const UsefulLinks = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const contents: ContentProps[] = [
        {
            title: "Public transport",
            link: "https://www.hsl.fi/en",
            description: "Helsinki Public Transport",
            image: import.meta.env.BASE_URL + 'img/tram.jpg',
        },
        {
            title: "Visiting Helsinki",
            link: "https://www.myhelsinki.fi/visit/",
            description: "Current events",
            image: import.meta.env.BASE_URL + 'img/church.jpg',
        },
        {
            title: "History",
            link: "https://historia.hel.fi/en",
            description: "History of Helsinki",
            image: import.meta.env.BASE_URL + 'img/houses.jpg',
        },
        {
            title: "Nature",
            link: "https://www.myhelsinki.fi/live-work/nature-and-urban-fun/",
            description: "Parks in Helsinki",
            image: import.meta.env.BASE_URL + 'img/swan.jpg',
        },
    ];

return (
    <Box sx={{ px: isMobile ? 2 : 4, py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', pb: 3 }}>
            Find out more about Helsinki!
        </Typography>
        
        <Typography
        variant="body1"
        sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
      >
            Helsinki, the capital and largest city of Finland, has around 670,000 residents (over 1.5 million in the metro area). Founded in 1550 and made the capital in 1812 under Russian rule, it played a key role in Finland’s independence. Today, the city is celebrated for its history, modern design, and strong connection to nature—with 40% green space and over 1,000 parks. It hosted the 1952 Olympics and earned titles as European Capital of Culture (2000) and World Design Capital (2012). Finland joined the EU in 1995 and NATO in 2023.
        </Typography>

        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
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

export default UsefulLinks;
