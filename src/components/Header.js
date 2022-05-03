import React, { useContext } from 'react'
import { FreehandContext } from '../api/FreehandContext'
import './header.css'
import PenToolDropdown from './PenToolDropdown'

const Header = ({fileTotal, redo, undo, selected, handleDeleteSelected, handlePageInputChange, handleSinglePage, pageInputChange, uploadedFiles, showPdf, generatePDF, totalPages, base64}) => {
    const [visible, setVisible] = React.useState(false)
    const {color, setDrawingMode, setIsPressed, sidebarActive, setSidebarActive} = useContext(FreehandContext)

    React.useLayoutEffect(() => {
        document.querySelector("body").addEventListener("click", (e) => {
            setVisible(false)
        })
    }, [])

    const handleVisible = (e) => {
        e.stopPropagation()
        setVisible(!visible)
    }

    const handleDrawingMode = () => {
        setDrawingMode(false)
        setIsPressed(true)
    }

    return (
            <div className="header">
                <div className="header-container">
                    <div className="tools-wrapper">
                        <div className="files" data-desc="Files">
                            <span>{uploadedFiles.length}</span>
                            <svg onClick={() => setSidebarActive(!sidebarActive)} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M22 24h-18v-22h12l6 6v16zm-7-21h-10v20h16v-14h-6v-6zm-1-2h-11v21h-1v-22h12v1zm2 7h4.586l-4.586-4.586v4.586z"/></svg>
                        </div>
                        <div className="sel-file" data-desc="Choose Files">
                            <svg id="upload-button"
                                onClick={() => document.getElementById("file-to-upload").click()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
                            <input
                                type="file"
                                id="file-to-upload"
                                accept="application/pdf"
                                multiple={true}
                                hidden
                                onChange={showPdf}
                            />
                        </div>
                        <div id="page-count-container" className="page-count-container" data-desc="Page Info">
                            Page <form onSubmit={handleSinglePage}><input value={pageInputChange} onChange={handlePageInputChange}  type="number" /></form> / {totalPages}
                        </div>
                        <div className="pen-tool-wrapper" data-desc="Pen">
                            <svg onClick={() => setDrawingMode(true)} className="pen-tool" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill: color}} d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"/></svg>
                            {/* <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg> */}
                            <svg className="option" onClick={e => handleVisible(e)} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z"/></svg>
                            <PenToolDropdown visible={visible}/>
                        </div>
                        <div className="drawing-mode" data-desc="Undraw">
                            <svg onClick={handleDrawingMode} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"/></svg>
                        </div> 
                        <div className="del-selected" data-desc="Delete" style={{display: selected?'block':'none'}}>
                            <svg onClick={handleDeleteSelected} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.731 2 1.631 2h5.712z"/></svg>
                        </div> 
                        <div className="redo-undo" data-desc="Undo|Redo">
                            <svg className="undo" onClick={undo} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"/></svg>
                            <svg className="redo" onClick={redo} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M10.573 3.021h7.427v-3.021l6 5.39-6 5.61v-3h-7.427c-3.071 0-5.561 2.356-5.561 5.427 0 3.071 2.489 5.573 5.561 5.573h7.427v5h-7.427c-5.84 0-10.573-4.734-10.573-10.573s4.733-10.406 10.573-10.406z"/></svg>
                        </div>
                        <div className="save-button" data-desc="Save">
                            {base64 && (<button className="saveBtn" onClick={() => generatePDF()}>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => generatePDF()} width="15" height="15" viewBox="0 0 24 24"><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                                Save
                            </button>
                            )}
                        </div>
                    </div>
                    </div>
            </div>
    )
}

export default Header
