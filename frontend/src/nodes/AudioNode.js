// /frontend/src/nodes/AudioNode.js
import React from 'react';
import BaseNode from './BaseNode';

const AudioNode = ({ data }) => {
  return (
    <BaseNode data={data} type="audio">
      <div>
        <audio controls src={data.src} />
      </div>
    </BaseNode>
  );
};

export default AudioNode;