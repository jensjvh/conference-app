import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#2563eb', 
          color: '#fff',
          borderRadius: '2rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          fontSize: '1.125rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#1d4ed8', 
          },
        },
      },
    },
  },
});

export default theme;
