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
import CommentContainer from "./component/comment";
import ModalContainer from "./component/Modal/ModalContainer";
import BoxContainer from "./component/Box/BoxContainer";

const PageRoutes = [
  {
    title: "File Explorer",
    path: "/file-explorer",
    component: FileExplorer,
  },
  {
    title: "Kanban Board",
    path: "/kanban-board",
    component: KanbanBoard,
  },
  {
    title: "Drag And Drop",
    path: "/drag-and-drop",
    component: DragAndDrop,
  },
  {
    title: "Toast",
    path: "/toast",
    component: Toast,
  },
  {
    title: "Traffic Light Generator",
    path: "/traffic",
    component: TrafficLightGenerator,
  },
  {
    title: "Virtualization",
    path: "/virtual",
    component: Virtualization,
  },
  {
    title: "Calendar",
    path: "/calendar",
    component: Calendar,
  },
  {
    title: "Multi Level dropdown",
    path: "/multi-Level-dropdown",
    component: MultiLevelDropDown,
  },
  {
    title: "Nested Comment",
    path: "/comment",
    component: CommentContainer,
  },
  {
    title: "Modal",
    path: "/modal",
    component: ModalContainer,
  },
  {
    title: "Box",
    path: "/box",
    component: BoxContainer,
  },
];
function App() {
  return (
    <main className="min-w-full flex justify-center p-20">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home PageRoutes={PageRoutes} />} />

            {PageRoutes.map((page) => (
              <Route
                key={page.title}
                path={page.path}
                element={<page.component />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
