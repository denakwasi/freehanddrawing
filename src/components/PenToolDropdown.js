import React, { useContext } from 'react'
import { FreehandContext } from '../api/FreehandContext'
import './penToolDropdown.css'

const PenToolDropdown = ({ visible }) => {
    const {brushSize, setColor, setCounter} = useContext(FreehandContext)

    const handleDecrement = e => {
        e.stopPropagation()
        setCounter(brushSize > 1 ? brushSize-1 : 1)
    }

    const handleIncrement = e => {
        e.stopPropagation()
        setCounter(brushSize < 10 ? brushSize+1 : 10)
    }
    return (
        <div className="dropdown-wrapper" style={{height: visible ? '180px' : 0}}>
            <div className="brush-size">
                <div className="title-wrapper">
                    <h5>Brush size</h5>
                </div> 
                <div className="regulator">
                    <button onClick={(e) => handleDecrement(e)} className="dec">-</button>
                    <div className="counter">{brushSize}</div>
                    <button onClick={(e) => handleIncrement(e)} className="inc">+</button>
                </div>
            </div>
            <div className="color">
                <div className="title-wrapper title-wrapper2">
                    <h5>Colors</h5>
                </div>
                <div className="choose-color">
                    <button onClick={() => setColor("#000")}></button>
                    <button onClick={() => setColor("#FF0000")}></button>
                    <button onClick={() => setColor("#0000ff")}></button>
                    <button onClick={() => setColor("#008000")}></button>
                    <button onClick={() => setColor("#8B008B")}></button>
                    <button onClick={() => setColor("#7FFF00")}></button>
                </div>
            </div>
        </div>
    )
}

export default PenToolDropdown
