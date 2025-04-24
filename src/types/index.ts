export type Tool = "pencil" | "eraser" | "colorPicker" | "bucketFill"

export interface Layer {
  id: string
  name: string
  visible: boolean
  data: string[][]
}

export interface PixelEditorState {
  canvasSize: {
    width: number
    height: number
  }
  layers: Layer[]
  activeLayerId: string
  activeTool: Tool
  activeColor: string
  history: {
    past: Layer[][]
    future: Layer[][]
  }
}
