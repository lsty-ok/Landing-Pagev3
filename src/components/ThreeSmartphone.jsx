import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Sparkles, useTexture } from '@react-three/drei'
import { useRef, useEffect, Suspense, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger)

// Import the high-quality phone mockup images as default fallback assets
import homeImgDefault from '../assets/images/Home-Iphone.png'
import loginImgDefault from '../assets/images/Login-Iphone.png'

/**
 * Clean & reusable 3D Smartphone Model component.
 * Features an outer titanium body, golden/lime/blue glowing bezel, and glass screen layer.
 * Standardizes sizes and spacing to ensure PERFECT rendering without text overlap.
 */
function PhoneModel({
  masterRef,
  texture,
  themeColor = '#D4E866',
  coinRef1,
  coinRef2,
  isHero = false,
}) {
  return (
    <group ref={masterRef}>
      {/* Outer Titanium Frame (Sleek Slate Dark Gray) */}
      <RoundedBox args={[3.0, 6.0, 0.2]} radius={0.35} smoothness={6}>
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={2.0}
        />
      </RoundedBox>

      {/* Bezel Glow Outline (matching the theme color) */}
      <RoundedBox args={[2.84, 5.84, 0.21]} radius={0.3} smoothness={6}>
        <meshStandardMaterial
          color={themeColor}
          metalness={0.8}
          roughness={0.15}
          emissive={themeColor}
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Screen Glass Layer (Behind textures for realistic refraction & high gloss) */}
      <RoundedBox
        args={[2.8, 5.8, 0.02]}
        radius={0.28}
        smoothness={6}
        position={[0, 0, 0.1]}
      >
        <meshStandardMaterial
          color="#080C14"
          roughness={0.06}
          metalness={0.95}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* Dynamic Island Pill Shape */}
      <mesh position={[0, 2.5, 0.115]}>
        <boxGeometry args={[0.8, 0.18, 0.01]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* ================= SCREEN MOCKUP TEXTURE LAYER ================= */}
      {/* 
        Using planeGeometry for mockup texture mapping because planes have perfect [0,1] UV coordinates.
        This guarantees crisp rendering without black borders or z-fighting.
        To prevent screen tearing, the screen is nested directly inside the same master group!
      */}
      <mesh position={[0, 0, 0.111]}>
        <planeGeometry args={[2.76, 5.76]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          opacity={1.0}
          toneMapped={false}
          depthWrite={true}
        />
      </mesh>

      {/* ================= SPATIAL 3D GRAPHIC PARTICLES (COINS) ================= */}
      {isHero && (
        <>
          {/* Floating Coin 1 (Gold/Lime Top Left) */}
          <group ref={coinRef1} position={[-2.1, 1.3, 0.4]}>
            <mesh rotation={[Math.PI / 2, 0.2, 0.3]}>
              <cylinderGeometry args={[0.26, 0.26, 0.05, 24]} />
              <meshStandardMaterial
                color="#D4E866"
                emissive="#D4E866"
                emissiveIntensity={0.15}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* Floating Coin 2 (Blue Bottom Right) */}
          <group ref={coinRef2} position={[2.0, -1.4, 0.4]}>
            <mesh rotation={[Math.PI / 2, -0.4, 0.1]}>
              <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
              <meshStandardMaterial
                color="#60A5FA"
                emissive="#60A5FA"
                emissiveIntensity={0.1}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        </>
      )}
    </group>
  )
}

/**
 * Content container for handling textures, animations, and cameras per Canvas.
 */
function ThreeSmartphoneContent({
  variant,
  texturePath,
  secondaryTexturePath,
  themeColor,
}) {
  const { gl } = useThree()

  // Master group refs for idle animation (sway, breathe, hover)
  const masterGroupRef1 = useRef()
  const masterGroupRef2 = useRef()

  // Layout refs for GSAP ScrollTrigger entry animations
  const phoneRef1 = useRef()
  const phoneRef2 = useRef()

  // Floating decoration refs
  const coinRef1 = useRef()
  const coinRef2 = useRef()

  // Mouse move reference (for mouse tracking interactive sway)
  const mouse = useRef({ x: 0, y: 0 })

  // Determine isMobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load the texture maps safely
  const tex1 = useTexture(texturePath || homeImgDefault)
  const tex2 = useTexture(secondaryTexturePath || loginImgDefault)

  // Align textures with SRGB space on mount and trigger update
  useEffect(() => {
    [tex1, tex2].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.minFilter = THREE.LinearFilter
      t.magFilter = THREE.LinearFilter
      t.generateMipmaps = false
      t.needsUpdate = true
    })
  }, [tex1, tex2])

  // Mouse capture
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animate elements continuously ("Diam masih beranimasi")
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // 1. Phone A (Main Phone) organic floating & mouse sway
    if (masterGroupRef1.current) {
      const waveX = Math.sin(time * 0.7) * 0.04
      const waveY = Math.cos(time * 0.7) * 0.04
      const waveZ = Math.sin(time * 0.4) * 0.015

      // Foreground responds more intensely to mouse movement for depth feeling
      const targetRotX = mouse.current.y * 0.24 + waveX
      const targetRotY = mouse.current.x * 0.24 + waveY
      const targetRotZ = waveZ

      masterGroupRef1.current.rotation.x += (targetRotX - masterGroupRef1.current.rotation.x) * 0.07
      masterGroupRef1.current.rotation.y += (targetRotY - masterGroupRef1.current.rotation.y) * 0.07
      masterGroupRef1.current.rotation.z += (targetRotZ - masterGroupRef1.current.rotation.z) * 0.07

      // Floating vertical bobbing
      masterGroupRef1.current.position.y = Math.sin(time * 1.3) * 0.12
    }

    // 2. Phone B (Secondary Phone - only in Hero Section) organic floating & mouse sway (Offset Phase)
    if (variant === 'hero-double' && masterGroupRef2.current) {
      const waveX2 = Math.sin(time * 0.6 + 1.5) * 0.05
      const waveY2 = Math.cos(time * 0.6 + 1.5) * 0.05
      const waveZ2 = Math.sin(time * 0.3 + 1.0) * 0.02

      // Background responds more subtly to mouse (creates parallax depth)
      const targetRotX2 = mouse.current.y * 0.14 + waveX2
      const targetRotY2 = mouse.current.x * 0.14 + waveY2
      const targetRotZ2 = waveZ2

      masterGroupRef2.current.rotation.x += (targetRotX2 - masterGroupRef2.current.rotation.x) * 0.07
      masterGroupRef2.current.rotation.y += (targetRotY2 - masterGroupRef2.current.rotation.y) * 0.07
      masterGroupRef2.current.rotation.z += (targetRotZ2 - masterGroupRef2.current.rotation.z) * 0.07

      // Floating bobbing in opposite phase
      masterGroupRef2.current.position.y = Math.cos(time * 1.1 + 0.5) * 0.1
    }

    // 3. Spin & bob decorative floating coins
    if (coinRef1.current) {
      coinRef1.current.rotation.y += 0.012
      coinRef1.current.position.y = 1.3 + Math.sin(time * 1.3) * 0.1
    }
    if (coinRef2.current) {
      coinRef2.current.rotation.y -= 0.015
      coinRef2.current.position.y = -1.4 + Math.cos(time * 1.5) * 0.08
    }
  })

  // Synchronize layout position and entry/scroll animations locally
  useEffect(() => {
    const parentContainer = gl.domElement.parentElement
    if (!parentContainer) return

    const scaleVal = isMobile ? 0.72 : 0.95

    if (variant === 'hero-double') {
      // ---------------- HERO DOUBLE PHONE MOUNT ANIMATIONS ----------------
      // Explicitly set initial coordinates
      const phone1X = isMobile ? 0 : -0.85
      const phone1Y = isMobile ? 0.3 : 0
      const phone1Z = 0

      const phone2X = isMobile ? 0.3 : 0.85
      const phone2Y = isMobile ? -0.8 : -0.5
      const phone2Z = -0.7

      // Position Phone 1 (Foreground / Home)
      gsap.set(phoneRef1.current.position, { x: phone1X, y: phone1Y, z: phone1Z })
      gsap.set(phoneRef1.current.rotation, { x: 0.12, y: 0.35, z: -0.05 })
      gsap.set(phoneRef1.current.scale, { x: 0, y: 0, z: 0 })

      // Position Phone 2 (Background / Login)
      gsap.set(phoneRef2.current.position, { x: phone2X, y: phone2Y, z: phone2Z })
      gsap.set(phoneRef2.current.rotation, { x: -0.1, y: -0.35, z: 0.05 })
      gsap.set(phoneRef2.current.scale, { x: 0, y: 0, z: 0 })

      // Mount intro animation
      gsap.to(phoneRef1.current.scale, {
        x: scaleVal,
        y: scaleVal,
        z: scaleVal,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.2,
      })

      gsap.to(phoneRef2.current.scale, {
        x: scaleVal * 0.88,
        y: scaleVal * 0.88,
        z: scaleVal * 0.88,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.4,
      })
    } else {
      // ---------------- SINGLE PHONE ENTRY FLIP ANIMATIONS ----------------
      // Position Phone
      gsap.set(phoneRef1.current.position, { x: 0, y: 0, z: 0 })
      gsap.set(phoneRef1.current.rotation, { x: 0.3, y: 1.2, z: 0.1 })
      gsap.set(phoneRef1.current.scale, { x: 0.1, y: 0.1, z: 0.1 })

      // Create local ScrollTrigger for this canvas container
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: parentContainer,
          start: 'top 85%', // Trigger when the canvas top is 85% from the top of the viewport
          toggleActions: 'play none none none',
          once: true,
        }
      })

      introTl.to(phoneRef1.current.scale, {
        x: scaleVal,
        y: scaleVal,
        z: scaleVal,
        duration: 1.4,
        ease: 'power3.out',
      }, 0)
      .to(phoneRef1.current.rotation, {
        x: 0.05,
        y: 0.0,
        z: 0.0,
        duration: 1.6,
        ease: 'power3.out',
      }, 0)
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === parentContainer) {
          trigger.kill()
        }
      })
    }
  }, [variant, isMobile, gl])

  return (
    <>
      {/* 1. PHONE A / MAIN PHONE (Visible in both Hero and Feature sections) */}
      <group ref={phoneRef1}>
        <PhoneModel
          masterRef={masterGroupRef1}
          texture={tex1}
          themeColor={themeColor}
          coinRef1={coinRef1}
          coinRef2={coinRef2}
          isHero={variant === 'hero-double'}
        />
      </group>

      {/* 2. PHONE B / SECONDARY PHONE (Only visible in Hero stack displaying login texture) */}
      {variant === 'hero-double' && (
        <group ref={phoneRef2}>
          <PhoneModel
            masterRef={masterGroupRef2}
            texture={tex2}
            themeColor={themeColor}
            isHero={false}
          />
        </group>
      )}
    </>
  )
}

/**
 * Reusable Canvas Wrapper Component.
 * Can be dropped into any HTML column layout perfectly.
 * Uses high-performance rendering settings and premium background sparkles.
 */
export default function ThreeSmartphoneCanvas({
  variant = 'single',
  texturePath,
  secondaryTexturePath,
  themeColor = '#D4E866',
}) {
  return (
    <div className="w-full h-full relative overflow-visible canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8.0], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]} // Performance optimized DPR
        className="w-full h-full"
      >
        <ambientLight intensity={0.65} />
        
        {/* Futuristic Studio Lighting */}
        <directionalLight position={[8, 8, 8]} intensity={1.5} />
        <directionalLight position={[-8, 4, -4]} intensity={0.4} />
        <pointLight position={[0, 0, 4]} intensity={0.6} color={themeColor} />
        <pointLight position={[3, -3, 2]} intensity={0.8} color={themeColor === '#D4E866' ? '#60A5FA' : '#D4E866'} />
        <spotLight position={[0, 6, 3]} angle={0.3} penumbra={1} intensity={1.0} color="#FFFFFF" />

        {/* Ambient surrounding space sparkles to give a beautiful high-fidelity feeling */}
        <Sparkles
          count={variant === 'hero-double' ? 35 : 20}
          scale={7}
          size={1.6}
          speed={0.3}
          color={themeColor}
          opacity={0.6}
        />
        
        {variant === 'hero-double' && (
          <Sparkles
            count={25}
            scale={6}
            size={2.0}
            speed={0.25}
            color="#60A5FA"
            opacity={0.5}
          />
        )}

        {/* Secure Texture Loading with Suspense Fallback */}
        <Suspense fallback={null}>
          <ThreeSmartphoneContent
            variant={variant}
            texturePath={texturePath}
            secondaryTexturePath={secondaryTexturePath}
            themeColor={themeColor}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
