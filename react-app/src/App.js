import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Virtualization from "./component/Virtualization";
import Toast from "./component/Toast";
import TrafficLightGenerator from "./component/Traffic/TrafficLightGenerator";
import Calendar from "./component/Calendar";
import FileExplorer from "./component/FileExplorer";
import KanbanBoard from "./component/KanbanBoard";
import DragAndDrop from "./component/DragAndDrop";
import MultiLevelDropDown from "./component/MultiLevelDropdown";

const allPages = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "File Explorer",
    path: "/file-explorer",
  },
  {
    title: "Kanban Board",
    path: "/kanban-board",
  },
  {
    title: "Drag And Drop",
    path: "/drag-and-drop",
  },
  {
    title: "Toast",
    path: "/toast",
  },
  {
    title: "Traffic Light Generator",
    path: "/traffic",
  },
  {
    title: "Virtualization",
    path: "/virtual",
  },
  {
    title: "Calendar",
    path: "/calendar",
  },
  {
    title: "Multi Level dropdown",
    path: "/multi-Level-dropdown",
  },
];
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home allPages={allPages} />} />
          <Route path="/file-explorer" element={<FileExplorer />} />
          <Route path="/kanban-board" element={<KanbanBoard />} />
          <Route path="/drag-and-drop" element={<DragAndDrop />} />

          <Route path="/toast" element={<Toast />} />
          <Route path="/traffic" element={<TrafficLightGenerator />} />
          <Route path="/virtual" element={<Virtualization />} />
          <Route
            path="/calendar"
            element={<Calendar month={10} year={2024} />}
          />
          <Route
            path="/multi-Level-dropdown"
            element={<MultiLevelDropDown />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
