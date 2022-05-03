import './App.css';
import FreehandContextProvider from './api/FreehandContext';
import FreehandDrawing from './pages/FreehandDrawing';
import Sidebar from './components/Sidebar';

function App() {
  return (  
      <FreehandContextProvider>
        <div className="App">
          <FreehandDrawing />
        </div>
      </FreehandContextProvider>
  );
}

export default App;
