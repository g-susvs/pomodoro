import { createContext, useEffect, useState } from 'react'
import { usePomodoro } from '../hooks/usePomodoro'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [showSettings, setShowSettings] = useState(false)
    const [colors, setColors] = useState({})
    const pomodoro = usePomodoro()
    const { setWorkMinutes, setBreakMinutes } = pomodoro

    useEffect(() => {

        let settings = JSON.parse(localStorage.getItem('settings'))

        if (!settings) {
            settings = {
                work: 25,
                break: 5,
                workColor: '#f72585',
                breakColor: '#35e95f'
            }
        }

        setWorkMinutes(settings.work)
        setBreakMinutes(settings.break)
        setColors({
            workColor: settings.workColor,
            breakColor: settings.breakColor
        })
    }, [])



    return (
        <AppContext.Provider value={{
            pomodoro,
            colors,
            setColors,
            showSettings,
            setShowSettings,

        }}>
            {children}
        </AppContext.Provider>
    )
}
