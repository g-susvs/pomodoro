import { createContext, useEffect, useState } from 'react'
import { usePomodoro } from '../hooks/usePomodoro'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [showSettings, setShowSettings] = useState(false)
    const pomodoro = usePomodoro()
    const { setWorkMinutes, setBreakMinutes } = pomodoro

    useEffect(() => {
      
        let minutes = JSON.parse(localStorage.getItem('minutes'))

        if(!minutes){
            minutes = {
                work: 25,
                break: 5
            }
        }

        setWorkMinutes(minutes.work)
        setBreakMinutes(minutes.break)
    }, [])
    


    return (
        <AppContext.Provider value={{
            pomodoro,
            showSettings,
            setShowSettings,
                
        }}>
            {children}
        </AppContext.Provider>
    )
}
