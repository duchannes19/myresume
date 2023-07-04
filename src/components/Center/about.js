import React from 'react'
import pc from '../images/about.gif'
import { useTranslation, Trans} from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (<div className='info'>
        <h3 className='center-title'>{t('about.title')}</h3>
        <>
        <Trans i18nKey="about.description" components={{ b: <b /> }} />

        <img src={pc} alt='about' className='about-gif' loading="lazy"/>
        </>
    </div>);
};

export default About;