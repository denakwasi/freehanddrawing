import React, { useContext, useEffect, useState } from 'react'
import { FreehandContext } from '../api/FreehandContext'
import './sidebar.css'

const Sidebar = ({ uploadedFiles, padfRendering, viewPDF }) => {
    const {sidebarActive, setSidebarActive} = useContext(FreehandContext)
    const handleViewPDF = (file) => {
        viewPDF(file)
        setSidebarActive(!sidebarActive)
    }
    return (
        <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
            <div className="sidebar-wrapper">
                {uploadedFiles && uploadedFiles.map((uploadedFile, idx) => (<div key={idx} className="file-wrapper">
                    <div className="file-name">{uploadedFile.name}</div>
                    <div className="actions-wrapper">
                        <svg onClick={() => handleViewPDF(uploadedFile)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"/></svg>
                        <span></span>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default Sidebar
