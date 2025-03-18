import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import First from '../images/1.png';
import Second from '../images/d1.png';
import Third from '../images/fourever1.png';
import Fourth from '../images/angel1.png';
import Fifth from '../images/psegment1.png';

import Cipensaele from './projects/cipensaele';
import Dohr from './projects/dohr';
import FourEver from './projects/fourever';
import Angel from './projects/angel';
import PSegment from './projects/psegment';

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
                        <div className='project' style={{ backgroundImage: `url(${Fourth})` }}>
                            <Button className='project-button' color='secondary' variant='outlined' onClick={() => setShowProject(4)}>Angel</Button>
                        </div>
                        <div className='project' style={{ backgroundImage: `url(${Fifth})` }}>
                            <Button className='project-button' color='secondary' variant='outlined' onClick={() => setShowProject(5)}>P-Segmentation</Button>
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
            {showProject === 4 && <Angel />}
            {showProject === 5 && <PSegment />}
        </div>
    );
}

export default Portfolio;
