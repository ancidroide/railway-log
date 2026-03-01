import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { TextField, Button, Box, Stack, Card, CardContent, Typography } from "@mui/material"
import TrainForm from "../components/TrainForm"


const NewService = () => {
  const [date, setDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleCreateNewService = () => {
    setSelectedDate(date)
  }

  if (selectedDate) {
    return (
      <TrainForm 
        selectedDate={selectedDate}
      />
    )
  } else {
      return (
        <Box p={2}>
          <Stack spacing={2}>
            <DatePicker 
              label="Data servizio"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </Stack>
          <Button onClick={handleCreateNewService}>Crea</Button>
        </Box>
      )
  }

}


export default NewService