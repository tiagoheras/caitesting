import Header from './Components/Header';
import './App.css';
import Gallery from './Components/Gallery';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';

function App() {
  const [lastUpdated, setLastUpdated] = useState(Math.floor(new Date().getTime() / 1000.0))
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event)
      setSession(session)
    })
  }, [])

  const handleLastUpdatedChange = (time) => {
    setLastUpdated(time);
  }
  return (
    <div className="app bg-slate-100">
      <Header session={session} handleLastUpdatedChange={handleLastUpdatedChange} />
      <Gallery lastUpdated={lastUpdated} />
    </div>
  );
}

export default App;
