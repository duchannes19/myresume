import React, { useMemo, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-modal';
import { Trans } from 'react-i18next';

import { projectGalleries } from '../projectMedia';
import { getOptimizedImageUrl } from '../../../utils/image';

function Cipensaele() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = useMemo(() => (
  projectGalleries.cipensaele.gallery.map(({ large, thumb, alt }) => ({
      original: getOptimizedImageUrl(large.src, large.width),
      thumbnail: thumb.src,
      originalAlt: alt,
      thumbnailAlt: alt,
      originalHeight: large.height,
      originalWidth: large.width,
      thumbnailHeight: thumb.height,
      thumbnailWidth: thumb.width,
      loading: 'lazy',
      srcSet: large.srcset,
      sizes: '(min-width: 1024px) 60vw, 90vw',
    }))
  ), []);

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
          additionalClass='project-gallery'
          onClick={(event) => openModal(event?.target?.currentSrc ?? event?.target?.src)}
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
