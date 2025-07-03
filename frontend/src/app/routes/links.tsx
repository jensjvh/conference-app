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
    <Box sx={{ px: isMobile ? 2 : 4, py: 4, color: 'black' }}>
      {/* Walking tour intro and info */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
       Find out more about Helsinki!
      </Typography>

     <Typography
              variant="body1"
              sx={{ mb: 3, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
            >
    Join us for a walking tour to visit Senate Square and Helsinki Cathedral, and for those who are interested, the Old Market Hall.
    </Typography>

       <Typography
                variant="body1"
                sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
              >
        <strong>When:</strong> Tuesday 8th July 2025 at 16:40 – 18:00<br />
        <strong>Where:</strong> Gather in the lobby
      </Typography>

      {/* Detailed tour descriptions with images */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <img
            src={'img/tour1.jpg'}
            alt="Panorama of Senate Square"
            style={{ width: '100%',  marginBottom: 8 }}
          />
          <Typography variant="caption" sx={{ display: 'block', mb: 4 }}>
            <a href="https://en.wikipedia.org/wiki/File:Senate_Square_-_Senaatintori_-_Senatstorget,_Helsinki,_Finland.jpg" target="_blank"> Panorama of the Senate Square. (CC BY 2.0): Matti Mattila.</a>
          </Typography>
           <Typography
                    variant="body1"
                    sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                  >
            The Senate Square forms a unique example of neoclassical architecture at the heart of Helsinki. In addition to the Main Building of the University of Helsinki, the square features three landmark buildings designed by Carl Ludvig Engel (1778-1840): The Helsinki Cathedral, the Government Palace, and the National Library of Finland. In the middle of the square stands a statue of Alexander II (1894). At the southeast corner of the square stands the Sederholm House (1757) that is the oldest stone building of Helsinki now hosting the Helsinki City Museum. The Market Square is just one block away. 
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>The Sound of Senate Square</Typography>
            <Typography
                     variant="body1"
                     sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                   >
            The Senate Square features a sound installation (digital carillon music) called the Sound of the Senate Square. It is a modernized version of the European glockenspiel, in which the sound travels from one building to the next. The composition will start at 17:49 and it will run for 5 minutes and 18 seconds. The optimal listening location is near the square’s central monument.
          </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>The Main Building</Typography>
           <Typography
                    variant="body1"
                    sx={{ mb: 3, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                  >
            Designed by architect Carl Ludvig Engel and completed in 1832, the Main Building is one of Engel’s signature Empire-style works. It epitomizes early 19th-century neoclassical ideals. As part of Engel's larger master plan for the Senate Square, it forms a visual dialogue with the Cathedral, Government Palace, and the National Library. Between 1934 and 1937 architect J.S. Sirén expanded the building to fill the entire block. During the 1944 bombing raids, original murals in the Great Hall were lost. The most recent comprehensive restoration, completed in 2021, refreshed historic finishes while updating the infrastructure for teaching and events. 

          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <img
            src={'img/tour2.jpg'}
            alt="Main Building"
            style={{ width: '100%',  marginBottom: 60 }}
          />
        <Typography variant="caption" sx={{ display: 'block', mb: 4 }}>
        </Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>National Library of Finland</Typography>
           <Typography
                    variant="body1"
                    sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                  >
           Address: Unioninkatu 36 <br />

            Engel meant this building to be a sanctuary for Finland’s literary heritage at a time when its language and culture were fighting for recognition under Russian rule. The lofty Corinthian portico and carved swags evoke the idea of “knowledge as crown”  — a message underscored in 1863 when the first Finnish-language volumes were formally added to its collections. During World War II, librarians famously smuggled rare manuscripts to rural churches for safekeeping, safeguarding works that today underpin Finnish national identity. 
          </Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>Senate Square and Helsinki Cathedral</Typography>
           <Typography
                    variant="body1"
                    sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                  >
           In 1812 Helsinki was made the capital city of Finland and the Senate Square was designed as the main square for the new capital city. Before its construction, the site was the location of a graveyard. The square was designed as a stage for public ceremony: royal visits in the 19th century would see carriages roll up to the Cathedral steps. The square has been designed to reinforce the idea that church, state and academia form a single civic body.
          </Typography>
            <Typography
                     variant="body1"
                     sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                   >
            The Helsinki Cathedral was Engel’s lengthiest project completed twelve years after his death in 1852. The cathedral is a distinctive landmark of Helsinki and among the most popular tourist destinations in Finland. The cathedral features a tall, green dome surrounded by four smaller domes in the neoclassical style. The cathedral was featured in the opening sequence of the famous “Sandstorm” music video by Darude. 
          </Typography>
            <Typography
                     variant="body1"
                     sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                   >
            A statue of Alexander II sits in the middle of the square, unveiled in 1894 as a symbol of the tsar’s reforms, becoming a symbol of quiet resistance before the Finnish independence in 1917. 
          </Typography>
    
        </Box>

        <Box sx={{ mb: 3 }}>
          <img
            src={'img/tour3.jpg'}
            alt="National Library of Finland"
            style={{ width: '100%',  marginBottom: 8 }}
          />
          <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
            <a href="https://commons.wikimedia.org/w/index.php?curid=27950693" target="_blank"> (CC BY-SA 3.0): Alvesgaspar.</a>
          </Typography>
    
        </Box>

        <Box sx={{ mb: 3 }}>
          <img
            src={'img/tour4.jpg'}
            alt="Government Palace"
            style={{ width: '100%',  marginBottom: 60 }}
          />


          <Typography variant="h4" sx={{ mb: 2, }}>Helsinki City Museum</Typography>
           <Typography
                    variant="body1"
                    sx={{ mb: 3, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                  >
           Address: Aleksanterinkatu 16<br />

          The Sederholm House (1757) is the oldest stone building in Helsinki. Originally, the building hosted Hotel Seurahuone that was the social hub of 19th-century Helsinki with diplomats dining in its grand ballrooms and literary salons debated national identity championing Finnish culture. The building was converted to a museum in 1975 with the curators preserving the old dining rooms and guest chambers turning them into immersive exhibits.  You will see a reconstructed 1880s grocery shop corner and a turn-of-the-century living room where families once gathered to hear news read aloud by candlelight.
          </Typography>
         <img
            src={'img/tour5.jpg'}
            alt="Helsinki City Museum"
            style={{ width: '100%',  marginBottom: 60 }}
          />

        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Helsinki City Hall

          </Typography>
            <Typography
                     variant="body1"
                     sx={{ mb: 3, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                   >
            Address: Pohjoisesplanadi 11–13
            <br />
            Once the city’s police headquarters, this building took on new civic duties after 1918, hosting council meetings that shaped early Finnish democracy. Its lantern cupola was lit nightly to signal that public records could be inspected by any citizen – an early gesture toward transparency. 
          </Typography>
          <img
            src={import.meta.env.BASE_URL + 'img/tour6.jpg'}
            alt="Helsinki City Hall"
            style={{ width: '100%',  marginBottom: 60 }}
          />

         <Typography variant="h4" sx={{ mb: 2 }}>
            Market Hall

          </Typography>
            <Typography
                     variant="body1"
                     sx={{ mb: 3, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
                   >
            Address:  Eteläranta 18

            <br />
            From its earliest days in 1889, the Market Hall has been the beating heart of Helsinki’s food culture. The building style is a brick-and-iron late-19th-century. 
          </Typography>
          <img
            src={'img/tour7.jpg'}
            alt=" Market Hall"
            style={{ width: '100%',  marginBottom: 8 }}
          />
        <Typography variant="caption" sx={{ display: 'block', mb: 8 }}>
            <a href="https://commons.wikimedia.org/w/index.php?curid=24519051" target="_blank"> Helsinki, Finland. (CC BY 2.0): yeowatzup.</a>
        </Typography>
        </Box>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
       Explore Helsinki further
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
