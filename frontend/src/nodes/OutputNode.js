// /frontend/src/nodes/OutputNode.js
import React from 'react';
import BaseNode from './BaseNode';

const OutputNode = ({ data }) => {
  return (
    <BaseNode data={data} type="output">
      {/* Output-specific content can be added here, if needed */}
    </BaseNode>
  );
};

export default OutputNode;