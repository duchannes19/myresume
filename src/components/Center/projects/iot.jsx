import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-modal';
import First from '../../images/iot1.png';
import DownloadIcon from '@mui/icons-material/Download';
import { GitHub } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Trans } from 'react-i18next';
import english from '../../iot/iot.pdf';

function downloadFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function IoT() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleDownload = () => {
        return downloadFile(english);
    };

    const images = [
        {
            original: First,
            thumbnail: First,
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
            <h3 className='center-title'>IoT</h3>
            <div className='project-description'>
                <Trans i18nKey="iot.description" components={{ b: <b /> }} />
            </div>
            <div style={{marginTop: '2rem'}}>
                <Trans i18nKey="iot.d.download" components={{ b: <b /> }} />
            </div>
            <Stack direction="row" spacing={2} style={{ marginTop: '2rem' }}>
                <Button color='warning' variant="outlined" endIcon={<DownloadIcon />}
                    onClick={handleDownload}
                >
                    Download
                </Button>
                <Button color='secondary' variant="outlined" endIcon={<GitHub />}
                    href='https://github.com/duchannes19/iotproject'
                    target='_blank'
                >
                    GitHub
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

export default IoT;
