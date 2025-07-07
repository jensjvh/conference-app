import { useNavigate } from "react-router";
import { Button, Box, Typography, Link, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const ConferenceNav = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 0 },
          marginTop: 2,
          marginBottom: 5,
        }}
      >
        {isMobile ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 0.5,
            width: '100%',
            px: 1,
          }}>
            <Button
              onClick={() => navigate("/program")}
              color="primary"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 'medium',
                padding: '4px 8px',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Program
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/map")}
              color="primary"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 'medium',
                padding: '4px 8px',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Map
            </Button>

            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/venues")}
              color="primary"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 'medium',
                padding: '4px 8px',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Venue Locations
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/links")}
              color="primary"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 'medium',
                padding: '4px 8px',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Helsinki
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/peopleflow")}
              color="primary"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 'medium',
                padding: '4px 8px',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              People Flow
            </Button>
          </Box>
        ) : (
          <>
            <Button
              onClick={() => navigate("/program")}
              color="primary"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Program
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/map")}
              color="primary"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Conference Map
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/venues")}
              color="primary"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Venue Locations
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/awards-gallery")}
              color="primary"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
             Awards & Gallery
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/links")}
              color="primary"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Pre-Reception Helsinki Walking Tour
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/peopleflow")}
              color="primary"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              People Flow
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/history")}
              color="primary"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              IEEE History
            </Button>
              
          </>
        )}
      </Box>
    );
  };

  return (
    <Box className="pb-8 min-h-screen" sx={{ bgcolor: "#f9fafb" }}>
      <img
        src={import.meta.env.BASE_URL + 'img/people.jpg'}
        alt="Technology conference"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Typography variant="h3" sx={{ fontWeight: "bold", pt: 4 }}>
        2025 IEEE World Congress on SERVICES
      </Typography>

      {/* Replace the old buttons with the new navigation */}
      <ConferenceNav />
      <Box
        className="p-8 mb-4 bg-white"
        sx={{ border: 5, borderColor: "lightblue" }}
      >
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          <Link href="https://conferences.computer.org/cloudpub25">
            Conference Proceedings
          </Link>
 
        </Typography>
           <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.2rem",
          }}
        >
          Username: cloudpub25 < br/>
          Password: conf25//
          </Typography>
      </Box>
       <Box
        className="p-8 bg-white"
        sx={{ border: 5, borderColor: "lightblue" }}
      >
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Tuesday 8.7-Saturday 12.7: Complimentary access to{" "}
          <Link href="https://www.helsinki.fi/en/helsinki-university-museum-flame/helsinki-university-museum-flame-exhibition-centre">
            Helsinki University Museum Flame exhibition centre
          </Link>
        </Typography>
      </Box>
      <Box className="p-8 bg-white">
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.125rem",
            mb: 2,
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          Welcome to the SERVICES 2025 Congress mobile app! Use this app to navigate the conference schedule, find venues, discover Helsinki, and learn about people flow related to IEEE conferences.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
