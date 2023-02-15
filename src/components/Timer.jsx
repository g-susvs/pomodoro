import { useContext } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { AppContext } from '../context/AppContext';

export const Timer = () => {

    const {
        colors: {
            workColor: work_c,
            breakColor: break_c
        },
        pomodoro: {
            secondsLeft,
            totalSeconds,
            isPausedRef,
            setIsPaused,
            isPaused,
            mode }
    } = useContext(AppContext)


    const percentage = secondsLeft / totalSeconds * 100
    let minutes = Math.floor(secondsLeft / 60)
    let seconds = secondsLeft % 60
    if (seconds < 10) seconds = '0' + seconds

    const workColor = work_c;
    const breakColor = break_c;
    const backgroundColor = '#262626'
    let timerText = `${minutes}:${seconds}`

    if (secondsLeft < 0) timerText = '0:00'

    return (
        <main>
            <div>
                <CircularProgressbar
                    className='shadow'
                    value={percentage}
                    background
                    backgroundPadding={6}
                    text={timerText}
                    styles={buildStyles({
                        rotation: 1,
                        pathTransitionDuration: 1,
                        backgroundColor,
                        trailColor: backgroundColor,
                        textColor: '#fff',
                        pathColor: (mode === 'work') ? workColor : breakColor,
                    })}
                />
            </div>
            <div className="group-btn">
                {
                    (isPaused)
                        ?
                        <BsFillPlayFill
                            className="btn-timer"
                            title='play'
                            onClick={() => { setIsPaused(false); isPausedRef.current = false }}
                        />
                        :

                        <BsFillPauseFill
                            className="btn-timer"
                            title='paused'
                            onClick={() => { setIsPaused(true); isPausedRef.current = true }}
                        />

                }
            </div>
        </main>
    )
}
