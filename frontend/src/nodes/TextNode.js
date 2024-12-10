import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';

const TextNode = ({ data, id }) => {
  const [text, setText] = useState(data.text || '');
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(20);
  const [variables, setVariables] = useState([]);
  const { setNodes } = useReactFlow();

  const onChange = useCallback((evt) => {
    const newText = evt.target.value;
    setText(newText);
  }, []);

  useEffect(() => {
    const lines = text.split('\n').length;
    const longestLine = Math.max(...text.split('\n').map((line) => line.length));
    setRows(lines);
    setCols(Math.max(20, longestLine));

    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    let match;
    const newVariables = [];
    while ((match = regex.exec(text)) !== null) {
      newVariables.push(match[1]);
    }

    setVariables(newVariables);
  }, [text]);

  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === id) {
          const updatedNode = { ...node };
          const currentVariables = updatedNode.data.variables || [];

          const addedVariables = variables.filter(
            (variable) => !currentVariables.includes(variable)
          );
          const removedVariables = currentVariables.filter(
            (variable) => !variables.includes(variable)
          );

          // Add new handles for added variables
          addedVariables.forEach((variable) => {
            if (!updatedNode.data.handles) {
              updatedNode.data.handles = {};
            }
            updatedNode.data.handles[variable] = {
              id: `${id}-${variable}-target`,
              type: 'target',
              position: Position.Left,
            };
          });

          // Remove handles for removed variables
          removedVariables.forEach((variable) => {
            if (updatedNode.data.handles && updatedNode.data.handles[variable]) {
              delete updatedNode.data.handles[variable];
            }
          });

          // Update the variables in the node data
          updatedNode.data.variables = variables;

          return updatedNode;
        }

        return node;
      })
    );
  }, [variables, setNodes, id]);

  return (
    <BaseNode data={data} type="text">
      <div>
        <textarea
          rows={rows}
          cols={cols}
          value={text}
          onChange={onChange}
          className="nodrag"
        />
        {data.handles &&
          Object.values(data.handles).map((handle) => (
            <Handle
              key={handle.id}
              type={handle.type}
              position={handle.position}
              id={handle.id}
            />
          ))}
      </div>
    </BaseNode>
  );
};

export default TextNode;