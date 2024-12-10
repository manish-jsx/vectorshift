// /frontend/src/nodes/ImageNode.js
import React from 'react';
import BaseNode from './BaseNode';

const ImageNode = ({ data }) => {
  return (
    <BaseNode data={data} type="image">
      <div>
        <img src={data.src} alt={data.alt} style={{ width: '100px' }} />
      </div>
    </BaseNode>
  );
};

export default ImageNode;