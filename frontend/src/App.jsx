import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/workspaces";

function App() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (response.ok) {
        setWorkspaces(data.workspaces);
      } else {
        alert(data.message || "Failed to fetch workspaces");
      }
    } catch (error) {
      alert("Cannot connect to the backend server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();

    if (!name.trim() || !owner.trim()) {
      alert("Please enter workspace name and owner ID");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          owner,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setWorkspaces([...workspaces, data.workspace]);
        setName("");
        setDescription("");
        setOwner("");
        alert("Workspace created successfully");
      } else {
        alert(data.message || "Failed to create workspace");
      }
    } catch (error) {
      alert("Cannot connect to the backend server");
    }
  };
//return
  return (
    <div className="app">
      <header className="header">
        <h1>Workspace Manager</h1>
        <p>Create and manage your team workspaces</p>
      </header>

      <main className="container">
        <section className="create-section">
          <h2>Create New Workspace</h2>

          <form onSubmit={handleCreateWorkspace}>
            <input
              type="text"
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Workspace description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="text"
              placeholder="Owner ID"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />

            <button type="submit">+ Create Workspace</button>
          </form>
        </section>

        <section className="workspace-section">
          <h2>Your Workspaces</h2>

          {loading ? (
            <p>Loading workspaces...</p>
          ) : (
            <div className="workspace-grid">
              {workspaces.length > 0 ? (
                workspaces.map((workspace) => (
                  <div className="workspace-card" key={workspace._id}>
                    <h3>{workspace.name}</h3>

                    <p>
                      {workspace.description || "No description available"}
                    </p>

                    <button>Open Workspace</button>
                  </div>
                ))
              ) : (
                <p>No workspaces available. Create your first workspace!</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;