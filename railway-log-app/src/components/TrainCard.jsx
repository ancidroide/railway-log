import { Card, CardContent, Typography, IconButton, Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const TrainCard = ({ train, onEdit, onDelete, onAddNote }) => {
    return (
        <Card sx={{ mb: 1 }}>
            <CardContent>
                <Typography variant="h6">
                    {train.numero || "NUMERO"}
                </Typography>
                
                <Typography>
                    {train.partenza || "PARTENZA"} → {train.arrivo || "ARRIVO"}  
                </Typography>
                <Typography variant="caption">
                    {train.materiale || "MATERIALE"}
                </Typography>

                {train.notes?.map(note => (
                    <Typography key={note.id}>{note.testo}</Typography>
                ))}
                <Button size="small" onClick={() => onAddNote?.(train.id)}>+ Nota</Button>
                
               
                <IconButton onClick={() => onEdit?.(train)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete?.(train.id)}>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    )
}

export default TrainCard
