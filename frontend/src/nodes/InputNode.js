// /frontend/src/nodes/InputNode.js
import React from 'react';
import BaseNode from './BaseNode';

const InputNode = ({ data }) => {
  return (
    <BaseNode data={data} type="input">
      {/* Input-specific content can be added here, if needed */}
    </BaseNode>
  );
};

export default InputNode;