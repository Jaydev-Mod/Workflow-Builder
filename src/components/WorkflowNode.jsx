// src/components/WorkflowNode.jsx
import React from 'react';
import './WorkflowNode.css';

export const WorkflowNode = ({ nodeId, parentId, index, data, onAdd, onDelete, onUpdate }) => {
  const node = data.nodes[nodeId];
  if (!node) return null;

  const isBranch = node.type === 'branch';
  const isEnd = node.type === 'end';
  const isStart = node.type === 'start';

  return (
    <div className="node-wrapper">
      <div className={`node-card ${node.type}`}>
        
        {/* 1. LABEL (Start, Action, etc) - Now using a class for safety */}
        {!isEnd && (
           <div className="node-type-label">{node.type}</div>
        )}

        {/* 2. INPUT FIELD */}
        <div className="node-content">
            <input 
                value={node.label} 
                onChange={(e) => onUpdate(nodeId, e.target.value)}
                disabled={isStart || isEnd}
                className="node-input"
            />
        </div>
        
        {/* Delete Button */}
        {!isStart && !isEnd && (
             <button className="delete-btn" onClick={() => parentId && onDelete(nodeId, parentId)}>×</button>
        )}
        
        {/* CASE A: Standard Add (For Start or Action nodes) */}
        {!isEnd && !isBranch && (
             <div className="add-btn-wrapper">
                <button className="add-btn">+</button>
                <div className="dropdown-menu">
                    <div onClick={() => onAdd(nodeId, 'action', 0)}>Add Action Below</div>
                    <div onClick={() => onAdd(nodeId, 'branch', 0)}>Add Condition Below</div>
                </div>
             </div>
        )}

        {/* CASE B: Branch Node (Add to Left/Right) */}
        {isBranch && (
             <div className="add-btn-wrapper">
                <button className="add-btn">+</button>
                <div className="dropdown-menu">
                    <div style={{borderBottom: '1px solid #eee', paddingBottom: '4px', marginBottom: '4px', fontWeight: 'bold', color: '#333'}}>True Path (Left)</div>
                    <div onClick={() => onAdd(nodeId, 'action', 0)}>+ Action</div>
                    <div onClick={() => onAdd(nodeId, 'branch', 0)}>+ Condition</div>
                    
                    <div style={{borderBottom: '1px solid #eee', paddingBottom: '4px', marginBottom: '4px', marginTop: '8px', fontWeight: 'bold', color: '#333'}}>False Path (Right)</div>
                    <div onClick={() => onAdd(nodeId, 'action', 1)}>+ Action</div>
                    <div onClick={() => onAdd(nodeId, 'branch', 1)}>+ Condition</div>
                </div>
             </div>
        )}

        {/* CASE C: End Node (Extend Branch) */}
        {isEnd && (
             <div className="add-btn-wrapper">
                <button className="add-btn" style={{ width: '20px', height: '20px', fontSize: '12px' }}>+</button>
                <div className="dropdown-menu">
                    <div onClick={() => onAdd(parentId, 'action', index)}>Insert Action</div>
                    <div onClick={() => onAdd(parentId, 'branch', index)}>Insert Condition</div>
                </div>
             </div>
        )}

      </div>

      {/* RECURSIVE CHILDREN */}
      {node.children.length > 0 && (
        <div className="children-container">
          {node.children.map((childId, idx) => (
            <div key={childId} className="child-branch">
               <WorkflowNode 
                 nodeId={childId} parentId={nodeId} index={idx} 
                 data={data} onAdd={onAdd} onDelete={onDelete} onUpdate={onUpdate}
               />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};