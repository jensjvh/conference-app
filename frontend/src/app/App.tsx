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
              onClick={() => navigate("/breaks")}
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
              Lunch & Coffee
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
              Venues
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
              People flow
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
              Map
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: theme.palette.secondary.main }} />
            <Button
              onClick={() => navigate("/breaks")}
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
              Lunch & Coffee
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
              Venues
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
              Visiting Helsinki
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
              People flow
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
          Tuesday 8.7-Friday 11.7: Complimentary access to{" "}
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
          The 2025 IEEE World Congress on SERVICES (SERVICES 2025) is solely
          sponsored by the IEEE Computer Society under the auspice of the
          Technical Community on Services Computing (TCSVC). With six theme
          conferences, the scope of SERVICES 2025 covers all aspects of services
          computing and applications, current or emerging.
        </Typography>
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
          Centered around services computing, SERVICES 2025 covers various
          systems and networking research pertaining to cloud, edge and
          Internet-of Things (IoT), as well as technologies for intelligent
          computing, learning, Big Data and blockchain applications, addressing
          critical issues such as knowledge network, high performance, security,
          privacy, dependability, trustworthiness, and cost-effectiveness.
        </Typography>
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
          In addition to co-located theme-topic conferences, the Congress will
          also include symposia and workshops supporting deep-dive discussions
          on emerging important topics, and complement the SERVICES 2025 program
          with industry and application presentations and panels.
        </Typography>
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
          Authors are invited to prepare early and submit original papers to any
          of these conferences at www.easychair.org. All submitted manuscripts
          will be peer-reviewed by at least three reviewers. Accepted and
          presented papers will appear in the conference proceedings published
          by the IEEE Computer Society Press.
        </Typography>
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
          SERVICES 2025 is the only premier professional event for the services
          computing field offered by IEEE.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
