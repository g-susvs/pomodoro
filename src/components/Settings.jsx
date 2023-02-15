import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"

export const Settings = () => {
    const {
        pomodoro: {
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
            setMode
        },
        setShowSettings
    } = useContext(AppContext)

    const [minutes, setMinutes] = useState({
        work: workMinutes,
        break: breakMinutes
    })
    
    const handleInputChange = (event) => {
        const { value, name } = event.target
        setMinutes({
            ...minutes,
            [name]:value
        })
    }
    const handleSetTime = (event) => {
        event.preventDefault()
        
        setWorkMinutes(minutes.work)
        setBreakMinutes(minutes.break)
        setMode('work')
        setShowSettings(false)
        localStorage.setItem('minutes', JSON.stringify(minutes))
    }

    return (
        <div className="settings">
            <h1>Settings</h1>
            <form onSubmit={handleSetTime}>
                <input
                    type="number"
                    placeholder="Work minutes"
                    name="work"
                    value={minutes.work}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    placeholder="Break minutes"
                    name="break"
                    value={minutes.break}
                    onChange={handleInputChange}
                />
                <button
                    className="save"
                    type="submit"
                >Save</button>
            </form>

        </div>
    )
}
