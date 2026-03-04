import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CalendarView from './pages/CalendarView'
import DayView from './pages/DayView'
import HistoryView from './pages/HistoryView'
import SettingsView from './pages/SettingsView'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TrainProvider } from './context/TrainContext'
import BottomNav from './components/layout/BottomNav'


const App = () => {

  return (
    <TrainProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <div className="mainContainer"> 
            <div className="contentContainer"> 
              <Routes>
                <Route path="/" element={<CalendarView />} />
                <Route path="/day/:date" element={<DayView />} />
                <Route path="/history" element={<HistoryView />} />
                <Route path='/settings' element={<SettingsView />} />
              </Routes>
            </div>
            <BottomNav />
          </div>
      </BrowserRouter>
    </LocalizationProvider>
  </TrainProvider>
  )
}

export default App
