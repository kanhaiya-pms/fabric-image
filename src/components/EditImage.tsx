"use client";

import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

interface EditImageProps {
    image: string; // The URL of the image to be edited
}

const EditImage: React.FC<EditImageProps> = ({ image }) => {
    const canvasRef = useRef(null as any);

    let text = 'Draggable Text';
    let textX = 100;  // Initial X position of the text
    let textY = 100;  // Initial Y position of the text
    let isDragging = false;

    // useEffect(() => {
    //     // const canvas = new Canvas("image-canvas");
    //     // canvasRef.current = canvas;

    //     const ctx = canvasRef.current?.getContext('2d');

    //     // Create an Image object
    //     const img = new Image();
    //     img.src = image; // Set the path to your image

    //     // When the image is loaded, draw it onto the canvas
    //     img.onload = function () {
    //         ctx?.drawImage(img, 0, 0, canvasRef.current?.width, canvasRef.current.height); // Draw the image on the canvas
    //     };

    //     // Add the image to the canvas
    //     FabricImage.fromURL(image, (img) => {
    //         if (img) {
    //             img.scaleToWidth(canvas.width || 800);
    //             img.scaleToHeight(canvas.height || 600);
    //             canvasRef.current?.add(img);
    //         }
    //     });

    //     // Clean up the canvas on unmount
    //     return () => {
    //         canvas.dispose();
    //         canvasRef.current = null;
    //     };
    // }, []);

    const addText = () => {
        // const ctx: any = canvasRef.current?.getContext('2d');

        // const img = new Image();
        // img.src = image; // Set the path to your image

        // ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);  // Clear the canvas before re-drawing
        // ctx?.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);  // Redraw the image
        // ctx.font = '30px Arial';
        // ctx.fillStyle = 'white';
        // ctx?.fillText(text, 100, 100);

        // if (canvasRef.current) {
        //     const text = new FabricText("Enter Caption", {
        //         left: 50,
        //         top: 50,
        //         fontSize: 20,
        //     });
        //     canvasRef.current.add(text);
        // }
    };

    const addShape = (shapeType: string) => {
        // if (canvasRef.current) {
        //     let shape: fabric.Object | null = null;
        //     if (shapeType === "circle") {
        //         shape = new fabric.Circle({
        //             radius: 50,
        //             fill: "red",
        //             left: 100,
        //             top: 100,
        //         });
        //     } else if (shapeType === "rectangle") {
        //         shape = new fabric.Rect({
        //             width: 100,
        //             height: 100,
        //             fill: "blue",
        //             left: 100,
        //             top: 100,
        //         });
        //     }
        //     if (shape) {
        //         canvasRef.current.add(shape);
        //     }
        // }
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

    // useEffect(() => {
    //     const ctx: any = canvasRef.current?.getContext('2d');

    //     canvasRef.current.addEventListener('mousedown', function (e) {
    //         const mouseX = e.offsetX;
    //         const mouseY = e.offsetY;

    //         // Check if the mouse is over the text
    //         if (mouseX >= textX && mouseX <= textX + ctx.measureText(text).width &&
    //             mouseY >= textY - 30 && mouseY <= textY) {
    //             isDragging = true;  // Start dragging
    //         }
    //     });

    //     canvasRef.current.addEventListener('mousemove', function (e) {
    //         if (isDragging) {
    //             // Move the text with the mouse
    //             textX = e.offsetX;
    //             textY = e.offsetY;
    //             addText();  // Redraw the canvas with the new text position
    //         }
    //     });

    //     canvasRef.current.addEventListener('mouseup', function () {
    //         isDragging = false;  // Stop dragging when mouse is released
    //     });

    //     canvasRef.current.addEventListener('mouseout', function () {
    //         isDragging = false;  // Stop dragging when the mouse leaves the canvas
    //     });

    // }, [])

    useEffect(() => {
        const canvas = new fabric.Canvas('myCanvas', { width: 500, height: 500 });
        console.log("canvas", canvas);

        fabric.FabricImage.fromURL(image, { crossOrigin: 'anonymous' })
            .then((img) => {

                const circleMask = new fabric.Circle({
                    left: 0,
                    top: 0,
                    radius: canvas.width / 2, // Half of the canvas size for circular mask
                    originX: 'center',
                    originY: 'center',
                    selectable: false, // Don't allow interaction with the circle
                });
                canvas.add(circleMask)


                // Scale the image to fit the canvas
                img.set({
                    left: 0,
                    top: 0,
                    width: canvas.width,
                    height: canvas.height,
                    clipPath: circleMask, // Apply the circle mask
                });

                img.selectable = false
                canvas.add(img);

                // Add draggable text
                const text = new fabric.Text('Draggable Text', {
                    left: 100,
                    top: 100,
                    fontSize: 30,
                    fill: 'white',
                    fontFamily: 'Arial',
                    hasBorders: true,  // Show border for dragging
                    hasControls: true  // Allow resizing and rotating
                });

                canvas.add(text);  // Add text to the canvas

                // Enable dragging by default
                text.set({ selectable: true });
                // Enable interactions (drag, move, resize, etc.)
                canvas.renderAll();
                canvasRef.current = canvas
            })
            .catch((err) => {
                console.error('Error loading image:', err);
            });

    }, [image]);

    return (
        <div>
            <canvas
                // ref={canvasRef}
                id="myCanvas"
                style={{ border: "1px solid #ccc" }}
            ></canvas>
            <div style={{ marginTop: "20px" }}>
                <button onClick={addText}>Add Text</button>
                <button onClick={() => addShape("circle")}>Add Circle</button>
                <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
                <button onClick={downloadCanvas}>Download</button>
            </div>
        </div>
    );
};

export default EditImage;
