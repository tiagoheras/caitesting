import Header from "./Components/Header";
import "./App.css";
import Gallery from "./Components/Gallery";
import Article from "./Components/Article";
import { useState, useEffect } from "react";
import { bucket, supabase } from './utils/supabaseClient';

function App() {
  const [lastUpdated, setLastUpdated] = useState(
    Math.floor(new Date().getTime() / 1000.0)
  );
  const [page, setPage] = useState(true);
  const [session, setSession] = useState(null);
  const [sampleImages, setSampleImages] = useState([]);

  async function fetchImages() {
    const files = await bucket
      .list("imagenes", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      })
      .then((result) =>
        result.error
          ? console.log(result.error)
          : result.data.map((file) => "imagenes/" + file.name)
      );

    const urls = await bucket
      .createSignedUrls(files, 86400)
      .then((result) =>
        result.error
          ? console.log(result.error)
          : result.data.map((asset) => asset.signedUrl)
      );

    setSampleImages(urls);
  }

  useEffect(() => {
    fetchImages();
  }, [lastUpdated]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event);
      setSession(session);
    });
  }, []);

  const handleLastUpdatedChange = (time) => {
    setLastUpdated(time);
  };

  const togglePage = () => {
    setPage(!page);
  };

  return (
    <div className="app bg-slate-100">
      <Header
        session={session}
        handleLastUpdatedChange={handleLastUpdatedChange}
        togglePage={togglePage}
      />
      {page ? (
        <Article lastUpdated={lastUpdated} sampleImages={sampleImages} />
      ) : (
        <Gallery lastUpdated={lastUpdated} sampleImages={sampleImages} />
      )}
    </div>
  );
}

export default App;
