# 🚀 Workflow Builder (React + Vite)

A complex, interactive tree visualization tool built from scratch. This project demonstrates advanced frontend architecture patterns, including normalized state management and recursive rendering, without relying on external diagramming libraries.

## ✨ Features

- **Interactive Workflow Tree:** Add "Actions" (linear steps) or "Conditions" (branching logic).
- **Recursive Branching:** Supports deeply nested structures with automatic layout handling.
- **Smart Context Menus:** Right-click style menus for adding nodes to specific paths (True/False).
- **"Heal" Functionality:** Deleting a node automatically reconnects the parent to the child (Linked List logic).
- **Zero-Dependency UI:** All connecting lines and layouts are built using pure CSS (`::before`/`::after` pseudo-elements).

## 🛠 Engineering Decisions (Why I built it this way)

### 1. Normalized State Data Structure
Instead of a standard nested JSON tree (which causes performance issues at scale), I used a **Normalized Hash Map** structure.
- **Benefit:** Accessing any node is **O(1)** (instant), regardless of tree depth.
- **Benefit:** Updates are cleaner; we modify a flat object rather than traversing a deep tree.

```js
// My State Structure (Hash Map)
const nodes = {
  "node-a": { id: "node-a", children: ["node-b"] },
  "node-b": { id: "node-b", children: [] }
}

### 2. Recursive Component Pattern
The UI is built using a single `WorkflowNode` component that renders itself for its children. This ensures the UI stays consistent and performant no matter how deep the workflow grows.

### 3. CSS-Only Connection Lines
I avoided heavy libraries like `React-Flow` or `JointJS`.
- **Technique:** I used CSS pseudo-elements (`::before` and `::after`) to draw the vertical lines and horizontal "bridges" between nodes.
- **Math:** The layout uses flexbox with precise padding calculations to ensure connecting lines meet perfectly pixel-for-pixel.

## 🚀 How to Run Locally

1. Clone the repository
2. Install dependencies:
   
   npm install
3. Run the development server:

   npm run dev