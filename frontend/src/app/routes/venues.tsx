import { Box, Typography } from "@mui/material";

const locations = [
  {
    name: "University of Helsinki, Main Building, Fabianinkatu 33",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.6787311175224!2d24.947933177931343!3d60.169497243487534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bce5e8c3d29%3A0xe5227821fc988c1e!2sUniversity%20of%20Helsinki%2C%20Main%20Building!5e0!3m2!1sen!2sfi!4v1750147676368!5m2!1sen!2sfi",
    image: "/img/University.jpg",
  },
  {
    name: "Helsinki City Hall, Banquet Hall, Pohjoisesplanadi 11–13",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.765652735059!2d24.950334977931306!3d60.16805834360357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bcf052f978b%3A0xda23a21022a81997!2sHelsinki%20City%20Hall!5e0!3m2!1sen!2sfi!4v1750148186485!5m2!1sen!2sfi",
    image: "/img/CityHall.jpg",
  },
  {
    name: "The Banquet Hall, Ravintola Töölö, Runeberginkatu 14–16",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7938.188768427484!2d24.904080987158203!3d60.17167470000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bc6b0a494eb%3A0xe61913c762dca278!2zUmF2aW50b2xhIFTDtsO2bMO2!5e0!3m2!1sen!2sfi!4v1750148283683!5m2!1sen!2sfi",
    image: "/img/Restaurant.jpg",
  }
];

function VenuesWithMaps() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', pb: 4 }}>
        Venue Locations
      </Typography>

      {locations.map((loc, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {loc.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            <Box
              component="img"
              src={loc.image}
              alt={loc.name}
              sx={{
                width: { xs: "100%", md: "50%" },
                borderRadius: 2,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                objectFit: "cover",
                maxHeight: 350,
              }}
            />
            <Box
              component="iframe"
              src={loc.mapUrl}
              sx={{
                width: { xs: "100%", md: "50%" },
                height: { xs: 300, md: 350 },
                border: 0,
                borderRadius: 2,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default VenuesWithMaps;
