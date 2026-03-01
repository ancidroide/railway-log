import { Box, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'

const NoteCard = ({ note, onDelete }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{note.testo}</Typography>
            <IconButton onClick={() => onDelete?.(note.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}

export default NoteCard