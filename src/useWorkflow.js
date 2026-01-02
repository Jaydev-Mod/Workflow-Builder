// src/useWorkflow.js
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
    rootId: 'start-1',
    nodes: {
        'start-1': { id: 'start-1', type: 'start', label: 'Start', children: ['end-1'] },
        'end-1': { id: 'end-1', type: 'end', label: 'End', children: [] },
    },
};

export const useWorkflow = () => {
    const [workflow, setWorkflow] = useState(INITIAL_STATE);

    const addNode = useCallback((parentId, type, index = 0) => {
        setWorkflow((prev) => {
            const parent = prev.nodes[parentId];


            const newId = uuidv4();
            const newNode = {
                id: newId,
                type,
                label: type === 'branch' ? 'New Condition' : 'New Action',
                children: [],
            };

            const childIdAtIndex = parent.children[index]; // The node currently at this spot

            if (type === 'action') {
                if (childIdAtIndex) {
                    newNode.children = [childIdAtIndex];
                }
            }

            if (type === 'branch') {
                const trueEndId = uuidv4();
                const falseEndId = uuidv4();
                const trueEnd = { id: trueEndId, type: 'end', label: 'End', children: [] };
                const falseEnd = { id: falseEndId, type: 'end', label: 'End', children: [] };

                newNode.children = [trueEndId, falseEndId];

            }

            const newChildren = [...parent.children];
            newChildren[index] = newId;

            const updatedNodes = {
                ...prev.nodes,
                [newId]: newNode,
                [parentId]: { ...parent, children: newChildren },
            };

            if (type === 'branch') {
                updatedNodes[newNode.children[0]] = { id: newNode.children[0], type: 'end', label: 'End', children: [] };
                updatedNodes[newNode.children[1]] = { id: newNode.children[1], type: 'end', label: 'End', children: [] };
            }

            return {
                ...prev,
                nodes: updatedNodes,
            };
        });
    }, []);

    const deleteNode = useCallback((nodeId, parentId) => {
        setWorkflow((prev) => {
            const nodeToDelete = prev.nodes[nodeId];
            const parent = prev.nodes[parentId];

            if (!nodeToDelete || !parent) return prev;

            // Logic: Parent must connect to the deleted node's child
            let newChildrenForParent = [...parent.children];
            const childIndex = newChildrenForParent.indexOf(nodeId);

            const adoptedChildId = nodeToDelete.children.length > 0 ? nodeToDelete.children[0] : null;

            if (adoptedChildId) {
                newChildrenForParent[childIndex] = adoptedChildId;
            } else {
                newChildrenForParent.splice(childIndex, 1);
            }

            const nextNodes = { ...prev.nodes };
            delete nextNodes[nodeId];

            return {
                ...prev,
                nodes: {
                    ...nextNodes,
                    [parentId]: { ...parent, children: newChildrenForParent },
                },
            };
        });
    }, []);

    const updateLabel = useCallback((id, newLabel) => {
        setWorkflow((prev) => ({
            ...prev,
            nodes: {
                ...prev.nodes,
                [id]: { ...prev.nodes[id], label: newLabel }
            }
        }));
    }, []);

    return { workflow, addNode, deleteNode, updateLabel };
};