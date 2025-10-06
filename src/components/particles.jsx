import React from "react";
import Particles from "react-particles";
import { loadLinksPreset } from "tsparticles-preset-links";

class ParticlesContainer extends React.PureComponent {
  async customInit(engine) {
    await loadLinksPreset(engine);
  }

  render() {
    const hasWindow = typeof window !== "undefined";
    const hasNavigator = typeof navigator !== "undefined";

    const isMobile = hasWindow ? window.matchMedia("(max-width: 768px)").matches : false;

    const hardwareConcurrency = hasNavigator && typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : Infinity;
    const deviceMemory = hasNavigator && typeof navigator.deviceMemory === "number"
      ? navigator.deviceMemory
      : Infinity;

    const isLowEndDevice = (Number.isFinite(hardwareConcurrency) && hardwareConcurrency <= 4) ||
      (Number.isFinite(deviceMemory) && deviceMemory <= 4);

    if (isMobile && isLowEndDevice) {
      return null;
    }

    const options = {
      preset: "links",
      background: {
        color: "transparent"
      },
      particles: {
        number: {
          value: isMobile ? 8 : 40,
          density: {
            enable: true,
            value_area: isMobile ? 1200 : 800
          }
        },
        links: {
          enable: !isMobile,
          distance: isMobile ? 100 : 150,
          opacity: isMobile ? 0.2 : 0.5
        },
        move: {
          speed: isMobile ? 0.5 : 1
        }
      },
      fpsLimit: isMobile ? 20 : 60,
      detectRetina: !isMobile,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true
    };

    return (
      <Particles
        id="tsparticles"
        init={this.customInit.bind(this)}
        options={options}
      />
    );
  }
}

export default ParticlesContainer;
