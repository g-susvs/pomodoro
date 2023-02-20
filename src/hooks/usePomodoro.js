import { useEffect, useRef, useState } from 'react'
import Song from '../../public/song.wav'

export const usePomodoro = () => {

    const [workMinutes, setWorkMinutes] = useState(25)
    const [breakMinutes, setBreakMinutes] = useState(5)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState('work') // work/break
    const [secondsLeft, setSecondsLeft] = useState(0)

    // ref variables
    const secondsLeftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)

    const song = new Audio(Song)
    song.loop = true


    function switchMode() {
        const nextMode = (modeRef.current === 'work')
            ? 'break'
            : 'work'

        const nextSeconds = (nextMode === 'work')
            ? workMinutes * 60
            : breakMinutes * 60

        setMode(nextMode)
        modeRef.current = nextMode
        setSecondsLeft(nextSeconds)
        secondsLeftRef.current = nextSeconds
    }

    function tick() {
        secondsLeftRef.current = secondsLeftRef.current - 1
        setSecondsLeft(secondsLeftRef.current)
    }

    const initTimer = () => {
        secondsLeftRef.current = workMinutes * 60
        setSecondsLeft(secondsLeftRef.current)
    }

    useEffect(() => {
        initTimer()

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return
            }
            if (secondsLeftRef.current === 0) {
                song.play()
                setTimeout(() => {
                    song.pause()
                    song.currentTime = 0

                    return switchMode()


                }, 5000);
            }
            tick()

        }, 1000);

        return () => clearInterval(interval)

    }, [isPausedRef, workMinutes, breakMinutes])

    const totalSeconds = (mode === 'work')
        ? workMinutes * 60
        : breakMinutes * 60

    return {
        secondsLeft,
        mode,
        isPausedRef,
        modeRef,
        isPaused,
        totalSeconds,
        workMinutes,
        breakMinutes,
        setMode,
        setIsPaused,
        setWorkMinutes,
        setBreakMinutes
    }
}
