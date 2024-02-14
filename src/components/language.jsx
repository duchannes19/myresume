import React from 'react'
import Flag from 'react-flagkit';

function Language({selectedLanguage}) {

    return (
        <>
            {selectedLanguage === 'en' && <Flag country="GB" />}
            {selectedLanguage === 'it' && <Flag country='IT' />}
        </>
    );

};

export default Language;