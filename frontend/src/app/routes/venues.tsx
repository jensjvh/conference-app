import { Box, Typography, Link } from "@mui/material";

const locations = [
  {
    name: "University of Helsinki, Main Building, Fabianinkatu 33",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.6787311175224!2d24.947933177931343!3d60.169497243487534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bce5e8c3d29%3A0xe5227821fc988c1e!2sUniversity%20of%20Helsinki%2C%20Main%20Building!5e0!3m2!1sen!2sfi!4v1750147676368!5m2!1sen!2sfi",
    image: import.meta.env.BASE_URL + "img/University.jpg",
    eventInfo: (
      <>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#4a4a4a", fontWeight: 600, fontSize: "1.15rem" }}
        >
          2025 IEEE World Congress on Services
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Date: Monday to Saturday, July 7–12, 2025
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Address: University of Helsinki, Fabianinkatu 33
        </Typography>
      </>
    ),
  },
  {
    name: "Helsinki City Hall, Banquet Hall, Pohjoisesplanadi 11–13",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.765652735059!2d24.950334977931306!3d60.16805834360357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bcf052f978b%3A0xda23a21022a81997!2sHelsinki%20City%20Hall!5e0!3m2!1sen!2sfi!4v1750148186485!5m2!1sen!2sfi",
    image: import.meta.env.BASE_URL + "img/CityHall.jpg",
    eventInfo: (
      <>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#4a4a4a", fontWeight: 600, fontSize: "1.15rem" }}
        >
          Reception
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Date: July 8, 2025
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Time: 18:00–19:30
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Address: Helsinki City Hall, Banquet Hall, Pohjoisesplanadi 11–13
        </Typography>
      </>
    ),
  },
  {
    name: "The Banquet Hall, Ravintola Töölö, Runeberginkatu 14–16",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7938.188768427484!2d24.904080987158203!3d60.17167470000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bc6b0a494eb%3A0xe61913c762dca278!2zUmF2aW50b2xhIFTDtsO2bMO2!5e0!3m2!1sen!2sfi!4v1750148283683!5m2!1sen!2sfi",
    image: import.meta.env.BASE_URL + "img/Restaurant.jpg",
    credit: (
      <>
        Photo: Herman Alfred Turja (
        <Link
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontSize: "inherit", color: "#7a7a7a" }}
        >
          CC BY 4.0
        </Link>
        )
      </>
    ),
    eventInfo: (
      <>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#4a4a4a", fontWeight: 600, fontSize: "1.15rem" }}
        >
          Banquet
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Date: July 10, 2025
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Time: 17:30–23:30
        </Typography>
        <Typography variant="body1" sx={{ color: "#7a7a7a", fontSize: "1.1rem" }}>
          Address: The Banquet Hall, Ravintola Töölö, Runeberginkatu 14–16
        </Typography>
      </>
    ),
  },
];

function VenuesWithMaps() {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", pb: 4, color: "black" }}
      >
        Venue Locations
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
      >
        The University of Helsinki's Main Building, designed by Carl Ludvig Engel,
        was completed in 1832 as part of Helsinki's neoclassical makeover.
        Nearby, the Helsinki City Hall, initially a hotel by Pehr Granstedt in
        1833, was transformed into a government building in the 1970s by Aarno
        Ruusuvuori, merging historic façades with modern interiors. Meanwhile,
        the Banquet Hall at Ravintola Töölö, a functionalist building designed
        by Ole Gripenberg in 1952, now hosts events and dining.
      </Typography>

      {locations.map((loc, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: "1.3rem", fontWeight: 600, color: "black" }}
          >
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
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Box
                component="img"
                src={loc.image}
                alt={loc.name}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  objectFit: "cover",
                  maxHeight: 350,
                }}
              />
              {loc.credit && (
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ mt: 1, color: "#7a7a7a", fontSize: "1.1rem" }}
                >
                  {loc.credit}
                </Typography>
              )}
            </Box>
            <Box
              component="iframe"
              src={loc.mapUrl}
              sx={{
                width: { xs: "100%", md: "50%" },
                height: { xs: 300, md: 350 },
                border: 0,
                borderRadius: 2,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
          {loc.eventInfo && <Box sx={{ mt: 2 }}>{loc.eventInfo}</Box>}
        </Box>
      ))}
    </Box>
  );
}

export default VenuesWithMaps;
