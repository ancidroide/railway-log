import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import Home from '@mui/icons-material/Home'
import History from '@mui/icons-material/History'
import Settings from '@mui/icons-material/Settings'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const paths = ['/', '/history', '/settings']
  const currentIndex = paths.indexOf(location.pathname)

  const handleChange = (event, newValue) => {
    navigate(paths[newValue])
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={currentIndex !== -1 ? currentIndex : 0}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Storico" icon={<History />} />
        <BottomNavigationAction label="Impostazioni" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav
