"use client";

import React, { useEffect, useRef } from "react";
import  {Canvas, FabricImage, FabricText}  from "fabric";

interface EditImageProps {
  image: string; // The URL of the image to be edited
}

const EditImage: React.FC<EditImageProps> = ({ image }) => {
  const canvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    const canvas = new Canvas("image-canvas");
    canvasRef.current = canvas;

    // Add the image to the canvas
    FabricImage.fromURL(image, (img) => {
      if (img) {
        img.scaleToWidth(canvas.width || 800);
        img.scaleToHeight(canvas.height || 600);
        canvas.add(img);
      }
    });

    // Clean up the canvas on unmount
    return () => {
      canvas.dispose();
      canvasRef.current = null;
    };
  }, [image]);

  const addText = () => {
    if (canvasRef.current) {
      const text = new FabricText("Enter Caption", {
        left: 50,
        top: 50,
        fontSize: 20,
      });
      canvasRef.current.add(text);
    }
  };

  const addShape = (shapeType: string) => {
    if (canvasRef.current) {
      let shape: fabric.Object | null = null;
      if (shapeType === "circle") {
        shape = new fabric.Circle({
          radius: 50,
          fill: "red",
          left: 100,
          top: 100,
        });
      } else if (shapeType === "rectangle") {
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: "blue",
          left: 100,
          top: 100,
        });
      }
      if (shape) {
        canvasRef.current.add(shape);
      }
    }
  };

  const downloadCanvas = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL({
        format: "png",
        multiplier: 2,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "modified-image.png";
      link.click();
    }
  };

  return (
    <div>
      <canvas
        id="image-canvas"
        width={800}
        height={600}
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
