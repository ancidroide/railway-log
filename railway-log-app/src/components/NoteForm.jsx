import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const NoteForm = ({ onSave, onCancel }) => {
    const [text, setText] = useState('')

    return (
        <Box sx={{ p: 2 }}>
            <TextField
                label="Nota"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => onSave(text)}>Salva</Button>  
            <Button onClick={onCancel}>Annulla</Button>
        </Box>
    )
}

export default NoteForm