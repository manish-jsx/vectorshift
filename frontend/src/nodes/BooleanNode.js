// /frontend/src/nodes/BooleanNode.js
import React from 'react';
import BaseNode from './BaseNode';

const BooleanNode = ({ data }) => {
  return (
    <BaseNode data={data} type="boolean">
      <div>{data.value ? 'True' : 'False'}</div>
    </BaseNode>
  );
};

export default BooleanNode;