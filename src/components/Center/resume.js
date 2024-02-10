import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DownloadIcon from '@mui/icons-material/Download';
import ProgressBar from './progress';
import cv from '../resume/MyCV.pdf'
import { useTranslation, Trans } from 'react-i18next';

function downloadFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
const Resume = () => {
    const { t } = useTranslation();

    const handleDownload = () => {
        downloadFile(cv);
    };

    return (
        <div className='info'>
            <h3 className='center-title'>{t('resume.title')}</h3>

            <Stack direction="row" spacing={2} style={{marginTop: '2rem'}}>
                <Button color='warning' variant="outlined" endIcon={<DownloadIcon />}
                onClick={handleDownload}
                >
                    Download CV
                </Button>
            </Stack>

            <hr style={{marginTop: '3rem', width: '100%'}}/>

            <div className='languages'>
            <h4 style={{fontSize: '1.2rem'}}><b>{t('resume.languages.title')}</b></h4>
            <Trans i18nKey="resume.languages.description" components={{ b: <b /> }} />
            </div>

            <hr style={{marginTop: '1rem', marginBottom: '2rem', width: '100%'}}/>

            <h4 style={{ marginTop: '1rem', fontSize: '1.2rem' }}><b>Skills</b></h4>
            <div className='skills'>
                <div className='skills_sub'>
                    <ProgressBar percentage={70} label='ReactJs' />
                    <ProgressBar percentage={55} label='NodeJS' />
                </div>
                <div className='skills_sub'>
                    <ProgressBar percentage={80} label='PHP' />
                    <ProgressBar percentage={75} label='Javascript' />
                </div>
            </div>

            <div className='skills' style={{ marginTop: '1rem' }}>
                <div className='skills_sub'>
                    <ProgressBar percentage={60} label='Solidity' />
                    <ProgressBar percentage={40} label='C/C++' />
                </div>
                <div className='skills_sub'>
                    <ProgressBar percentage={78} label='CSS' />
                    <ProgressBar percentage={75} label='Python' />
                </div>
            </div>

            <div className='skills' style={{ marginTop: '1rem' }}>
                <div className='skills_sub'>
                    <ProgressBar percentage={55} label='PostgreSQL' />
                    <ProgressBar percentage={50} label='MySQL' />
                </div>
            </div>

            <hr style={{marginTop: '1rem', marginBottom: '1rem', width: '100%'}}/>

            <div className='other'>
            <h4 style={{fontSize: '1.2rem'}}><b>{t('resume.other.title')}</b></h4>
            <Trans i18nKey="resume.other.description" components={{ b: <b /> }} />
            </div>

        </div>
    );

};

export default Resume;