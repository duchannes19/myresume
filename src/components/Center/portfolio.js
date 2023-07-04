import React, { useState } from 'react';
import Cipensaele from './projects/cipensaele';
import { Button } from '@mui/material';
import First from '../images/1.png';
import { useTranslation } from 'react-i18next';

function Portfolio() {
    const [showProject, setShowProject] = useState(0);
    const { t } = useTranslation();

    return (
        <div className='info'>
            {showProject === 0 && (
                <>
                    <h3 className='center-title'>Portfolio</h3>
                    <p>{t('portfolio.description')}</p>
                    <div className='projects-container'>
                        <div
                            className='project'
                            style={{ backgroundImage: `url(${First})` }}
                        >
                            <Button className='project-button' color='secondary' variant='outlined' onClick={() => setShowProject(1)}>Cipensaele</Button>
                        </div>
                    </div>
                </>
            )}
            {showProject !== 0 && (
                <Button
                    className='project-button'
                    color='error'
                    variant='outlined'
                    onClick={() => setShowProject(0)}
                    style={{marginTop: '2rem'}}
                >
                    {t('portfolio.backbutton')}
                </Button>
            )}
            {showProject === 1 && <Cipensaele />}
        </div>
    );
}

export default Portfolio;
