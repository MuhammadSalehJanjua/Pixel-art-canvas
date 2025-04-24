"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Canvas from "./components/Canvas"
import Toolbar from "./components/Toolbar"
import ColorPicker from "./components/ColorPicker"
import LayersPanel from "./components/LayersPanel"
import CanvasSizeControls from "./components/CanvasSizeControls"
import type { Layer, Tool, PixelEditorState } from "./types"
import "./App.css"

const App: React.FC = () => {
  const [state, setState] = useState<PixelEditorState>({
    canvasSize: {
      width: 32,
      height: 32,
    },
    layers: [
      {
        id: uuidv4(),
        name: "Layer 1",
        visible: true,
        data: Array(32)
          .fill([])
          .map(() => Array(32).fill("")),
      },
    ],
    activeLayerId: "",
    activeTool: "pencil",
    activeColor: "#000000",
    history: {
      past: [],
      future: [],
    },
  })

  // Set the first layer as active on initial load
  useEffect(() => {
    if (state.layers.length > 0 && !state.activeLayerId) {
      setState((prevState) => ({
        ...prevState,
        activeLayerId: prevState.layers[0].id,
      }))
    }
  }, [state.layers, state.activeLayerId])

  const handleToolChange = (tool: Tool) => {
    setState((prevState) => ({
      ...prevState,
      activeTool: tool,
    }))
  }

  const handleColorChange = (color: string) => {
    setState((prevState) => ({
      ...prevState,
      activeColor: color,
    }))
  }

  const handleLayerUpdate = (layerId: string, newData: string[][]) => {
    setState((prevState) => {
      // Save current state to history
      const newPast = [...prevState.history.past, prevState.layers]

      // Update the layer data
      const updatedLayers = prevState.layers.map((layer) =>
        layer.id === layerId ? { ...layer, data: newData } : layer,
      )

      return {
        ...prevState,
        layers: updatedLayers,
        history: {
          past: newPast,
          future: [],
        },
      }
    })
  }

  const handleLayerAdd = () => {
    setState((prevState) => {
      const newLayer: Layer = {
        id: uuidv4(),
        name: `Layer ${prevState.layers.length + 1}`,
        visible: true,
        data: Array(prevState.canvasSize.height)
          .fill([])
          .map(() => Array(prevState.canvasSize.width).fill("")),
      }

      return {
        ...prevState,
        layers: [...prevState.layers, newLayer],
        activeLayerId: newLayer.id,
      }
    })
  }

  const handleLayerRemove = (id: string) => {
    setState((prevState) => {
      // Don't remove if it's the only layer
      if (prevState.layers.length <= 1) return prevState

      const updatedLayers = prevState.layers.filter((layer) => layer.id !== id)

      // If we're removing the active layer, set the first layer as active
      const newActiveLayerId = prevState.activeLayerId === id ? updatedLayers[0].id : prevState.activeLayerId

      return {
        ...prevState,
        layers: updatedLayers,
        activeLayerId: newActiveLayerId,
      }
    })
  }

  const handleLayerVisibilityToggle = (id: string) => {
    setState((prevState) => {
      const updatedLayers = prevState.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer,
      )

      return {
        ...prevState,
        layers: updatedLayers,
      }
    })
  }

  const handleActiveLayerChange = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      activeLayerId: id,
    }))
  }

  const handleLayerReorder = (id: string, direction: "up" | "down") => {
    setState((prevState) => {
      const layers = [...prevState.layers]
      const index = layers.findIndex((layer) => layer.id === id)

      if ((direction === "up" && index === 0) || (direction === "down" && index === layers.length - 1)) {
        return prevState
      }

      const newIndex = direction === "up" ? index - 1 : index + 1
      const [movedLayer] = layers.splice(index, 1)
      layers.splice(newIndex, 0, movedLayer)

      return {
        ...prevState,
        layers,
      }
    })
  }

  const handleCanvasSizeChange = (width: number, height: number) => {
    setState((prevState) => {
      // Resize all layers
      const resizedLayers = prevState.layers.map((layer) => {
        const newData = Array(height)
          .fill([])
          .map((_, y) =>
            Array(width)
              .fill("")
              .map((_, x) => {
                // Preserve existing pixel data if within bounds
                if (y < layer.data.length && x < (layer.data[y]?.length || 0)) {
                  return layer.data[y][x] || ""
                }
                return ""
              }),
          )

        return {
          ...layer,
          data: newData,
        }
      })

      return {
        ...prevState,
        canvasSize: { width, height },
        layers: resizedLayers,
      }
    })
  }

  const handleUndo = () => {
    setState((prevState) => {
      if (prevState.history.past.length === 0) return prevState

      const newPast = [...prevState.history.past]
      const lastState = newPast.pop()

      if (!lastState) return prevState

      return {
        ...prevState,
        layers: lastState,
        history: {
          past: newPast,
          future: [prevState.layers, ...prevState.history.future],
        },
      }
    })
  }

  const handleRedo = () => {
    setState((prevState) => {
      if (prevState.history.future.length === 0) return prevState

      const [nextState, ...newFuture] = prevState.history.future

      return {
        ...prevState,
        layers: nextState,
        history: {
          past: [...prevState.history.past, prevState.layers],
          future: newFuture,
        },
      }
    })
  }

  return (
    <div className="pixel-art-editor">
      <header className="editor-header">
        <div className="logo">
          <span className="logo-text">Pixel Art Editor</span>
        </div>
        <div className="header-actions">
          <button className="undo-button" onClick={handleUndo} disabled={state.history.past.length === 0}>
            Undo
          </button>
          <button className="redo-button" onClick={handleRedo} disabled={state.history.future.length === 0}>
            Redo
          </button>
        </div>
      </header>

      <div className="editor-content">
        <div className="left-panel">
          <Toolbar activeTool={state.activeTool} onToolChange={handleToolChange} />
          <ColorPicker activeColor={state.activeColor} onColorChange={handleColorChange} />
        </div>

        <div className="canvas-area">
          <CanvasSizeControls canvasSize={state.canvasSize} onCanvasSizeChange={handleCanvasSizeChange} />
          <Canvas
            layers={state.layers}
            activeLayerId={state.activeLayerId}
            canvasSize={state.canvasSize}
            activeTool={state.activeTool}
            activeColor={state.activeColor}
            onLayerUpdate={handleLayerUpdate}
          />
        </div>

        <div className="right-panel">
          <LayersPanel
            layers={state.layers}
            activeLayerId={state.activeLayerId}
            onLayerAdd={handleLayerAdd}
            onLayerRemove={handleLayerRemove}
            onLayerVisibilityToggle={handleLayerVisibilityToggle}
            onActiveLayerChange={handleActiveLayerChange}
            onLayerReorder={handleLayerReorder}
          />
        </div>
      </div>
    </div>
  )
}

export default App
