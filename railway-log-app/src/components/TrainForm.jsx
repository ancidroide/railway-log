import { useState } from "react"
import { TextField, Button, Box, Stack, Card, CardContent, Typography } from "@mui/material"

const TrainForm = ({ existingTrains, selectedDate }) => {
    const [trainForm, setTrainForm] = useState({
        numero: '',
        partenza: '', 
        arrivo: '',
        materiale: ''
    })
    const [trains, setTrains] = useState(existingTrains||[])

    const handleAddTrain = (event) => {
        event.preventDefault()
        if ( selectedDate && trainForm.numero && trainForm.partenza && trainForm.arrivo && trainForm.materiale) {
            const newTrain = {...trainForm, date: selectedDate, id: Date.now()}
            const newTrains = [...trains, newTrain]

            const dateStr = selectedDate.format('YYYY-MM-DD')
            const services = JSON.parse(localStorage.getItem('services') || '{}')

            if (!services[dateStr]) {
                services[dateStr] = { date: dateStr, trains: [] }
            } 

            services[dateStr].trains.push(newTrain)
            localStorage.setItem('services', JSON.stringify(services))
            setTrains(newTrains)
            setTrainForm({ numero: '', partenza: '', arrivo: '', materiale: ''})
        }
    }
    return (
        <Box p={2}>
            <Stack>
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

export default TrainForm