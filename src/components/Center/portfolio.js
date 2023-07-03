import React, { useState } from 'react';
import Cipensaele from './projects/cipensaele';
import { Button } from '@mui/material';
import First from '../images/1.png';

function Portfolio() {
    const [showProject, setShowProject] = useState(0);

    return (
        <div className='info'>
            {showProject === 0 && (
                <>
                    <h3 className='center-title'>Portfolio</h3>
                    <p>Here are some of my projects:</p>
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
                    Indietro
                </Button>
            )}
            {showProject === 1 && <Cipensaele />}
        </div>
    );
}

export default Portfolio;
