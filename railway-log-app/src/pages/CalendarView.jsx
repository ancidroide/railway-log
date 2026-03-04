// CalendarView - Home: Selezione data con calendario
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrain } from '../context/TrainContext'
import dayjs from 'dayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import './CalendarView.css'

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const { getDatesWithService } = useTrain()
  const navigate = useNavigate()

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate)
    const dateString = newDate.toISOString().split('T')[0]
    navigate(`/day/${dateString}`)
  }

  const datesWithService = getDatesWithService()

  return (
    <div className="calendar-container">
      <DateCalendar
        value={currentDate}
        onChange={handleDateChange}
      />
    </div>
  )
}

export default CalendarView
