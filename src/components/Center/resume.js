import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DownloadIcon from '@mui/icons-material/Download';
import ProgressBar from './progress';
import cv from '../resume/MyCV.pdf'
import { useTranslation, Trans} from 'react-i18next';

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

            <div className='languages'>
            <h4><b>{t('resume.languages.title')}</b></h4>
            <Trans i18nKey="resume.languages.description" components={{ b: <b /> }} />
            </div>

            <h4 style={{ marginTop: '1rem' }}><b>Skills</b></h4>
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


            <div className='other'>
            <h4><b>{t('resume.other.title')}</b></h4>
            <Trans i18nKey="resume.other.description" components={{ b: <b /> }} />
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