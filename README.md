# 🚀 Workflow Builder Application

## 📖 Project Explanation
The **Workflow Builder** is a complex, interactive frontend application designed to visualize and edit logic trees. It allows users to build flowchart-like structures where a "Start" node can flow into sequential "Actions" or split into conditional "Branches" (True/False paths).

**Key Functionalities:**
* **Interactive Canvas:** Users can build a workflow by adding nodes through context-sensitive menus (e.g., "Add Action Below", "Add Condition").
* **Smart Branching:** Adding a "Condition" automatically splits the flow into two distinct paths (Left/True and Right/False), handling complex nested logic effortlessly.
* **Auto-Healing Trees:** The application implements Linked List logic—when a node is deleted, its parent automatically connects to the deleted node's child, preserving the flow without breaking the tree.
* **Normalized Data Structure:** Unlike typical nested JSON trees, this project uses a flat Hash Map (Normalized State) to ensure **O(1)** performance for updates, even with thousands of nodes.
* **Visual Connections:** All connecting lines and "bridges" are drawn using pure CSS pseudo-elements (`::before`, `::after`) and calculated flexbox layouts, avoiding heavy external diagramming libraries.

---

## ⚙️ Setup & Run Instructions

Follow these steps to set up the project locally on your machine.

### Prerequisites
* **Node.js** installed on your machine.
* A code editor like **VS Code**.

### 1. Installation
1.  Open your terminal and clone the repository:
    ```bash
    git clone https://github.com/Jaydev-Mod/Workflow-Builder.git
    cd workflow-builder-assignment
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### 2. Running the App
1.  Start the local development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to the link shown (usually `http://localhost:5173`).

---

## 🛠 Engineering Decisions (Why I built it this way)

### 1. Normalized State Data Structure
Instead of a standard nested JSON tree (which causes recursion performance issues at scale), I used a **Normalized Hash Map** structure.
* **Benefit:** Accessing or updating any specific node is **O(1)** (instant).
* **Benefit:** React re-renders are more efficient as we update a flat object rather than deeply cloning a tree.

```js
// My State Structure (Hash Map)
const nodes = {
  "start-1": { id: "start-1", type: "start", children: ["action-2"] },
  "action-2": { id: "action-2", type: "action", children: ["end-1"] }
} 
```

### 2. Recursive Component Pattern
The UI is built using a single WorkflowNode component that renders itself for its children.

Logic: <WorkflowNode /> checks its children array and renders a new <WorkflowNode /> for each ID found.

Result: The UI automatically handles infinite nesting depth without extra code.

### 3. CSS-Only Connection Lines
I strictly followed the requirement to avoid libraries like React-Flow.

Technique: I used CSS ::before (vertical lines) and ::after (connectors) combined with absolute positioning.

Math: The layout uses specific padding (20px) and margin calculations to ensure that the vertical line from a parent node meets the horizontal "bridge" of a child node pixel-perfectly.