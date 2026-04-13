import { useEffect, useState } from 'react'

const Notification = ({ message }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (message !== null) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [message])

    if (message === null || !visible) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}

export default Notification