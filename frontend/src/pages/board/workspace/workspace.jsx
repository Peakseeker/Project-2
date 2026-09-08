import "../../App.css";

const boards = [
  {
    name: "Product Development",
    description: "Manage product development tasks",
    tasks: 18,
    progress: 75,
    color: "blue",
  },
  {
    name: "Website Redesign",
    description: "Design and development workflow",
    tasks: 12,
    progress: 50,
    color: "purple",
  },
  {
    name: "Marketing Campaign",
    description: "Marketing campaigns and content",
    tasks: 9,
    progress: 65,
    color: "green",
  },
];

function Workspace() {
  return (
    <div className="workspace-page">
      <div className="workspace-page-header">
        <div>
          <div className="breadcrumb">
            Home / Workspace
          </div>

          <h1>Project 2</h1>

          <p>
            Manage your team's projects and collaborate
            together.
          </p>
        </div>

        <div className="workspace-actions">
          <button className="secondary-btn">
            + Invite Member
          </button>

          <button className="create-btn">
            + Create Board
          </button>
        </div>
      </div>

      <div className="workspace-stats">
        <div className="workspace-stat">
          <span>Total Boards</span>
          <strong>3</strong>
        </div>

        <div className="workspace-stat">
          <span>Total Tasks</span>
          <strong>39</strong>
        </div>

        <div className="workspace-stat">
          <span>Completed</span>
          <strong>18</strong>
        </div>

        <div className="workspace-stat">
          <span>Members</span>
          <strong>6</strong>
        </div>
      </div>

      <div className="workspace-section">
        <div className="workspace-section-header">
          <div>
            <h2>Boards</h2>
            <p>All boards in this workspace</p>
          </div>

          <div className="workspace-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search boards..."
            />
          </div>
        </div>

        <div className="workspace-boards">
          {boards.map((board) => (
            <div
              className="workspace-board-card"
              key={board.name}
            >
              <div
                className={`workspace-board-line ${board.color}`}
              />

              <div className="workspace-board-content">
                <div className="workspace-board-top">
                  <div className="workspace-board-icon">
                    ▦
                  </div>

                  <button>•••</button>
                </div>

                <h3>{board.name}</h3>

                <p>{board.description}</p>

                <div className="workspace-board-info">
                  <span>{board.tasks} Tasks</span>

                  <span>
                    {board.progress}% Complete
                  </span>
                </div>

                <div className="workspace-progress">
                  <div
                    style={{
                      width: `${board.progress}%`,
                    }}
                  />
                </div>

                <button className="open-board-btn">
                  Open Board →
                </button>
              </div>
            </div>
          ))}

          <button className="workspace-new-board">
            <div>+</div>

            <strong>Create New Board</strong>

            <span>
              Start organizing a new project
            </span>
          </button>
        </div>
      </div>

      <div className="workspace-bottom">
        <div className="workspace-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest workspace updates</p>
            </div>
          </div>

          <div className="workspace-activity">
            <div className="activity-avatar">
              A
            </div>

            <div>
              <p>
                <strong>Adil</strong> moved a task to
                Done
              </p>

              <span>10 minutes ago</span>
            </div>
          </div>

          <div className="workspace-activity">
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

          <div className="workspace-activity">
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
        </div>

        <div className="workspace-panel">
          <div className="panel-heading">
            <div>
              <h2>Team Members</h2>
              <p>People in this workspace</p>
            </div>

            <button className="view-btn">
              View all
            </button>
          </div>

          <div className="members">
            <div className="member">
              <div className="member-avatar">
                S
              </div>

              <div>
                <strong>Sahil Sheikh</strong>
                <span>Developer</span>
              </div>

              <div className="online-dot" />
            </div>

            <div className="member">
              <div className="member-avatar member-blue">
                A
              </div>

              <div>
                <strong>Adil</strong>
                <span>Backend Developer</span>
              </div>

              <div className="online-dot" />
            </div>

            <div className="member">
              <div className="member-avatar member-green">
                A
              </div>

              <div>
                <strong>Arya</strong>
                <span>Backend Developer</span>
              </div>

              <div className="online-dot" />
            </div>

            <div className="member">
              <div className="member-avatar member-orange">
                N
              </div>

              <div>
                <strong>Nabil</strong>
                <span>Project Manager</span>
              </div>

              <div className="online-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Workspace;

