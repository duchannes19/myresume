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
        color: "transparent"
      },
      particles: {
        number: {
          value: 80, // Default number of particles
          density: {
            enable: true,
            value_area: 800 // Default density value
          }
        }
      }
    };

    // Apply media query to adjust particle number
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    if (mediaQuery.matches) {
      // Set lowest number of particles for small screens
      options.particles.number.value = 40;
    }

    return <Particles options={options} init={this.customInit.bind(this)} />;
  }
}

export default ParticlesContainer;
