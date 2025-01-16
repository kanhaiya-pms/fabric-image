"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

interface EditImageProps {
    image: string; // The URL of the image to be edited
}

const EditImage: React.FC<EditImageProps> = ({ image }) => {
    const canvasRef = useRef(null as any);

    const [txt, setTxt] = useState("");


    const addText = () => {
        const text = new fabric.FabricText(txt, {
            left: 100,
            top: 100,
            fontSize: 25,
            fill: 'white',
            fontFamily: 'Arial',
            hasBorders: true,  // Show border for dragging
            hasControls: true  // Allow resizing and rotating
        });

        if (canvasRef.current) {
            canvasRef.current.add(text);
            text.set({ selectable: true });
            canvasRef.current.renderAll();
            setTxt("")
        }


    };

    const addShape = (shapeType: string) => {
        const canvas = canvasRef.current;
    
        if (!canvas) return;
    
        let shape;
    
        switch (shapeType) {
            case "circle":
                shape = new fabric.Circle({
                    left: 250,
                    top: 250,
                    radius: canvas.width / 6,
                    originX: "center",
                    originY: "center",
                    selectable: true,
                    fill: "rgba(0, 0, 255, 1)", 
                });
                break;
    
            case "triangle":
                shape = new fabric.Triangle({
                    left: 250,
                    top: 250,
                    width: canvas.width / 4,
                    height: canvas.width / 4,
                    originX: "center",
                    originY: "center",
                    selectable: true,
                    fill: "rgba(255, 0, 0, 1)", 
                });
                break;
    
            case "square":
                shape = new fabric.Rect({
                    left: 250,
                    top: 250,
                    width: canvas.width / 4,
                    height: canvas.width / 4,
                    originX: "center",
                    originY: "center",
                    selectable: true,
                    fill: "rgba(0, 255, 0, 1)", 
                });
                break;
    
            case "polygon":
                shape = new fabric.Polygon(
                    [
                        { x: 200, y: 0 },
                        { x: 250, y: 50 },
                        { x: 300, y: 0 },
                        { x: 275, y: -50 },
                        { x: 225, y: -50 },
                    ],
                    {
                        left: 250,
                        top: 250,
                        originX: "center",
                        originY: "center",
                        selectable: true,
                        fill: "rgba(255, 255, 0, 1)",
                    }
                );
                break;
    
            default:
                console.warn("Unknown shape type:", shapeType);
                return;
        }
    
        canvas.add(shape);
    };
    

    const downloadCanvas = () => {
        if (canvasRef.current) {
            const dataURL = canvasRef.current.toDataURL({ format: 'jpeg', quality: 1 });
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'canvas_image.jpg'; // Name the downloaded file
            link.click();
        }
    };

    useEffect(() => {
        const canvas = new fabric.Canvas('myCanvas', { width: 600, height: 600 });
        console.log("canvas", canvas);

        fabric.FabricImage.fromURL(image, { crossOrigin: 'anonymous' })
            .then((img) => {
                const scaleX = canvas.width / img.width;
                const scaleY = canvas.height / img.height;
                const scale = Math.max(scaleX, scaleY);
                img.set({
                    left: 0,
                    top: 0,
                    scaleX: scale,
                    scaleY: scale,
                    originX: 'left',
                    originY: 'top',
                });

                img.selectable = false
                canvas.add(img);
                canvasRef.current = canvas
            })
            .catch((err) => {
                console.error('Error loading image:', err);
            });
    }, [image]);

    return (
        <div className="bg-slate-400 h-[100vh] w-full">
            <div className=" flex gap-10 justify-center  pt-36">
                <canvas
                    // ref={canvasRef}
                    id="myCanvas"
                    style={{ border: "1px solid #ccc", height: 600, width: 600 }}
                ></canvas>
                <div className="w-[25%]" >
                    <div className="w-full">
                        <input
                            type="text"
                            className="py-2 px-5 mt-2 w-[70%] bg-zinc-900"
                            placeholder="Enter caption"
                            value={txt}
                            onChange={(e) => setTxt(e.target.value)}
                        />
                        <button className="shadow-lg px-5 py-2 w-[30%] bg-blue-600" onClick={addText}>
                            Add Caption
                        </button>
                    </div>
                    <button className="shadow-lg px-5 w-full mt-3 py-2 bg-blue-600" onClick={() => addShape("circle")}>Add Circle</button>
                    <button className="shadow-lg px-5 w-full mt-3 py-2 bg-blue-600" onClick={() => addShape("triangle")}>Add Triangle</button>
                    <button className="shadow-lg px-5 w-full mt-3 py-2 bg-blue-600" onClick={() => addShape("square")}>Add Square</button>
                    <button className="shadow-lg px-5 w-full mt-3 py-2 bg-blue-600" onClick={() => addShape("polygon")}>Add Polygon</button>
                    <button className="shadow-lg px-5 w-full mt-3 py-2 bg-blue-600" onClick={downloadCanvas}>Download</button>
                </div>
            </div>
        </div>
    );
};

export default EditImage;
