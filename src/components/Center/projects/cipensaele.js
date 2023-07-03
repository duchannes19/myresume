import React from 'react';
import ImageGallery from 'react-image-gallery';
import First from '../../images/1.png'
import Second from '../../images/2.png'
import Third from '../../images/3.png'

function Cipensaele() {
  const images = [
    {
      original: First,
      thumbnail: First,
      originalWidth: '10rem',
      thumbnailWidth: '20px',
    },
    {
      original: Second,
      thumbnail: Second,
      originalWidth: '10rem',
      thumbnailWidth: '20px',
    },
    {
      original: Third,
      thumbnail: Third,
      originalWidth: '10rem',
      thumbnailWidth: '20px',
    },
  ];


  return (
    <>
    <h3 className='center-title'>Ci Pensa Ele</h3>
    <div className='project-carousel'>
      <ImageGallery items={images} thumbnailPosition="bottom" 
      showFullscreenButton={false}
      showPlayButton={false}
      />
    </div>
    </>
  );
}

export default Cipensaele;
