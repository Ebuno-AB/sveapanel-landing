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
          particles: {
            color: {
              value: ["#FFF"],
            },
            move: {
              direction: "top",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 100,
              },
              value: 20,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 6},
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default ParticlesComponent 