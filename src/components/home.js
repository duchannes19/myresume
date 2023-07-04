import React, { useState } from 'react'
import Navbar from './navbar';
import ParticlesContainer from './particles';
import Center from './Center/center';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function Homepage() {

    const [center, setCenter] = useState(0);

    return (
        <div>
            <ParticlesContainer />
            <I18nextProvider i18n={i18n}>
                <Navbar setCenter={setCenter} />
                <Center value={center} />
            </I18nextProvider>,
        </div>
    );
};

export default Homepage;