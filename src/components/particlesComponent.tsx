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
      height: '100%'
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
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                particles_nb: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: {
              enable: true,
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
                area: 800,
              },
              value: 30,
            },
            opacity: {
              value: 0.6,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false,
              },
            },
            shape: {
              type: ["circle", "star", "triangle"],
            },
            size: {
              value: { min: 1, max: 8 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                color: "#FFD700",
                frequency: 0.05,
                opacity: 1,
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