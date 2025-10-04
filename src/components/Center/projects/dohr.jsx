import React, { useMemo, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-modal';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTranslation, Trans } from 'react-i18next';
import english from '../../dohr/Dohr_en.pdf';
import italian from '../../dohr/Dohr_it.pdf';
import { projectGalleries } from '../projectMedia';
import { getOptimizedImageUrl } from '../../../utils/image';

function downloadFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function Dohr() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { i18n } = useTranslation();

    const handleDownload = () => {
        if(i18n.language === 'en'){return downloadFile(english);}
        else{return downloadFile(italian);}
    };

    const images = useMemo(() => (
    projectGalleries.dohr.gallery.map(({ large, thumb, alt }) => ({
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
            <h3 className='center-title'>Dohr</h3>
            <div className='project-description'>
                <Trans i18nKey="dohr.description" components={{ b: <b /> }} />
            </div>
            <div style={{marginTop: '2rem'}}>
                <Trans i18nKey="dohr.d.download" components={{ b: <b /> }} />
            </div>
            <Stack direction="row" spacing={2} style={{ marginTop: '2rem' }}>
                <Button color='warning' variant="outlined" endIcon={<DownloadIcon />}
                    onClick={handleDownload}
                >
                    Download
                </Button>
            </Stack>
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

export default Dohr;
