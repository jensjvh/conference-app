import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './app/App.tsx';
import ConferenceMap from './app/routes/map.tsx';
import UsefulLinks from './app/routes/links.tsx';
import Program from './app/routes/program.tsx';
import PeopleFlow from './app/routes/peopleflow.tsx';
import Venues from './app/routes/venues.tsx';
import History from './app/routes/history.tsx';
import Layout from './components/Layout.tsx';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: "#00629B",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/conference">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="/map" element={<ConferenceMap floor={1} />} />
              <Route path="/links" element={<UsefulLinks />} />
              <Route path="/program" element={<Program />} />
              <Route path="/peopleflow" element={<PeopleFlow />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
