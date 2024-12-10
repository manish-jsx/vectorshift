import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LLMNode from './nodes/LLMNode';
import TextNode from './nodes/TextNode';
import ImageNode from './nodes/ImageNode';
import AudioNode from './nodes/AudioNode';
import VideoNode from './nodes/VideoNode';
import NumberNode from './nodes/NumberNode';
import BooleanNode from './nodes/BooleanNode';
import './App.css';
import { onSubmit } from './submit';

import { AppBar, Toolbar, Typography, Container, Grid, Button, Box } from '@mui/material';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'llm',
    data: { label: 'LLM Node' },
    position: { x: 250, y: 200 },
  },
  {
    id: '4',
    type: 'text',
    data: { label: 'Text Node', handles: {} },
    position: { x: 250, y: 300 },
  },
  {
    id: 'image-1',
    type: 'image',
    data: { label: 'Image Node', src: 'https://via.placeholder.com/150', alt: 'Placeholder' },
    position: { x: 50, y: 600 },
  },
  {
    id: 'audio-1',
    type: 'audio',
    data: { label: 'Audio Node', src: '' },
    position: { x: 250, y: 600 },
  },
  {
    id: 'video-1',
    type: 'video',
    data: { label: 'Video Node', src: '' },
    position: { x: 450, y: 600 },
  },
  {
    id: 'number-1',
    type: 'number',
    data: { label: 'Number Node', value: 42 },
    position: { x: 650, y: 600 },
  },
  {
    id: 'boolean-1',
    type: 'boolean',
    data: { label: 'Boolean Node', value: true },
    position: { x: 850, y: 600 },
  },
];

let id = 5;
const getId = () => {
  id++;
  return `${id}`;
}

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodeTypes = useMemo(() => ({
    input: InputNode,
    output: OutputNode,
    llm: LLMNode,
    text: TextNode,
    image: ImageNode,
    audio: AudioNode,
    video: VideoNode,
    number: NumberNode,
    boolean: BooleanNode
  }), []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, handles: {} },
      };

      if (type === 'image') {
        newNode.data = { ...newNode.data, src: 'https://via.placeholder.com/150', alt: 'Placeholder' };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleSubmit = () => {
    onSubmit(nodes, edges);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VectorShift Pipeline Builder
          </Typography>
          <Button color="inherit" onClick={handleSubmit}>
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <ReactFlowProvider>
              <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  fitView
                >
                  <Controls />
                  <Background id="1" gap={16} color="#f1f1f1" />
                </ReactFlow>
              </div>
            </ReactFlowProvider>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;