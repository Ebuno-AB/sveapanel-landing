import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

interface ParticlesProps {
  id?: string
  className?: string
}

const ParticlesComponent = ({ id = "night-sky", className = "absolute inset-0" }: ParticlesProps) => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {
    console.log('Particles loaded successfully')
  }, [])

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0,
      bottom: 0,
      zIndex: 0,
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(85, 183, 126, 0.1) 0%, rgba(168, 255, 197, 0.05) 50%, rgba(35, 72, 30, 0.08) 100%)',
      backgroundSize: '400px 400px',
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(168, 255, 197, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(85, 183, 126, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)
      `
    }}>
      <Particles
        id={id}
        init={particlesInit}
        loaded={particlesLoaded}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ["#55b77e", "#a8ffc5", "#23481e", "#ffffff", "#10b981"],
            },
            move: {
              direction: "top",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: { min: 0.3, max: 1.9 },
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 100,
              },
              value: 35,
            },
            opacity: {
              value: { min: 0.2, max: 0.6 },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              },
            },
            shape: {
              type: ["circle", "star"],
            },
            size: {
              value: { min: 1, max: 8},
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                color: "#a8ffc5",
                frequency: 0.05,
                opacity: 1,
              },
            },
            life: {
              duration: {
                sync: false,
                value: 20,
              },
              count: 1,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default ParticlesComponent 