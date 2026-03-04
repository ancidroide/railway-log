// TrainContext - Il cuore logico dell'app
// Gestione stato globale con Time-Based data structure
import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'railway-log-services'
const TrainContext = createContext(null)

export const TrainProvider = ({ children }) => {
  
  // STATE: dizionario { "2026-03-01": [{ train }, { train }] }
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  const [selectedDate, setSelectedDate] = useState(null)

  // EFFECT: salva su localStorage ogni volta che services cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services))
  }, [services])

  // HELPER: genera ID univoco
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // API GETTERS:
  
  // Restituisce i treni per una data (array diretto)
  const getTrains = (date) => {
    return services[date] || []
  }

  // Restituisce array di date con servizi
  const getDatesWithService = () => {
    return Object.keys(services)
  }

  // Verifica se una data ha servizi
  const hasService = (date) => {
    return !!(services[date] && services[date].length > 0)
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
      [date]: [...(prev[date] || []), newTrain]
    }))
  }

  // Modifica un treno
  const updateTrain = (date, trainId, updates) => {
    setServices(prev => {
      const trains = prev[date]
      if (!trains) return prev
      
      return {
        ...prev,
        [date]: trains.map(t => 
          t.id === trainId ? { ...t, ...updates } : t
        )
      }
    })
  }

  // Elimina un treno
  const deleteTrain = (date, trainId) => {
    setServices(prev => {
      const trains = prev[date]
      if (!trains) return prev
      
      return {
        ...prev,
        [date]: trains.filter(t => t.id !== trainId)
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
      const trains = prev[date]
      if (!trains) return prev
      
      return {
        ...prev,
        [date]: trains.map(t => 
          t.id === trainId 
            ? { ...t, notes: [...t.notes, newNote] }
            : t
        )
      }
    })
  }

  // Elimina nota da un treno
  const deleteNote = (date, trainId, noteId) => {
    setServices(prev => {
      const trains = prev[date]
      if (!trains) return prev
      
      return {
        ...prev,
        [date]: trains.map(t => 
          t.id === trainId 
            ? { ...t, notes: t.notes.filter(n => n.id !== noteId) }
            : t
        )
      }
    })
  }

  // Valore passato ai componenti
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

// Hook per usare il context
// eslint-disable-next-line react-refresh/only-export-components
export const useTrain = () => {
  const context = useContext(TrainContext)
  if (!context) {
    throw new Error('useTrain must be used within TrainProvider')
  }
  return context
}

export default TrainContext
