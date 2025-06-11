import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/taskDetails"
// import NavBar from './components/NavBar';
import NavBar from './components/NavBar'
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path='/task/:id' element={<TaskDetails/>}/>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
