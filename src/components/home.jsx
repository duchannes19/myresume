import React, { useEffect, useState } from 'react'
import Navbar from './navbar';
import ParticlesContainer from './particles';
import Center from './Center/center';
import { preloadSection } from './Center/sectionRegistry';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Copyright } from './copyright';

function Homepage() {

    const [center, setCenter] = useState(0);

    useEffect(() => {
        preloadSection(0);
    }, []);

    const handleSectionChange = (value) => {
        setCenter(value);
        preloadSection(value);
    };

    return (
        <div>
            <ParticlesContainer />
            <I18nextProvider i18n={i18n}>
                <Navbar setCenter={handleSectionChange} preloadSection={preloadSection} />
                <Center value={center} />
            </I18nextProvider>

            <Copyright />
        </div>
    );
};

export default Homepage;