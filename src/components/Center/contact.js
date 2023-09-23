import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
//import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useTranslation, Trans } from 'react-i18next';

function Contacts(){

    const { t } = useTranslation();

    return(
        <div className='info'>
            <h3 className='center-title'>{t('contacts.title')}</h3>
            <div className='contacts'>
                <div className='sub-contact'>
                    <GitHubIcon/>
                    <Trans i18nKey="contacts.social" components={{ b: <b /> }} />
                    <a href='https://github.com/duchannes19' target='_blank' rel='noopener noreferrer' style={{color: 'white'}}><b>Github</b></a> 
                </div>
                <div className='sub-contact'>
                    <InstagramIcon/>
                    <Trans i18nKey="contacts.social" components={{ b: <b /> }} />
                    <a href='https://www.instagram.com/andrimassi/' style={{color: 'white'}}><b>Instagram</b></a>
                </div>
                <div className='sub-contact'>
                    <LinkedInIcon/>
                    <Trans i18nKey="contacts.social" components={{ b: <b /> }} />
                    <a href='https://www.linkedin.com/in/andrea-massignan-4bab3b270/' style={{color: 'white'}}><b>Linkedin</b></a>
                </div>
                <div className='sub-contact'>
                    <EmailIcon/>
                    <Trans i18nKey="contacts.mail" components={{ b: <b /> }} />
                </div>
            </div>
        </div>
    );

};

export default Contacts;