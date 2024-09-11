import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function DashboardHeader() {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#333', marginBottom: 4 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit'  }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
        </Toolbar>
        </Link>
      </AppBar>
    </Box>
  );
}

export default DashboardHeader;