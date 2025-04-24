"use client"

import type React from "react"
import { useState } from "react"

interface ColorPickerProps {
  activeColor: string
  onColorChange: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ activeColor, onColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  // Predefined color palette
  const presetColors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#800000",
    "#008080",
    "#000080",
    "#808080",
    "#C0C0C0",
    "#FFC0CB",
    "#FFD700",
    "#A52A2A",
    "#7FFFD4",
  ]

  return (
    <div className="color-picker">
      <h3 className="color-picker-title">Colors</h3>

      <div className="current-color-container">
        <div
          className="current-color"
          style={{ backgroundColor: activeColor }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        <span className="color-hex">{activeColor}</span>
      </div>

      {showColorPicker && (
        <div className="color-picker-popup">
          <input
            type="color"
            value={activeColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="color-input"
          />
        </div>
      )}

      <div className="preset-colors">
        {presetColors.map((color) => (
          <button
            key={color}
            className={`color-swatch ${color === activeColor ? "active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
