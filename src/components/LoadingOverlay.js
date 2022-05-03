import React from 'react'
import './LoadingOverlay.css'

const LoadingOverlay = ({pageRendering}) => {
    return (
        <div className={`overlay ${!pageRendering ? 'active' : ''}`}>
            <div className="overlay-content">Loading...</div>
        </div>
    )
}

export default LoadingOverlay
