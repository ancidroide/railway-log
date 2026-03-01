import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { Button, Box, Stack, Typography } from "@mui/material"
import TrainForm from "../components/TrainForm"


const Home = () => {
  const [date, setDate] = useState(null)

  const checkService = () => {
    const dateStr = date.format('YYYY-MM-DD')
    const services = JSON.parse(localStorage.getItem('services') || '{}')
    return services[dateStr]
  }


  if (date) {
    const existingService = checkService()

    if (existingService) {
      return (
        <TrainForm 
          selectedDate={date}
          existingTrains={existingService?.trains}
        />
      )
    } else {
      return (
        <Box p={2}>
          <Typography>Nessun servizio per questa data</Typography>
          <Button variant="contained">Crea Servizio</Button>
        </Box>
      )
    }
  }
    return (
      <Box p={2}>
        <Stack spacing={2}>
          <DatePicker 
            label="Data servizio"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </Stack>
      </Box>
    )
  }



export default Home