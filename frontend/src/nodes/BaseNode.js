// /frontend/src/nodes/BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Paper, Typography } from '@mui/material';
import './BaseNode.css'; // Import the CSS file

const BaseNode = ({ data, type, children }) => {
  return (
    <Paper elevation={3} className={`node ${type}`}>
      <div className="node-header">
        <Typography variant="subtitle1">{data.label}</Typography>
      </div>
      <Handle type="target" position={Position.Left} id={`${data.id}-left`} />
      <Handle type="source" position={Position.Right} id={`${data.id}-right`} />
      <div className="node-content">{children}</div>
    </Paper>
  );
};

export default BaseNode;