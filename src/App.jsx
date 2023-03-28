import Header from './Components/Header';
import './App.css';
import Gallery from './Components/Gallery';
import { useState } from 'react';

function App() {
  const [lastUpdated, setLastUpdated] = useState(Math.floor(new Date().getTime() / 1000.0))
  const handleLastUpdatedChange = (time) => {
      setLastUpdated(time);
  }
  return (
    <div className="app bg-slate-100">
      <Header handleLastUpdatedChange={handleLastUpdatedChange} />
      <Gallery lastUpdated={lastUpdated} />
    </div>
  );
}

export default App;
