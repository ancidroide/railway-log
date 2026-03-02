// TrainContext - Il cuore logico dell'app
// Gestione stato globale con Time-Based data structure
import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'railway-log-services' // Chiave per localStorage
const TrainContext = createContext(null)

// Provider: il componente che wrappa l'app e fornisce i dati
export const TrainProvider = ({ children }) => {  
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  // STATE: data selezionata (per navigazione)
  const [selectedDate, setSelectedDate] = useState(null)

  // EFFECT: salva su localStorage ogni volta che services cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services))
  }, [services])

  // HELPER: genera ID univoco per treni e note
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // API GETTERS:
  
  // Restituisce i treni per una data
  const getTrains = (date) => {
    const day = services[date]
    return day ? day.trains : []
  }

  // Restituisce array di date con servizi (per calendario)
  const getDatesWithService = () => {
    return Object.keys(services)
  }

  // Verifica se una data ha servizi
  const hasService = (date) => {
    return !!services[date] && services[date].trains.length > 0
  }

  // API TRAIN OPERATIONS:

  // Aggiunge un treno alla data
  const addTrain = (date, trainData) => {
    const newTrain = {
      id: generateId(),
      numero: trainData.numero || '',
      partenza: trainData.partenza || '',
      arrivo: trainData.arrivo || '',
      materiale: trainData.materiale || '',
      notes: [],
    }
    
    setServices(prev => ({
      ...prev,
      [date]: {
        date,
        trains: [...(prev[date]?.trains || []), newTrain]
      }
    }))
  }

  // Modifica un treno esistente
  const updateTrain = (date, trainId, updates) => {
    setServices(prev => {
      const day = prev[date]
      if (!day) return prev
      
      return {
        ...prev,
        [date]: {
          ...day,
          trains: day.trains.map(t => 
            t.id === trainId ? { ...t, ...updates } : t
          )
        }
      }
    })
  }

  // Elimina un treno
  const deleteTrain = (date, trainId) => {
    setServices(prev => {
      const day = prev[date]
      if (!day) return prev
      
      return {
        ...prev,
        [date]: {
          ...day,
          trains: day.trains.filter(t => t.id !== trainId)
        }
      }
    })
  }

  // API NOTE OPERATIONS:

  // Aggiunge nota a un treno
  const addNote = (date, trainId, noteText) => {
    const newNote = {
      id: generateId(),
      testo: noteText,
    }
    
    setServices(prev => {
      const day = prev[date]
      if (!day) return prev
      
      return {
        ...prev,
        [date]: {
          ...day,
          trains: day.trains.map(t => 
            t.id === trainId 
              ? { ...t, notes: [...t.notes, newNote] }
              : t
          )
        }
      }
    })
  }

  // Elimina nota da un treno
  const deleteNote = (date, trainId, noteId) => {
    setServices(prev => {
      const day = prev[date]
      if (!day) return prev
      
      return {
        ...prev,
        [date]: {
          ...day,
          trains: day.trains.map(t => 
            t.id === trainId 
              ? { ...t, notes: t.notes.filter(n => n.id !== noteId) }
              : t
          )
        }
      }
    })
  }

  // Oggetto valore passato ai componenti
  const value = {
    services,
    selectedDate,
    setSelectedDate,
    getTrains,
    getDatesWithService,
    hasService,
    addTrain,
    updateTrain,
    deleteTrain,
    addNote,
    deleteNote,
  }

  return (
    <TrainContext.Provider value={value}>
      {children}
    </TrainContext.Provider>
  )
}

// Hook personalizzato per usare il context
// eslint-disable-next-line react-refresh/only-export-components
export const useTrain = () => {
  const context = useContext(TrainContext)
  if (!context) {
    throw new Error('useTrain must be used within TrainProvider')
  }
  return context
}

export default TrainContext
