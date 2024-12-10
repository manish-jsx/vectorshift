// /frontend/src/nodes/LLMNode.js
import React from 'react';
import BaseNode from './BaseNode';

const LLMNode = ({ data }) => {
  return (
    <BaseNode data={data} type="llm">
      {/* LLM-specific content can be added here, if needed */}
    </BaseNode>
  );
};

export default LLMNode;