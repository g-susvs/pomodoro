import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"

export const Settings = () => {
    const {
        colors: {
            workColor,
            breakColor
        },
        pomodoro: {
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
            setMode
        },
        setColors,
        setShowSettings
    } = useContext(AppContext)

    const [settings, setSettings] = useState({
        work: workMinutes,
        break: breakMinutes,
        workColor: workColor,
        breakColor: breakColor
    })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        setSettings({
            ...settings,
            [name]: value
        })
    }
    const handleSetTime = (event) => {
        event.preventDefault()

        setWorkMinutes(settings.work)
        setBreakMinutes(settings.break)
        setColors({
            workColor: settings.workColor,
            breakColor: settings.breakColor
        })
        setMode('work')
        setShowSettings(false)
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    return (
        <div className="settings">
            <h1>Settings</h1>
            <form onSubmit={handleSetTime}>
                <input
                    type="number"
                    placeholder="Work settings"
                    name="work"
                    value={settings.work}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    placeholder="Break settings"
                    name="break"
                    value={settings.break}
                    onChange={handleInputChange}
                />
                <h3>Set color</h3>
                <section className="color-settings">
                    <div>
                        <input
                            className="set-color"
                            type="color"
                            name="workColor"
                            value={settings.workColor}
                            onChange={handleInputChange}
                        />
                        <label>Work</label>

                    </div>
                    <div>
                        <input
                            className="set-color"
                            type="color"
                            name="breakColor"
                            value={settings.breakColor}
                            onChange={handleInputChange}
                        />
                        <label>
                            Break</label>

                    </div>
                </section>
                <button
                    className="save"
                    type="submit"
                >Save</button>
            </form>

        </div>
    )
}
