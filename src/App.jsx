import { useContext } from "react"
import { Settings } from "./components/Settings"
import { Timer } from "./components/Timer"
import { AppContext } from "./context/AppContext"

const App = () => {

  const { showSettings, setShowSettings } = useContext(AppContext)

  return (
    <div className="container">
      <header>
        {
          (showSettings)
            ?
            <button className="btn-header" onClick={() => setShowSettings(false)}>
              <i className="fas fa-sharp fa-solid fa-arrow-left" ></i>
            </button>

            :
            <button className="btn-header" onClick={() => setShowSettings(true)}>
              <i className="fas fa-solid fa-bars"></i>
            </button>

        }
      </header>
      {
        !(showSettings) ? <Timer /> : <Settings />
      }
    </div>
  )
}

export default App
