import React from "react";
import Particles from "react-particles";
import { loadLinksPreset } from "tsparticles-preset-links";
import background from './background/wallpaper.jpg'

class ParticlesContainer extends React.PureComponent {
  async customInit(engine) {
    await loadLinksPreset(engine);
  }

  render() {
    const options = {
      preset: "links",
      background: {
        color: 'transparent'
            }
    };

    return <Particles options={options} init={this.customInit.bind(this)} />;
  }
}

export default ParticlesContainer;
