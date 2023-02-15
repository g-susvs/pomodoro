import { useContext } from "react"
import { AiTwotoneSetting, IoClose } from 'react-icons/all';
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
            <IoClose className="btn-header" title="settings" onClick={() => setShowSettings(false)} />
            :
            <AiTwotoneSetting className="btn-header" title="back" onClick={() => setShowSettings(true)} />
        }
      </header>
      {
        !(showSettings) ? <Timer /> : <Settings />
      }
    </div>
  )
}

export default App
