import "./App.css";

const boards = [
  {
    title: "Product Development",
    description: "Manage product development tasks",
    tasks: 18,
    progress: 75,
    icon: "🚀",
  },
  {
    title: "Website Redesign",
    description: "Design and development workflow",
    tasks: 12,
    progress: 50,
    icon: "🎨",
  },
  {
    title: "Marketing Campaign",
    description: "Marketing campaigns and content",
    tasks: 9,
    progress: 65,
    icon: "📢",
  },
];

const tasks = [
  {
    title: "Implement authentication flow",
    board: "Product Development",
    priority: "High",
    status: "In Progress",
  },
  {
    title: "Design dashboard UI",
    board: "Website Redesign",
    priority: "Medium",
    status: "Review",
  },
  {
    title: "Prepare launch campaign",
    board: "Marketing Campaign",
    priority: "Low",
    status: "Todo",
  },
  {
    title: "Fix responsive layout",
    board: "Website Redesign",
    priority: "High",
    status: "In Progress",
  },
];

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">P</div>
          <span>ProjectFlow</span>
        </div>

        <div className="workspace-box">
          <div className="workspace-logo">P</div>

          <div className="workspace-info">
            <strong>Project 2</strong>
            <span>My Workspace</span>
          </div>

          <button>•••</button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">MAIN</div>

          <button className="nav-link active">
            <span>⌂</span>
            Home
          </button>

          <button className="nav-link">
            <span>▦</span>
            Boards
          </button>

          <button className="nav-link">
            <span>✓</span>
            My Tasks
          </button>

          <button className="nav-link">
            <span>⌕</span>
            Search
          </button>

          <div className="nav-section-title">WORKSPACE</div>

          <button className="nav-link">
            <span>👥</span>
            Members
          </button>

          <button className="nav-link">
            <span>🔔</span>
            Notifications
            <span className="notification-count">3</span>
          </button>

          <button className="nav-link">
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="profile">
            <div className="avatar">S</div>

            <div className="profile-info">
              <strong>Sahil Sheikh</strong>
              <span>Developer</span>
            </div>

            <button>•••</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <div>
            <div className="breadcrumb">Project 2 / Workspace</div>
            <h1>Home</h1>
          </div>

          <div className="header-actions">
            <button className="header-icon">⌕</button>
            <button className="header-icon notification">🔔</button>

            <button className="create-btn">
              + Create
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          {/* Welcome */}
          <section className="welcome-card">
            <div>
              <span className="welcome-label">
                WELCOME BACK 👋
              </span>

              <h2>Good evening, Sahil</h2>

              <p>
                Here's an overview of what's happening
                across your workspace.
              </p>
            </div>

            <button className="primary-btn">
              Open Workspace →
            </button>
          </section>

          {/* Stats */}
          <section className="stats">
            <div className="stat-card">
              <div className="stat-top">
                <span>Total Tasks</span>
                <div className="stat-icon purple">✓</div>
              </div>

              <strong>39</strong>

              <p>
                <span className="positive">↑ 12%</span>
                {" "}from last week
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>In Progress</span>
                <div className="stat-icon blue">◷</div>
              </div>

              <strong>14</strong>

              <p>Currently active</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Completed</span>
                <div className="stat-icon green">✓</div>
              </div>

              <strong>18</strong>

              <p>
                <span className="positive">↑ 8%</span>
                {" "}this week
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Team Members</span>
                <div className="stat-icon orange">👥</div>
              </div>

              <strong>6</strong>

              <p>Active members</p>
            </div>
          </section>

          {/* Boards */}
          <section className="section">
            <div className="section-heading">
              <div>
                <h2>Your Boards</h2>
                <p>Continue working on your projects</p>
              </div>

              <button className="view-btn">
                View all →
              </button>
            </div>

            <div className="boards">
              {boards.map((board) => (
                <div className="board-card" key={board.title}>
                  <div className="board-top">
                    <div className="board-icon">
                      {board.icon}
                    </div>

                    <button>•••</button>
                  </div>

                  <h3>{board.title}</h3>

                  <p>{board.description}</p>

                  <div className="board-meta">
                    <span>{board.tasks} tasks</span>
                    <span>{board.progress}%</span>
                  </div>

                  <div className="progress">
                    <div
                      style={{
                        width: `${board.progress}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

              <button className="new-board">
                <span>+</span>
                <strong>Create new board</strong>
                <small>Start a new project</small>
              </button>
            </div>
          </section>

          {/* Bottom Grid */}
          <section className="bottom-grid">
            {/* Recent Tasks */}
            <div className="panel">
              <div className="panel-heading">
                <div>
                  <h2>Recent Tasks</h2>
                  <p>Your latest activity</p>
                </div>

                <button className="view-btn">
                  View all →
                </button>
              </div>

              <div className="task-list">
                {tasks.map((task) => (
                  <div className="task-row" key={task.title}>
                    <div className="task-check">✓</div>

                    <div className="task-details">
                      <strong>{task.title}</strong>
                      <span>{task.board}</span>
                    </div>

                    <span
                      className={`priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                    <span className="task-status">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="panel activity-panel">
              <div className="panel-heading">
                <div>
                  <h2>Recent Activity</h2>
                  <p>What's happening</p>
                </div>

                <button className="view-btn">
                  See all
                </button>
              </div>

              <div className="activity-list">
                <div className="activity">
                  <div className="activity-avatar">A</div>

                  <div>
                    <p>
                      <strong>Adil</strong> moved a card to
                      <strong> Done</strong>
                    </p>
                    <span>10 minutes ago</span>
                  </div>
                </div>

                <div className="activity">
                  <div className="activity-avatar purple-bg">
                    N
                  </div>

                  <div>
                    <p>
                      <strong>Nabil</strong> created a new
                      board
                    </p>
                    <span>32 minutes ago</span>
                  </div>
                </div>

                <div className="activity">
                  <div className="activity-avatar green-bg">
                    S
                  </div>

                  <div>
                    <p>
                      <strong>Sahil</strong> updated a task
                    </p>
                    <span>1 hour ago</span>
                  </div>
                </div>

                <div className="activity">
                  <div className="activity-avatar orange-bg">
                    A
                  </div>

                  <div>
                    <p>
                      <strong>Arya</strong> joined the
                      workspace
                    </p>
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;