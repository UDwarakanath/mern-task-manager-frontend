
import './App.css';
import TaskList from './components/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <TaskList/>
      <ToastContainer/>
    </div>
  );
}

export default App;
