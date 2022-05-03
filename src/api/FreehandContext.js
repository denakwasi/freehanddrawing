import {useState, useEffect, createContext} from 'react'

export const FreehandContext = createContext()
const FreehandContextProvider = ({children}) => {
    const [color, setColor] = useState("#FF0000")
    const [brushSize, setCounter] = useState(1)
    const [drawingMode, setDrawingMode] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const [sidebarActive, setSidebarActive] = useState(false)

    const data = {
        color,
        brushSize,
        isPressed,
        drawingMode,
        sidebarActive,
        setSidebarActive,
        setCounter,
        setColor,
        setDrawingMode,
        setIsPressed
    }

    return (
        <FreehandContext.Provider value={data}>
            {children}
        </FreehandContext.Provider>
    )
}

export default FreehandContextProvider
