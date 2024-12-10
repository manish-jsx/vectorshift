// /frontend/src/Sidebar.js
import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeTypes = [
    { type: 'input', label: 'Input Node' },
    { type: 'output', label: 'Output Node' },
    { type: 'llm', label: 'LLM Node' },
    { type: 'text', label: 'Text Node' },
    { type: 'image', label: 'Image Node' },
    { type: 'audio', label: 'Audio Node' },
    { type: 'video', label: 'Video Node' },
    { type: 'number', label: 'Number Node' },
    { type: 'boolean', label: 'Boolean Node' },
  ];

  return (
    <Box
      p={2}
      sx={{
        bgcolor: '#f5f5f5',
        borderRight: '1px solid #eee',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Nodes
      </Typography>
      {nodeTypes.map((node) => (
        <Tooltip key={node.type} title={`Drag to add ${node.label}`} placement="right">
          <Box
            className="dndnode"
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
            sx={{
              p: 1,
              my: 1,
              bgcolor: 'white',
              border: '1px solid #ccc',
              borderRadius: 4,
              cursor: 'grab',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">{node.label}</Typography>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default Sidebar;