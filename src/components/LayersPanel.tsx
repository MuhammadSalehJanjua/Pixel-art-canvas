"use client"

import type React from "react"
import type { Layer } from "../types"
import { Eye, EyeOff, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react"

interface LayersPanelProps {
  layers: Layer[]
  activeLayerId: string
  onLayerAdd: () => void
  onLayerRemove: (id: string) => void
  onLayerVisibilityToggle: (id: string) => void
  onActiveLayerChange: (id: string) => void
  onLayerReorder: (id: string, direction: "up" | "down") => void
}

const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  activeLayerId,
  onLayerAdd,
  onLayerRemove,
  onLayerVisibilityToggle,
  onActiveLayerChange,
  onLayerReorder,
}) => {
  return (
    <div className="layers-panel">
      <div className="layers-header">
        <h3 className="layers-title">Layers</h3>
        <button className="add-layer-button" onClick={onLayerAdd} title="Add Layer">
          <Plus size={16} />
        </button>
      </div>

      <div className="layers-list">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={`layer-item ${layer.id === activeLayerId ? "active" : ""}`}
            onClick={() => onActiveLayerChange(layer.id)}
          >
            <button
              className="layer-visibility"
              onClick={(e) => {
                e.stopPropagation()
                onLayerVisibilityToggle(layer.id)
              }}
              title={layer.visible ? "Hide Layer" : "Show Layer"}
            >
              {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>

            <span className="layer-name">{layer.name}</span>

            <div className="layer-actions">
              {index > 0 && (
                <button
                  className="layer-move-up"
                  onClick={(e) => {
                    e.stopPropagation()
                    onLayerReorder(layer.id, "up")
                  }}
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </button>
              )}

              {index < layers.length - 1 && (
                <button
                  className="layer-move-down"
                  onClick={(e) => {
                    e.stopPropagation()
                    onLayerReorder(layer.id, "down")
                  }}
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </button>
              )}

              {layers.length > 1 && (
                <button
                  className="layer-delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    onLayerRemove(layer.id)
                  }}
                  title="Delete Layer"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LayersPanel
