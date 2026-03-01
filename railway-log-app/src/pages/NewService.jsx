import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { TextField, Button, Box, Stack, Card, CardContent, Typography } from "@mui/material"


const NewService = () => {
  const [trainForm, setTrainForm] = useState({ date: null, numero: '', partenza: '', arrivo: '', materiale: ''})
  const [trains, setTrains] = useState(() => {
    const saved = localStorage.getItem('trains')
    return saved ? JSON.parse(saved) : []
  })
  

  const handleAddTrain = (event) => {
    event.preventDefault()
    if (trainForm.date && trainForm.numero && trainForm.partenza && trainForm.arrivo && trainForm.materiale) {
      const newTrain = {...trainForm, id: Date.now()}
      const newTrains = [...trains, newTrain]

      setTrains(newTrains)
      localStorage.setItem('trains', JSON.stringify(newTrains))
      setTrainForm({ date: null, numero: '', partenza: '', arrivo: '', materiale: ''})
    }
  }
  return (
    <Box p={2}>
      <Stack spacing={2}>
        <DatePicker 
          label="Data servizio"
          value={trainForm.date}
          onChange={(newValue) => setTrainForm({...trainForm, date: newValue})}
        />

        <TextField
          label="Numero treno"
          value={trainForm.numero}
          onChange={(e) => setTrainForm({...trainForm, numero: e.target.value})}
        />
        <TextField 
          label="Partenza"
          value={trainForm.partenza}
          onChange={(e) => setTrainForm({...trainForm, partenza: e.target.value})}
        />
        <TextField
          label="Arrivo"
          value={trainForm.arrivo}
          onChange={(e) => setTrainForm({...trainForm, arrivo: e.target.value})}
        />
        <TextField
          label="Materiale rotabile"
          value={trainForm.materiale}
          onChange={(e) => setTrainForm({...trainForm, materiale: e.target.value})}
        />
        <Button variant="contained" onClick={handleAddTrain}>Aggiungi Treno</Button>
      </Stack>

      {trains.map(train =>
        <Card key={train.id} sx={{ mb: 1 }}>
          <CardContent>
            <Typography variant="h6">
              {train.numero}
            </Typography>
            <Typography>
              {train.partenza} - {train.arrivo}
            </Typography>
          </CardContent>

        </Card>
      )}

    </Box>
  )
}


export default NewService