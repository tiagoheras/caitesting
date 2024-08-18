import React from 'react';
import Masonry from 'react-responsive-masonry';
import ImageContainer from './ImageContainer';


function Gallery({ lastUpdated, sampleImages }) {
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