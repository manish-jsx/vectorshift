// /frontend/src/nodes/NumberNode.js
import React from 'react';
import BaseNode from './BaseNode';

const NumberNode = ({ data }) => {
  return (
    <BaseNode data={data} type="number">
      <div>{data.value}</div>
    </BaseNode>
  );
};

export default NumberNode;