import React, { useEffect, useState } from 'react';
import Masonry from 'react-responsive-masonry';
import { bucket, supabase } from '../utils/supabaseClient';
import ImageContainer from './ImageContainer';


function Gallery({ lastUpdated }) {
  const [sampleImages, setSampleImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const files = await bucket
        .list("imagenes", {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        })
        .then(result => result.error ? console.log(result.error) : result.data.map(file => "imagenes/" + file.name))

      const urls = await bucket
        .createSignedUrls(files, 86400)
        .then(result => result.error ? console.log(result.error) : result.data.map(asset => asset.signedUrl));

      setSampleImages(urls)
    }
    fetchImages();
  }, [lastUpdated])

  return (
    <div className='w-2/3 mx-auto'>
      <Masonry columnsCount={2} gutter='15px'>
        {
          sampleImages.map(sampleImage => {
            return (
              <ImageContainer sampleImageUrl={sampleImage} />
            )
          })
        }
      </Masonry>
    </div>
  );
}

export default Gallery;