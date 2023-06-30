import React from "react";
import Particles from "react-particles";
import { loadLinksPreset } from "tsparticles-preset-links";

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
