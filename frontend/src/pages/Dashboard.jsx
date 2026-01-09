import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const filteredTasks = tasks
    // SEARCH
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    // TIME FILTER
    .filter((task) => {
      if (filter === "24h") {
        return (
          new Date(task.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        );
      }

      if (filter === "7d") {
        return (
          new Date(task.createdAt) >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
      }

      return true; // all & recent
    })
    // SORTING
    .sort((a, b) => {
      if (filter === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0; // keep default order for "all"
    });


  const fetchProfile = async () => {
    const res = await API.get("/auth/profile");
    setUser(res.data);
  };

  const saveTask = async () => {
    if (!title.trim()) return;

    if (editId) {
      await API.put(`/tasks/${editId}`, { title });
      setEditId(null);
    } else {
      await API.post("/tasks", { title });
    }

    setTitle("");
    fetchTasks();
  };

  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* User Profile */}
      {user && (
        <div className="bg-gray-800 p-5 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-2">User Profile</h2>

          <div className="text-gray-300 space-y-1">
            <p>
              <span className="text-gray-400">Name:</span> {user.name}
            </p>
            <p>
              <span className="text-gray-400">Email:</span> {user.email}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Task Dashboard</h1>
        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="flex-1 p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter */}
        <select
          className="p-3 bg-gray-800 rounded focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="recent">Most Recent</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-3 bg-gray-800 rounded"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={saveTask}
          className="bg-blue-600 px-6 rounded font-semibold"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <span>{task.title}</span>

            <div className="space-x-2">
              <button
                onClick={() => editTask(task)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
