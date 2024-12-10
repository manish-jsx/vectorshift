# /backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

# Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://spiffy-platypus-c89cbe.netlify.app/"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]
    position: Dict[str, float]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str | None
    targetHandle: str | None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Create a directed graph
    graph = nx.DiGraph()
    for node in pipeline.nodes:
        graph.add_node(node.id)
    for edge in pipeline.edges:
        graph.add_edge(edge.source, edge.target)

    # Check if the graph is a directed acyclic graph (DAG)
    is_dag = nx.is_directed_acyclic_graph(graph)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}