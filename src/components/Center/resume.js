import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DownloadIcon from '@mui/icons-material/Download';
import ProgressBar from './progress';
import cv from '../resume/MyCV.pdf'

function downloadFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
const Resume = () => {

    const handleDownload = () => {
        downloadFile(cv);
    };

    return (
        <div className='info'>
            <h4>My Resume</h4>
            <p style={{ marginTop: '1rem' }}>You can have a look at my resume.</p>

            <div className='skills'>
                <div className='skills_sub'>
                    <ProgressBar percentage={75} label='React' />
                    <ProgressBar percentage={55} label='NodeJS' />
                </div>
                <div className='skills_sub'>
                    <ProgressBar percentage={80} label='PHP' />
                    <ProgressBar percentage={65} label='Javascript' />
                </div>
            </div>

            <div className='skills' style={{ marginTop: '1rem' }}>
                <div className='skills_sub'>
                    <ProgressBar percentage={95} label='HTML' />
                    <ProgressBar percentage={40} label='C/C++' />
                </div>
                <div className='skills_sub'>
                    <ProgressBar percentage={78} label='CSS' />
                    <ProgressBar percentage={55} label='Python' />
                </div>
            </div>

            <Stack direction="row" spacing={2}>
                <Button color='warning' variant="outlined" endIcon={<DownloadIcon />}
                onClick={handleDownload}
                >
                    Download
                </Button>
            </Stack>
        </div>
    );

};

export default Resume;