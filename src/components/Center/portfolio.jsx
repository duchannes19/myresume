import React, { useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ResponsiveImage from '../ResponsiveImage';
import { projectCardMedia } from './projectCardMedia';

import Cipensaele from './projects/cipensaele';
import Dohr from './projects/dohr';
import FourEver from './projects/fourever';
import Angel from './projects/angel';
import PSegment from './projects/psegment';
import IoT from './projects/iot';
import ML from './projects/ml';

function Portfolio() {
    const [showProject, setShowProject] = useState(0);
    const { t } = useTranslation();

    const cards = useMemo(() => ([
        {
            id: 1,
            label: 'Cipensaele',
            media: projectCardMedia.cipensaele,
        },
        {
            id: 2,
            label: 'Dohr',
            media: projectCardMedia.dohr,
        },
        {
            id: 3,
            label: '4Ever',
            media: projectCardMedia.fourever,
        },
        {
            id: 4,
            label: 'Angel',
            media: projectCardMedia.angel,
        },
        {
            id: 5,
            label: 'P-Segmentation',
            media: projectCardMedia.psegment,
        },
        {
            id: 6,
            label: 'IoT',
            media: projectCardMedia.iot,
        },
        {
            id: 7,
            label: 'Machine Learning',
            media: projectCardMedia.ml,
        },
    ]), []);

    return (
        <div className='info'>
            {showProject === 0 && (
                <>
                    <h3 className='center-title'>Portfolio</h3>
                    <p>{t('portfolio.description')}</p>
                    <div className='projects-container'>
                        {cards.map((card) => (
                            <div className='project' key={card.id}>
                                <ResponsiveImage
                                    data={card.media.picture}
                                    placeholder={card.media.placeholder}
                                    alt={card.media.alt}
                                    sizes='(min-width: 1280px) 320px, (min-width: 768px) 45vw, 85vw'
                                />
                                <Button
                                    className='project-button'
                                    color='secondary'
                                    variant='outlined'
                                    onClick={() => setShowProject(card.id)}
                                    aria-label={`Open ${card.label} project`}
                                >
                                    {card.label}
                                </Button>
                            </div>
                        ))}
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
            {showProject === 6 && <IoT />}
            {showProject === 7 && <ML />}
        </div>
    );
}

export default Portfolio;
