import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-modal';
import First from '../../images/1.png';
import Second from '../../images/2.png';
import Third from '../../images/3.png';
import { Trans } from 'react-i18next';

function Cipensaele() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openModal = (image) => {
    const width = window.innerWidth;
    if (width < 768) {
      setSelectedImage(image);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <h3 className='center-title'>Ci Pensa Ele</h3>
      <div className='project-description'>
      <Trans i18nKey="cipensaele.description" components={{ b: <b /> }} />
      </div>
      <div className='project-carousel'>
        <ImageGallery
          className='carousel'
          items={images}
          thumbnailPosition='bottom'
          showPlayButton={false}
          showThumbnails={false}
          onClick={(event) => openModal(event.target.src)}
        />
      </div>

      {/* Fullscreen Image Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Fullscreen Image'
        className='fullscreen-image-modal'
        overlayClassName='fullscreen-image-overlay'
        ariaHideApp={false}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt='Fullscreen'
            className='fullscreen-image'
            onClick={closeModal}
          />
        )}
      </Modal>
    </>
  );
}

export default Cipensaele;
