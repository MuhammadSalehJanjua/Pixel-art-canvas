"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import type { Layer } from "../types"

interface CanvasProps {
  layers: Layer[]
  activeLayerId: string
  canvasSize: { width: number; height: number }
  activeTool: string
  activeColor: string
  onLayerUpdate: (layerId: string, newData: string[][]) => void
}

const Canvas: React.FC<CanvasProps> = ({
  layers,
  activeLayerId,
  canvasSize,
  activeTool,
  activeColor,
  onLayerUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [cellSize, setCellSize] = useState(16)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  // Calculate the canvas display size
  const displayWidth = canvasSize.width * cellSize
  const displayHeight = canvasSize.height * cellSize

  // Find the active layer
  const activeLayer = layers.find((layer) => layer.id === activeLayerId)

  useEffect(() => {
    renderCanvas()
  }, [layers, cellSize, canvasSize])

  const renderCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Render each visible layer
    layers
      .filter((layer) => layer.visible)
      .forEach((layer) => {
        for (let y = 0; y < canvasSize.height; y++) {
          for (let x = 0; x < canvasSize.width; x++) {
            if (layer.data[y] && layer.data[y][x]) {
              ctx.fillStyle = layer.data[y][x]
              ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
            }
          }
        }
      })

    // Draw grid
    ctx.strokeStyle = "#ddd"
    ctx.lineWidth = 0.5

    for (let x = 0; x <= canvasSize.width; x++) {
      ctx.beginPath()
      ctx.moveTo(x * cellSize, 0)
      ctx.lineTo(x * cellSize, displayHeight)
      ctx.stroke()
    }

    for (let y = 0; y <= canvasSize.height; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * cellSize)
      ctx.lineTo(displayWidth, y * cellSize)
      ctx.stroke()
    }
  }

  const getPixelCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: -1, y: -1 }

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / cellSize)
    const y = Math.floor((e.clientY - rect.top) / cellSize)

    return { x, y }
  }

  const drawPixel = (x: number, y: number) => {
    if (!activeLayer || x < 0 || y < 0 || x >= canvasSize.width || y >= canvasSize.height) return

    const newData = JSON.parse(JSON.stringify(activeLayer.data))

    if (!newData[y]) {
      newData[y] = []
    }

    if (activeTool === "pencil") {
      newData[y][x] = activeColor
    } else if (activeTool === "eraser") {
      newData[y][x] = ""
    } else if (activeTool === "bucketFill") {
      const targetColor = newData[y][x] || ""
      floodFill(newData, x, y, targetColor, activeColor)
    }

    onLayerUpdate(activeLayerId, newData)
  }

  const floodFill = (data: string[][], x: number, y: number, targetColor: string, replacementColor: string) => {
    if (targetColor === replacementColor) return

    const queue = [{ x, y }]

    while (queue.length > 0) {
      const { x, y } = queue.shift()!

      if (x < 0 || x >= canvasSize.width || y < 0 || y >= canvasSize.height) continue

      if (!data[y]) data[y] = []

      if (data[y][x] !== targetColor) continue

      data[y][x] = replacementColor

      queue.push({ x: x + 1, y })
      queue.push({ x: x - 1, y })
      queue.push({ x, y: y + 1 })
      queue.push({ x, y: y - 1 })
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return // Only left mouse button

    setIsDrawing(true)
    const { x, y } = getPixelCoords(e)

    if (activeTool === "colorPicker") {
      const activeLayer = layers.find((layer) => layer.id === activeLayerId)
      if (activeLayer && activeLayer.data[y] && activeLayer.data[y][x]) {
        // We would call a function to update the active color
        // onColorChange(activeLayer.data[y][x]);
      }
    } else {
      drawPixel(x, y)
      setLastPos({ x, y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool === "bucketFill" || activeTool === "colorPicker") return

    const { x, y } = getPixelCoords(e)

    if (lastPos && (lastPos.x !== x || lastPos.y !== y)) {
      // Line drawing between last position and current position
      const dx = Math.abs(x - lastPos.x)
      const dy = Math.abs(y - lastPos.y)
      const sx = lastPos.x < x ? 1 : -1
      const sy = lastPos.y < y ? 1 : -1
      let err = dx - dy

      let currentX = lastPos.x
      let currentY = lastPos.y

      while (true) {
        drawPixel(currentX, currentY)

        if (currentX === x && currentY === y) break

        const e2 = 2 * err
        if (e2 > -dy) {
          err -= dy
          currentX += sx
        }
        if (e2 < dx) {
          err += dx
          currentY += sy
        }
      }
    } else {
      drawPixel(x, y)
    }

    setLastPos({ x, y })
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    setLastPos(null)
  }

  const handleMouseLeave = () => {
    setIsDrawing(false)
    setLastPos(null)
  }

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={displayWidth}
        height={displayHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="pixel-canvas"
      />
    </div>
  )
}

export default Canvas
