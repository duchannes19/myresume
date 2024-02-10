import React, { useState } from 'react';
import Cipensaele from './projects/cipensaele';
import { Button } from '@mui/material';
import First from '../images/1.png';
import Second from '../images/d1.png';
import Third from '../images/fourever1.png';
import { useTranslation } from 'react-i18next';
import Dohr from './projects/dohr';
import FourEver from './projects/fourever';

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
                        <div
                            className='project'
                            style={{ backgroundImage: `url(${Second})` }}
                        >
                            <Button className='project-button' color='secondary' variant='outlined' onClick={() => setShowProject(2)}>Dohr</Button>
                        </div>
                        <div className='project' style={{ backgroundImage: `url(${Third})` }}>
                            <Button className='project-button' color='secondary' variant='outlined' onClick={() => setShowProject(3)}>4Ever</Button>
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
            {showProject === 2 && <Dohr />}
            {showProject === 3 && <FourEver />}
        </div>
    );
}

export default Portfolio;
