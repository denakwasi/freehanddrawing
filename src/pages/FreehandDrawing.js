import React, { useContext, useEffect, useLayoutEffect } from "react";
import jsPDF from "jspdf"
import "./Freehanddrawing.css";
import { fabric } from "fabric"
import Header from "../components/Header";
import { FreehandContext } from "../api/FreehandContext";
import Sidebar from "../components/Sidebar";
import LoadingOverlay from "../components/LoadingOverlay";
const PDFJS = window.pdfjsLib;

export default function Freehanddrawing() {
  const {color, isPressed, brushSize, drawingMode, setIsPressed} = useContext(FreehandContext)
  const [pdf, setPdf] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [pressed, setPressed] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState(false)
  const [isRedoing, setIsRedoing] = React.useState(false)
  const [h, setH] = React.useState([])
  const [imageUrls, setImageUrls] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const [base64, setBase64] = React.useState([])
  const [totalPages, setTotalPages] = React.useState(1);
  const [fabCanvas, setFabCanvas] = React.useState([]);
  const [fileTotal, setFileTotal] = React.useState(0)
  const [pageInputChange, setPageInputChange] = React.useState(1)
  const [pdfRendering, setPdfRendering] = React.useState("");
  const [pageRendering, setPageRendering] = React.useState("");
  const [itemLenght, setItemLenght] = React.useState({'canvasLenght': null, 'imageUrlsLenght': null})
  const [uploadedFiles, setUploadedFiles] = React.useState([])
  
  const readFileData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };

  // readFileData("./pdf.pdf")

  async function showPdf(event) {
    try {
      const filesList = []
      const files = event.target.files;
      // Loop through files
      for (let i = 0; i < files.length; i++) {
          let file = files.item(i);
          filesList.push(file)
      }
      const arr1 = uploadedFiles
      const arr2 = filesList
      const combinedFiles = arr1.concat(arr2)
      setUploadedFiles(combinedFiles)
      document.getElementById("file-to-upload").value = "";
    } catch (error) {
      alert(error.message);
    }
  }


  const viewPDF = async (file) => {
    try {
      setPdfRendering(true);
      const uri = URL.createObjectURL(file);
      var _PDF_DOC = await PDFJS.getDocument({ url: uri });
      setPdf(_PDF_DOC);
      setPdfRendering(false);
    }catch (err) {
      alert(err.message);
    }
  }

  async function renderPage() {
    setPageRendering(true);
    console.log(pdf)
    const imagesList = [];
    const canvas = document.createElement("canvas");
    for (let i = 1; i <= pdf.numPages; i++) {
      let page = await pdf.getPage(i);
      let viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      let render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport
      };
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      // fabricJs(img)
      imagesList.push(img);
    }
    canvas.remove()
    setImageUrls(imagesList); // images from loaded PDF
    // Save uploaded files to Local Storage
    const maths4 = {
      "Dennis_Akowuah": {
        "file1": imagesList
      }
    }
    // localStorage.setItem("uploaded_files", JSON.stringify(maths4))
    setTotalPages(pdf.numPages)
    setPageRendering(false);
  }

  // fabric
  function fabricJs(imgUrls) {
    const canvs = document.querySelectorAll(".pdfcanvas")
    if (canvs.length === imgUrls?.length) {
      const b64List = []
      const fCList = []
      canvs.forEach((canv, idx) => {
        let canvas = new fabric.Canvas(canv)
        const imgUrl = imgUrls[idx]
        canvas.isDrawingMode = drawingMode;
        canvas.freeDrawingBrush.width = brushSize;
        canvas.freeDrawingBrush.color = color;
        const image = new Image()
        let imageComp;
        // const imgUrl = './bece.jpeg'  
        image.onload = function () {
            imageComp = fabric.Image.fromURL(imgUrl, function (img) {
                let oImg = img.set({ angle: 0, cornersize: 5, hoverCursor: "default", lockMovementX: true, lockMovementY: true, lockRotation: true, hasRotatingPoint: true, hasControls: false, hasBorders: false, lockScalingFlip: true, lockScalingX: true, lockScalingY: true,lockSkewingX: true,lockSkewingY: true,
                  height: image.height,
                  width: image.width 
                });
                canvas.add(oImg);
                canvas.moveTo(oImg, window.objectIndex);
                canvas.renderAll()
            }, { crossOrigin: 'Anonymous' });
    
            canvas.setWidth(image.width);
            canvas.setHeight(image.height);
        };
        image.src = imgUrl;

        fCList.push(canvas)
      })
      setFabCanvas(fCList)
      setBase64(b64List)
    }
  }

  useLayoutEffect(()=>{
    fabCanvas.forEach(can =>{
      can.preserveObjectStacking = true
      const penSvg = `<svg className="drawing-cursor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg>`
      const pen = `data:image/svg+xml;base64,${ window.btoa(penSvg) }`
      if (can.isDrawingMode) {
        can.setCursor(`url(${pen}) 4 64, auto`)
      }
      can.on('mouse:move', e => {
          if (can.isDrawingMode) {
            can.setCursor(`url(${pen}) 4 64, auto`)
          }
      })
    })

    // ---------
  
    fabCanvas.forEach(can => {
      can.on("selection:created", function(obj) {
        if (obj.selected[0].stroke !== null) {
          setSelected(true)
        }else{
          setSelected(false)
        }
      })
    })

    fabCanvas.forEach(can => {
      can.on("selection:updated", function(obj) {
        if (obj.selected[0].stroke !== null) {
          setSelected(true)
        }else{
          setSelected(false)
        }
      })
    })

    // Redo || Undo
    fabCanvas.forEach(can => {
      can.on('object:added', function () {
        if (isRedoing) {
          setIsRedoing(false)
        }
      });
    })

  })

  // Undo drawing
  function undo() {
    const hp = []
    fabCanvas.forEach(can => {
      if (can._objects.length > 0) {
        if (can._objects.length !== 1) {
          const hObj = can._objects.pop()
            hp.push(hObj);
            can.renderAll();
        } 
      }
    })
    const comb = h.concat(hp)
    setH(comb)
  }

  // Redo drawing
  function redo() {
    fabCanvas.forEach(can => {
      if (h.length > 0) {
        setIsRedoing(true)
        can.add(h.pop());
      }
    })
  }

  // delete selected
  function deleteSelectedObjects() {
    fabCanvas.forEach(can => {
      var selection = can.getActiveObjects();
      selection.forEach((obj) => {
        can.remove(obj);
      });
      can.discardActiveObject();
      can.requestRenderAll();
    })
    setSelected(false)
  }



  const loadCanvObj = () => {
    const cW = document.querySelector(".canvas-wrapper") 
    const canv = document.createElement("canvas") 
    canv.setAttribute("class", "pdfcanvas")
    canv.setAttribute("id", "pdfcanvas")
    cW.append(canv)
    const can = new fabric.Canvas(document.querySelector(".pdfcanvas"))
    can.isDrawingMode=false

    can.freeDrawingBrush.width = 2;
    can.freeDrawingBrush.color = 'blue';
    can.loadFromJSON(localStorage.getItem("loadObj"))
  }

  const generatePDF = async () => {
    if (fabCanvas) {
      let doc = await new jsPDF('p', 'mm', 'a4')
      const cJSONList = []
      fabCanvas.forEach((can, i) => {
        let width = doc.internal.pageSize.getWidth();
        let height = doc.internal.pageSize.getHeight();
        can.discardActiveObject().renderAll();
        let base64String = can.toDataURL();
        doc.setPage(i)
        doc.addPage()
        doc.addImage(base64String, 'PNG', 0, 0, width, height)
        console.log(JSON.stringify(can))
        cJSONList.push(JSON.stringify(can))
        localStorage.setItem("loadObj", JSON.stringify(can))
      })
      doc.deletePage(1)
      // setJSONObj(cJSONList)
      doc.save("image.pdf")
    }
  }


  useEffect(() => {
    if (imageUrls.length === 0) return
    // remove existing canvas
    if (document.querySelectorAll(".canvas-container")) {
      document.querySelectorAll(".canvas-container").forEach(can => {
        can.parentNode.removeChild(can)
      })
    }

    // create fabric canvs
    const cW = document.querySelector(".canvas-wrapper") 
    setLoading(true)
    if (totalPages === imageUrls.length) {
      imageUrls?.forEach((c, idx) => {
       const canv = document.createElement("canvas") 
       canv.setAttribute("class", "pdfcanvas")
       canv.setAttribute("id", "pdfcanvas" + idx)
       cW.append(canv)
     })
     setLoading(false)  
     // fabric canvas Func
     fabricJs(imageUrls)

     // Adding id to canvas-container
     if (document.querySelectorAll(".canvas-container")) {
       document.querySelectorAll(".canvas-container").forEach((can, i) => {
         can.setAttribute("id", `canvas_container${i+1}`)
       })
     }
    }

  }, [pdf, imageUrls, fabricJs, totalPages])

  const handlePageInputChange = e => {
    e.preventDefault()
    setPageInputChange(e.target.value)
  }

  // Go to a single page
  const _scrollToPage = (canvasId, yOffset) => {
    const canvas = document.querySelector(canvasId)
    const y = canvas.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({top: y, behavior: 'smooth'})
  }
  
  const handleSinglePage = (e) => {
    e.preventDefault()
    if (pageRendering) return
    if (pageInputChange === null) return
    if ((pageInputChange < 1)) return
    if (pageInputChange > totalPages) return
    console.log(pageInputChange)
    _scrollToPage(`#canvas_container${pageInputChange}`, -60) // 60 represents margin-top of the container
  }

  useEffect(() => {
    fabCanvas.forEach((can, i) => {
      can.isDrawingMode = drawingMode
      can.freeDrawingBrush.width = brushSize;
      can.freeDrawingBrush.color = color;
    })
  }, [color, brushSize, drawingMode, fabCanvas])

  
//  console.log(base64)

  useEffect(() => {
    pdf && renderPage();
    // eslint-disable-next-line
  }, [pdf]);


  return (
    <div className="App">
      <LoadingOverlay pageRendering={pageRendering} />
      <Sidebar uploadedFiles={uploadedFiles} pdfRendering={pdfRendering} viewPDF={viewPDF} />
      <Header showPdf={showPdf} redo={redo} undo={undo} handleDeleteSelected={deleteSelectedObjects} selected={selected} pageInputChange={pageInputChange} handlePageInputChange={handlePageInputChange} handleSinglePage={handleSinglePage} uploadedFiles={uploadedFiles} generatePDF={generatePDF} fileTotal={fileTotal} totalPages={totalPages} base64={base64} />
      <div id="pdf-main-container">
        <div id="pdf-contents">
          <div id="image-convas-row">
            <div className="canvas-wrapper">
              {/* canvas go here! */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
