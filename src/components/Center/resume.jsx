import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DownloadIcon from '@mui/icons-material/Download';
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

const SkillCategory = ({ title, skills }) => (
    <div className="skill-category">
        <h5 className="skill-category-title">{title}</h5>
        <div className="skill-tags">
            {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
            ))}
        </div>
    </div>
);

const Resume = () => {
    const { t } = useTranslation();

    const handleDownload = () => {
        downloadFile(cv);
    };

    const skillCategories = [
        {
            title: 'Frontend',
            skills: ['React', 'React Native', 'JavaScript', 'HTML5', 'CSS3', 'Vite.js']
        },
        {
            title: 'Backend',
            skills: ['Node.js', 'PHP', 'Python', 'Flask', 'Express', 'REST APIs']
        },
        {
            title: 'AI & Machine Learning',
            skills: ['TensorFlow', 'PyTorch', 'CNN', 'U-Net', 'Computer Vision']
        },
        {
            title: 'Blockchain',
            skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3', 'DApps']
        },
        {
            title: 'Databases',
            skills: ['PostgreSQL', 'MySQL']
        },
        {
            title: 'IoT & Embedded',
            skills: ['ROS', 'Gazebo', 'ESP32', 'Arduino']
        },
        {
            title: 'Tools',
            skills: ['Git', 'Docker', 'Photoshop', 'Premiere Pro', 'Audition']
        }
    ];

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
            
            <div className="skills-container">
                {skillCategories.map((category, index) => (
                    <SkillCategory 
                        key={index} 
                        title={category.title} 
                        skills={category.skills} 
                    />
                ))}
            </div>

            <hr style={{marginTop: '2rem', marginBottom: '1rem', width: '100%'}}/>

            <div className='other'>
            <h4 style={{fontSize: '1.2rem'}}><b>{t('resume.other.title')}</b></h4>
            <Trans i18nKey="resume.other.description" components={{ b: <b /> }} />
            </div>

        </div>
    );

};

export default Resume;