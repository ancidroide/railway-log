import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DateCalendar } from '@mui/x-date-pickers'
import { Card, CardContent, Button, Typography, Box } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate()
  const [services, setServices] = useState({})


  if (selectedDate) {
    // Show selectedDate details
    const dateStr = selectedDate.format('YYYY-MM-DD')
    const service = services[dateStr]

    if (service) {
      return (
        <Box p={2}>
          <Card sx={{ bgcolor: '#4caf50', color: 'white', mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                Servizio del {dateStr}
              </Typography>
            </CardContent>
          </Card>
          <Button onClick={() => setSelectedDate(null)}>Indietro</Button>
        </Box>
      )
    } else {
        return (
          <Box p={2}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography>Nessun Servizio salvato in questa data</Typography>
              </CardContent>
            </Card>
            <Button variant="contained" onClick={() => navigate('/new')}>Nuovo</Button>
            <Button onClick={() => setSelectedDate(null)}>Indietro</Button>
          </Box>
        )
      }
  } else {
    // Mostra caledar
    return (
      <DateCalendar 
        value={selectedDate} 
        onChange={(newDate) => setSelectedDate(newDate)}
      />
    )
  }
}


export default Calendar