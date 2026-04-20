import { useState, useEffect } from "react";
import { FileText, Settings, Folder, Info } from "lucide-react";
import { motion } from "framer-motion";
import { getNotes, saveNotes } from "../services/notes";
import { getDesktop, saveDesktop } from "../services/desktop";
import "../styles/desktop.css";

export default function Desktop() {
  const [windows, setWindows] = useState(() => {
    const saved = localStorage.getItem("devos_windows");
    return saved ? JSON.parse(saved) : [];
  });

  const [desktopConfig, setDesktopConfig] = useState(() => {
    const saved = localStorage.getItem("devos_config");
    return saved
      ? JSON.parse(saved)
      : {
          wallpaper: "default",
          theme: "dark"
        };
  });
  const [notes, setNotes] = useState(() => {
  const saved = localStorage.getItem("devos_notes");
  return saved ? JSON.parse(saved) : { content: "" };
});

  useEffect(() => {
    localStorage.setItem("devos_windows", JSON.stringify(windows));
  }, [windows]);

useEffect(() => {
  const load = async () => {
    try {
      const data = await getDesktop();
      if (data) setDesktopConfig(data);
    } catch {}
  };
  load();
}, []);
useEffect(() => {
  saveDesktop(desktopConfig);
}, [desktopConfig]);
useEffect(() => {
  const load = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.log("Not logged in yet");
    }
  };
  load();
}, []);
  const apps = [
    { id: "notes", name: "Notes", icon: <FileText size={28} /> },
    { id: "settings", name: "Settings", icon: <Settings size={28} /> },
    { id: "explorer", name: "Files", icon: <Folder size={28} /> },
    { id: "about", name: "About", icon: <Info size={28} /> }
  ];

  // OPEN APP
  const openApp = (app) => {
    const exists = windows.find((w) => w.name === app.name);
    if (exists) return;

    const newWindow = {
      id: Date.now(),
      name: app.name,
      x: 150,
      y: 120,
      z: windows.length + 1
    };

    setWindows((prev) => [...prev, newWindow]);
  };

  // BRING TO FRONT
  const bringToFront = (id) => {
    const maxZ = Math.max(0, ...windows.map((w) => w.z));

    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, z: maxZ + 1 } : w
      )
    );
  };

  // DRAG
  const handleDrag = (e, id) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const currentWindow = windows.find((w) => w.id === id);
    if (!currentWindow) return;

    const offsetX = startX - currentWindow.x;
    const offsetY = startY - currentWindow.y;

    const onMouseMove = (e) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                x: e.clientX - offsetX,
                y: e.clientY - offsetY
              }
            : w
        )
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div
      className="desktop"
      style={{
        background:
          desktopConfig.wallpaper === "default"
            ? "radial-gradient(circle at top, #1e293b, #0f172a)"
            : `url(${desktopConfig.wallpaper}) center/cover no-repeat`
      }}
    >
      {/* ICONS (YOU WERE MISSING THIS) */}
      <div className="icon-grid">
        {apps.map((app) => (
          <div
            key={app.id}
            className="icon"
            onDoubleClick={() => openApp(app)}
          >
            {app.icon}
            <div className="icon-label">{app.name}</div>
          </div>
        ))}
      </div>

      {/* WINDOWS */}
      {windows.map((win) => {
        const maxZ = Math.max(0, ...windows.map((w) => w.z));
        const isActive = win.z === maxZ;

        return (
          <motion.div
            key={win.id}
            className={`window ${isActive ? "active" : ""}`}
            style={{
              top: win.y,
              left: win.x,
              zIndex: win.z
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onMouseDown={() => bringToFront(win.id)}
          >
            {/* HEADER */}
            <div
              className="window-header"
              onMouseDown={(e) => handleDrag(e, win.id)}
            >
              <div className="window-controls">
                <span
                  className="dot red"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(win.id);
                  }}
                />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>

              <div className="window-title">{win.name}</div>
            </div>

            {/* BODY */}
            <div className="window-body">
              {win.name === "Settings" && (
                <div className="settings-panel">
                  <h3>Appearance</h3>

                  <button
                    onClick={() =>
                      setDesktopConfig((prev) => ({
                        ...prev,
                        wallpaper: "default"
                      }))
                    }
                  >
                    Default Gradient
                  </button>

                  <button
                    onClick={() =>
                      setDesktopConfig((prev) => ({
                        ...prev,
                        wallpaper:
                          "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                      }))
                    }
                  >
                    Nature Wallpaper
                  </button>
                </div>
              )}

              {win.name === "Notes" && (
  <div className="notes-app">
    <textarea
      value={notes.content}
      onChange={(e) => {
  const newContent = e.target.value;
  setNotes({ content: newContent });
  saveNotes(newContent);
}}
      placeholder="Start typing..."
      className="notes-textarea"
    />
  </div>
)}

              {win.name === "Files" && (
                <div>
                  📁 Documents<br />
                  📁 Downloads<br />
                  📁 Projects
                </div>
              )}

              {win.name === "About" && (
                <div>
                  <h2>DevOS</h2>
                  <p>A browser-based desktop environment</p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}