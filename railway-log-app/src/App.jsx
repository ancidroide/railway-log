import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Calendar from './pages/Calendar'
import NewService from './pages/NewService'
import History from './pages/History'
import Settings from './pages/Settings'
import BottomNav from './components/BottomNav'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <div className="mainContainer"> 
          <div className="contentContainer"> 
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/new" element={<NewService />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <BottomNav /> {/* Fissa in basso */}
        </div>
    </BrowserRouter>
  </LocalizationProvider>
  )
}

export default App
