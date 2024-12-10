# VectorShift Frontend Technical Assessment

This project is a frontend technical assessment for VectorShift, consisting of a React frontend and a FastAPI backend. The application allows users to build and visualize pipelines using a node-based interface and interact with a backend API to analyze the constructed pipelines.

## Problem Statement

The assessment is divided into four parts:

**Part 1: Node Abstraction**

*   Create an abstract BaseNode component to reduce code duplication and simplify the creation of new node types.
*   Refactor existing nodes (InputNode, OutputNode, LLMNode, TextNode) to use the BaseNode.
*   Implement five new node types (ImageNode, AudioNode, VideoNode, NumberNode, BooleanNode) to demonstrate the abstraction.

**Part 2: Styling**

*   Style the application using Material UI and custom CSS to create a visually appealing and user-friendly interface.
*   Ensure consistency in design across all components.

**Part 3: Text Node Logic**

*   Dynamically resize the TextNode based on its content.
*   Implement variable handle creation:
    *   Extract variables enclosed in double curly braces (e.g., `{{variable}}`) from the text input.
    *   Create corresponding input handles on the TextNode for each extracted variable.

**Part 4: Backend Integration**

*   Update the frontend to send pipeline data (nodes and edges) to the backend's `/pipelines/parse` endpoint on "Submit" button click.
*   Modify the backend endpoint to:
    *   Calculate the number of nodes and edges.
    *   Check if the pipeline forms a Directed Acyclic Graph (DAG).
    *   Return the results in the format: `{num_nodes: int, num_edges: int, is_dag: bool}`.
*   Display an alert on the frontend with the received backend data.

## Folder Structure

```text
vectorshift-assessment/
├── backend/
│   ├── main.py          # FastAPI backend application
│   ├── venv/           # Virtual environment (ignored by Git)
│   └── requirements.txt # Backend dependencies
└── frontend/
    ├── public/
    │   └── index.html      # HTML template
    ├── src/
    │   ├── components/
    │   │   └── Sidebar.js  # Sidebar component
    │   ├── nodes/
    │   │   ├── BaseNode.js # Abstract BaseNode component
    │   │   ├── InputNode.js
    │   │   ├── OutputNode.js
    │   │   ├── LLMNode.js
    │   │   ├── TextNode.js
    │   │   ├── ImageNode.js
    │   │   ├── AudioNode.js
    │   │   ├── VideoNode.js
    │   │   ├── NumberNode.js
    │   │   └── BooleanNode.js
    │   ├── App.js          # Main React application component
    │   ├── index.js        # React application entry point
    │   ├── index.css       # Global styles
    │   ├── App.css         # Styles for App.js
    │   └── submit.js       # Function to submit pipeline data to the backend
    ├── package.json        # Frontend dependencies and scripts
    └── package-lock.json   # Frontend dependency lock file
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Setup

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd vectorshift-assessment
    ```

2. **Backend Setup:**

    *   Navigate to the `/backend` directory:

        ```bash
        cd backend
        ```

    *   Create a virtual environment:

        ```bash
        python3 -m venv venv
        ```

    *   Activate the virtual environment:

        *   On Windows:

            ```bash
            venv\Scripts\activate
            ```

        *   On macOS/Linux:

            ```bash
            source venv/bin/activate
            ```

    *   Install dependencies:

        ```bash
        pip install -r requirements.txt
        ```

3. **Frontend Setup:**

    *   Navigate to the `/frontend` directory:

        ```bash
        cd ../frontend
        ```

    *   Install dependencies:

        ```bash
        npm install
        ```

## Running the Application

1. **Start Backend:**

    *   Navigate to the `/backend` directory.
    *   Activate the virtual environment.
    *   Run:

        ```bash
        uvicorn main:app --reload
        ```

2. **Start Frontend:**

    *   In a **new** terminal, navigate to the `/frontend` directory.
    *   Run:

        ```bash
        npm start
        ```

    This will open the application in your default browser (usually at `http://localhost:3000`).

## Usage

1. Drag and drop nodes from the sidebar onto the React Flow canvas.
2. Connect nodes to create a pipeline.
3. Enter text into the TextNode and define variables using double curly braces (e.g., `{{myVar}}`).
4. Click the "Submit" button to send the pipeline data to the backend.
5. An alert will display the number of nodes, edges, and whether the pipeline is a DAG.

## Built With

*   [React](https://reactjs.org/) - Frontend library
*   [React Flow](https://reactflow.dev/) - Node-based UI library
*   [Material UI](https://mui.com/) - React component library
*   [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
*   [Uvicorn](https://www.uvicorn.org/) - ASGI server

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (Note: You may need to add a LICENSE file if you intend to distribute this code).
