// /frontend/src/nodes/VideoNode.js
import React from 'react';
import BaseNode from './BaseNode';

const VideoNode = ({ data }) => {
  return (
    <BaseNode data={data} type="video">
      <div>
        <video controls width="200" src={data.src} />
      </div>
    </BaseNode>
  );
};

export default VideoNode;