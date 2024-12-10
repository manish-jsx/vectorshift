// /frontend/src/submit.js
export const onSubmit = async (nodes, edges) => {
  const pipelineData = {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
      position: node.position,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    })),
  };

  try {
    const response = await fetch('https://vectorshift.onrender.com/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipelineData),
    });

    if (response.ok) {
      const data = await response.json();
      alert(
        `Number of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
      );
    } else {
      console.error('Error submitting pipeline:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting pipeline:', error);
  }
};