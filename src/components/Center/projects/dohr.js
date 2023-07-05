import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-modal';
import First from '../../images/d1.png';
import Second from '../../images/d2.png';
import Third from '../../images/d3.png';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTranslation, Trans } from 'react-i18next';
import english from '../../dohr/Dohr_en.pdf';
import italian from '../../dohr/Dohr_it.pdf';

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
    const { t, i18n } = useTranslation();

    const handleDownload = () => {
        if(i18n.language === 'en'){return downloadFile(english);}
        else{return downloadFile(italian);}
    };

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
            <h3 className='center-title'>Dohr</h3>
            <div className='project-description'>
                <Trans i18nKey="dohr.description" components={{ b: <b /> }} />
            </div>
            <div style={{marginTop: '2rem'}}>
                {t("dohr.d.download")}
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

export default Dohr;
