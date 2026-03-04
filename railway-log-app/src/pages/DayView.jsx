// DayView - Il cuore: Lista treni del giorno scelto
import { useParams } from 'react-router-dom'

const DayView = () => {
  const { date } = useParams()

  return (
    <div>
      <h1>DayView</h1>
      <p>Date: {date}</p>
    </div>
  )
}

export default DayView
