// src/App.jsx
import React from 'react';
import { useWorkflow } from './useWorkflow';
import { WorkflowNode } from './components/WorkflowNode';
import './App.css'; 

function App() {
  const { workflow, addNode, deleteNode, updateLabel } = useWorkflow();

  const handleSave = () => {
    // Bonus Requirement: Logs JSON to console
    console.log("Current Workflow JSON:", JSON.stringify(workflow, null, 2));
    alert('Workflow saved! Check the browser console (F12) to see the JSON.');
  };

  return (
    <div className="app-container">
      <header className="toolbar">
        <h1>Workflow Builder</h1>
        <div className="toolbar-actions">
           <button onClick={handleSave} className="save-btn">Save Workflow</button>
        </div>
      </header>
      
      <div className="canvas">
        {/* We start rendering from the ROOT node (start-1) */}
        <WorkflowNode 
          nodeId={workflow.rootId} 
          parentId={null} 
          data={workflow} 
          onAdd={addNode} 
          onDelete={deleteNode} 
          onUpdate={updateLabel}
        />
      </div>
    </div>
  );
}

export default App;