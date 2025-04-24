"use client"

import type React from "react"
import type { Tool } from "../types"
import { Pencil, Eraser, Droplet, Palette } from "lucide-react"

interface ToolbarProps {
  activeTool: Tool
  onToolChange: (tool: Tool) => void
}

const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onToolChange }) => {
  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: "pencil", icon: <Pencil size={20} />, label: "Pencil" },
    { id: "eraser", icon: <Eraser size={20} />, label: "Eraser" },
    { id: "colorPicker", icon: <Droplet size={20} />, label: "Color Picker" },
    { id: "bucketFill", icon: <Palette size={20} />, label: "Bucket Fill" },
  ]

  return (
    <div className="toolbar">
      <h3 className="toolbar-title">Tools</h3>
      <div className="tools-grid">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`tool-button ${activeTool === tool.id ? "active" : ""}`}
            onClick={() => onToolChange(tool.id)}
            title={tool.label}
          >
            {tool.icon}
            <span className="tool-label">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Toolbar
