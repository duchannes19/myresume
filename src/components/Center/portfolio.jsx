import React, { useEffect, useMemo, useState } from 'react';
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
import GymTracker from './projects/hiwc';
import AudioRestoration from './projects/deepl';

function Portfolio() {
  const [showProject, setShowProject] = useState(0);
  const { t } = useTranslation();

  const handleProjectSelect = (projectId) => {
    setShowProject(projectId);
  };

  const handleBack = () => {
    setShowProject(0);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.scrollTo !== 'function') {
      return;
    }

    // Use rAF + setTimeout to ensure DOM is painted and heights are final
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    });
  }, [showProject]);

  const cards = useMemo(
    () => [
      { id: 1, label: 'Cipensaele', media: projectCardMedia.cipensaele },
      { id: 2, label: 'Dohr', media: projectCardMedia.dohr },
      { id: 3, label: '4Ever', media: projectCardMedia.fourever },
      { id: 4, label: 'Angel', media: projectCardMedia.angel },
      { id: 5, label: 'P-Segmentation', media: projectCardMedia.psegment },
      { id: 6, label: 'IoT', media: projectCardMedia.iot },
      { id: 7, label: 'Machine Learning', media: projectCardMedia.ml },
      { id: 8, label: 'Gym Tracker', media: projectCardMedia.gymtracker },
      { id: 9, label: 'Audio Restoration', media: projectCardMedia.deepl },
    ],
    []
  );

  return (
    <div className="info">
      {showProject === 0 && (
        <>
          <h3 className="center-title">Portfolio</h3>
          <p>{t('portfolio.description')}</p>
          <div className="projects-container">
            {cards.map((card) => (
              <div className="project" key={card.id}>
                <ResponsiveImage
                  data={card.media.picture}
                  placeholder={card.media.placeholder}
                  alt={card.media.alt}
                  sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 85vw"
                />
                <Button
                  className="project-button"
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleProjectSelect(card.id)}
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
          className="project-button"
          color="error"
          variant="outlined"
          onClick={handleBack}
          style={{ marginTop: '2rem' }}
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
      {showProject === 8 && <GymTracker />}
      {showProject === 9 && <AudioRestoration />}
    </div>
  );
}

export default Portfolio;