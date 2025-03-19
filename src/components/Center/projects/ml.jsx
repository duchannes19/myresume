import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { GitHub } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Trans } from 'react-i18next';
import homework1 from '../../ml/h1.pdf';
import homework2 from '../../ml/h2.pdf';

function downloadFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function ML() {

    const handleDownload = (hw) => () => {
        if (hw === 1) {
            return downloadFile(homework1);
        } else {
            return downloadFile(homework2);
        }
    }

    return (
        <>
            <h3 className='center-title'>Machine Learning</h3>
            <div className='project-description'>
                <Trans i18nKey="ml.description" components={{ b: <b /> }} />
            </div>
            <h3 className='center-title'>Homework 1</h3>
            <div className='project-description'>
                <Trans i18nKey="ml.firsthw" components={{ b: <b /> }} />
            </div>
            <h3 className='center-title'>Homework 2</h3>
            <div className='project-description'>
                <Trans i18nKey="ml.secondhw" components={{ b: <b /> }} />
            </div>
            <div style={{marginTop: '4rem'}}>
                <Trans i18nKey="ml.d.download" components={{ b: <b /> }} />
            </div>
            <Stack direction="row" spacing={2} style={{ marginTop: '2rem' }}>
                <Button color='warning' variant="outlined" endIcon={<DownloadIcon />}
                    onClick={handleDownload(1)}
                >
                    Homework 1 Download
                </Button>
                <Button color='secondary' variant="outlined" endIcon={<GitHub />}
                    href='https://github.com/duchannes19/Homework-1-2024'
                    target='_blank'
                >
                    GitHub
                </Button>
            </Stack>
            <Stack direction="row" spacing={2} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <Button color='warning' variant="outlined" endIcon={<DownloadIcon />}
                    onClick={handleDownload(2)}
                >
                    Homework 2 Download
                </Button>
                <Button color='secondary' variant="outlined" endIcon={<GitHub />}
                    href='https://github.com/duchannes19/Homework-2'
                    target='_blank'
                >

                    GitHub
                </Button>
            </Stack>
        </>
    );
}

export default ML;
