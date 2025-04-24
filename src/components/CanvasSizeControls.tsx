"use client"

import type React from "react"
import { useState } from "react"

interface CanvasSizeControlsProps {
  canvasSize: { width: number; height: number }
  onCanvasSizeChange: (width: number, height: number) => void
}

const CanvasSizeControls: React.FC<CanvasSizeControlsProps> = ({ canvasSize, onCanvasSizeChange }) => {
  const [width, setWidth] = useState(canvasSize.width)
  const [height, setHeight] = useState(canvasSize.height)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCanvasSizeChange(width, height)
  }

  return (
    <div className="canvas-size-controls">
      <h3 className="controls-title">Canvas Size</h3>
      <form onSubmit={handleSubmit} className="size-form">
        <div className="size-inputs">
          <div className="input-group">
            <label htmlFor="width">Width:</label>
            <input
              id="width"
              type="number"
              min="1"
              max="64"
              value={width}
              onChange={(e) => setWidth(Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="height">Height:</label>
            <input
              id="height"
              type="number"
              min="1"
              max="64"
              value={height}
              onChange={(e) => setHeight(Number.parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        <button type="submit" className="apply-size-button">
          Apply
        </button>
      </form>
    </div>
  )
}

export default CanvasSizeControls
