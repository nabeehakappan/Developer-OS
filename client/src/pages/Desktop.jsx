import { useState } from "react";
import "../styles/desktop.css";

export default function Desktop() {
  const [openApps, setOpenApps] = useState([]);

  const apps = [
    { id: "notes", name: "Notes" },
    { id: "settings", name: "Settings" }
  ];

  const openApp = (app) => {
    setOpenApps((prev) => [...prev, app]);
  };

  return (
    <div className="desktop">
      {/* Icons */}
      <div className="icon-grid">
        {apps.map((app) => (
          <div key={app.id} className="icon" onClick={() => openApp(app)}>
            🗂️ {app.name}
          </div>
        ))}
      </div>

      {/* Windows */}
      {openApps.map((app, index) => (
        <div key={index} className="window">
          <div className="window-header">
            {app.name}
          </div>
          <div className="window-body">
            This is {app.name}
          </div>
        </div>
      ))}
    </div>
  );
}