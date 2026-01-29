"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Stars, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

// Special Valentine's Day message for February 14th
const valentinesMessage = "My Beautiful Joy, Happy Valentine's Day 💋 Today, I want to tell you something that sets my soul on fire: I crave you. Not just your touch, though every moment in your arms feels like heaven. I crave the intimate connection we share—the way our souls intertwine, the electricity that flows between us when we're close. The way you look at me sends shivers down my spine. Our intimate moments together are my sanctuary, where the world fades away and it's just us, lost in each other. I love the passion we share, the way our bodies speak a language only we understand. The vulnerability, the trust, the raw desire—it's intoxicating. You ignite something in me that I've never felt before. Every whisper, every touch, every stolen glance—I cherish it all. I love our intimate vibes, the magnetic pull between us that makes my heart race even after all this time. You're not just my love, you're my desire, my fantasy, my reality all wrapped into one perfect being. Tonight and every night, I want to show you just how deeply I need you, how completely you captivate me. Forever yours, body and soul. - Benjamin 🌹💕"

// Special monthly anniversary message for the 30th of each month
const anniversaryMessage = "My Dearest Joy, Happy Monthly Anniversary! 💕 Today marks another beautiful month of us, and my heart overflows with gratitude. Thank you for choosing me. Thank you for loving me when I didn't feel lovable. Thank you for seeing the best in me even when I couldn't see it myself. Every day with you is a blessing I never take for granted. You didn't have to love me, but you chose to. You didn't have to stay, but you chose to build a life with me. That choice—your choice to love me—has transformed my entire world. You are my greatest treasure, my answered prayer, my home. I am endlessly grateful that you said yes to this journey with me. I love you more with each passing month, and I promise to spend the rest of my life showing you just how much you mean to me. Thank you for being mine. Thank you for letting me be yours. Forever grateful, forever yours. - Benjamin 💖"

// Daily love messages - heartfelt and touching
const loveMessages = [
  "Joy, when I look at you, I don't just see the woman I love. I see my purpose, my reason for being. You've become the center of my universe, and I wouldn't have it any other way. Every breath I take is for you.",
  "There are moments when I'm simply awestruck by you. Not just your beauty, but the kindness in your heart, the strength in your spirit. You've changed me profoundly. You've made me believe in forever. I love you more than life itself.",
  "If I could describe what you mean to me in one moment, it would be this: the peace I feel when you're beside me, the fire that ignites when our eyes meet, the completeness I experience in your arms. You are my everything, Joy.",
  "Before you, I didn't know what it meant to truly love. You've shown me that love isn't just a feeling—it's a choice I make every single day to cherish, protect, and adore you. My heart belongs entirely to you.",
  "Joy, you're the reason I wake up with a smile. You're the reason my heart races. Every moment with you feels like a beautiful dream I hope never to wake from. You are my soulmate, my home, my forever.",
  "I see your strength when you're vulnerable. I see your beauty when you're bare. I see your worth when you doubt yourself. And in all of these moments, my love for you deepens immeasurably. You are extraordinary.",
  "The way you love me has healed parts of my soul I didn't know were broken. Your compassion, your patience, your unwavering belief in me—it's transformed who I am. Thank you for being the one who makes me whole.",
  "Joy, you are my greatest blessing. Not because life is perfect with you, but because facing life's challenges with you makes everything bearable. Your hand in mine is all I ever need.",
  "I never believed in destiny until I met you. Now I know that every step I took, every choice I made, was leading me directly to you. You are no accident. You are my answered prayer.",
  "When you're near, my world stops spinning and suddenly everything makes sense. Your presence is like coming home after a long journey. I love you with a love that's almost overwhelming in its intensity.",
  "Joy, you've become my best friend, my greatest love, my deepest joy. In you, I've found not just a partner, but a reflection of who I want to be. You inspire me to be better, to love deeper, to live fuller.",
  "There's a peace that settles in my chest when I'm with you. A feeling of absolute rightness, as if I've finally found exactly where I belong. You are my sanctuary, my safe place, my forever home.",
  "I fall in love with you over and over again. In quiet moments, in chaotic ones, in your laughter and in your tears. You are the most beautiful person I know, inside and out. I adore every part of you.",
  "Joy, when I think about forever, I only see your face. When I dream of happiness, it's always with you by my side. You are my past joy, my present blessing, and my future hope. I love you completely.",
  "The depth of my love for you cannot be measured. It's infinite, unconditional, eternal. You've touched my soul in ways I never thought possible. You are the love of my life, now and always.",
  "Loving you feels like the most natural thing in the world. It's as essential as breathing, as automatic as my heartbeat. You are woven into every fiber of my being. I cannot imagine a life without you.",
  "Joy, you are my greatest adventure and my safest harbor. With you, I can be completely myself—vulnerable, hopeful, imperfect. And you love me anyway. That's the greatest gift I've ever received.",
  "In the quiet of the morning before you wake, I watch you and I'm overwhelmed with gratitude. Grateful for every moment, every laugh, every tear we've shared. You are my life's greatest blessing.",
  "I don't have the words to fully express what you mean to me. But I'll spend the rest of my life trying to show you through my actions, my devotion, my unwavering love. You deserve to know how deeply you matter.",
  "Joy, your love has rewritten my entire story. Where there was darkness, you brought light. Where there was doubt, you brought faith. Where there was emptiness, you brought joy. You are my redemption, my salvation, my forever.",
  "Every single day with you is a gift I never take for granted. Your laugh, your warmth, your presence—it all means everything to me. I love you with my whole heart, with every fiber of my being. Always.",
  "When I'm with you, I feel like the luckiest man alive. Not because life is easy, but because I get to share it with someone as extraordinary as you. You are my dream come true, Joy.",
  "You've shown me that true love is selfless, patient, and unconditional. Thank you for loving me the way you do. Thank you for seeing the best in me when I can't see it in myself. You complete me.",
  "Joy, you are my reason, my purpose, my everything. When I'm feeling lost, your love guides me home. When I'm feeling weak, your strength lifts me up. You are my greatest treasure.",
  "I love you not just for who you are, but for who I am when I'm with you. You bring out the best in me, inspire me to dream bigger, and love deeper. You are my inspiration, my muse, my forever.",
  "The way you love me has shown me what real love is. It's fierce, it's gentle, it's patient, it's passionate. It's everything I never knew I needed. Thank you for loving me so completely, Joy.",
  "Joy, you are the answer to every prayer I've ever prayed. In you, I've found my soulmate, my best friend, my home. With you, I've found peace. I love you more than words could ever express.",
]

// Daily rotating images - will be fetched from API
// Images rotate one per day automatically based on system date

// Heart component for 3D scene
function Heart({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const heartShape = new THREE.Shape()
  heartShape.moveTo(0, 0)
  heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0)
  heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1)
  heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0)
  heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0)

  const extrudeSettings = {
    depth: 0.3,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

// Floating particles
function Particles() {
  const count = 100
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ffc0e3" transparent opacity={0.8} />
    </points>
  )
}

// 3D Scene component
function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ff1493" />
      <pointLight position={[10, -10, -5]} intensity={0.6} color="#ff69b4" />
      <pointLight position={[0, 10, 5]} intensity={0.5} color="#ffc0cb" />

      {/* Floating hearts */}
      <Heart position={[-3, 2, -5]} scale={0.5} color="#ff1493" />
      <Heart position={[3, -1, -3]} scale={0.4} color="#ff69b4" />
      <Heart position={[0, 3, -8]} scale={0.6} color="#ffc0cb" />
      <Heart position={[-4, -2, -6]} scale={0.3} color="#ffb6c1" />
      <Heart position={[4, 1, -4]} scale={0.35} color="#ff1493" />
      <Heart position={[-2, -3, -7]} scale={0.45} color="#ff69b4" />
      <Heart position={[2, 2.5, -6]} scale={0.4} color="#ffa0c9" />

      {/* Multiple floating spheres with distortion */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
        <mesh position={[0, 0, -10]} scale={2}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#ff69b4" transparent opacity={0.15} distort={0.4} speed={2} />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh position={[5, 3, -15]} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#ff1493" transparent opacity={0.1} distort={0.3} speed={1.5} />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={1.2}>
        <mesh position={[-5, -2, -12]} scale={1.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#ffc0cb" transparent opacity={0.12} distort={0.35} speed={2.5} />
        </mesh>
      </Float>

      {/* Particles */}
      <Particles />

      {/* Stars */}
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0.3} fade speed={1} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

interface SavedMessage {
  id: string
  message: string
  date: string
  timestamp: number
}

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentImage, setCurrentImage] = useState("")
  const [leftImage, setLeftImage] = useState("")
  const [rightImage, setRightImage] = useState("")
  const [allImages, setAllImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([])
  const [showSavedMessages, setShowSavedMessages] = useState(false)

  useEffect(() => {
    // Load saved messages from localStorage
    const loadSavedMessages = () => {
      try {
        const saved = localStorage.getItem('savedLoveMessages')
        if (saved) {
          setSavedMessages(JSON.parse(saved))
        }
      } catch (error) {
        console.error('Error loading saved messages:', error)
      }
    }

    loadSavedMessages()

    // Fetch the daily image from the API
    const fetchDailyImage = async () => {
      try {
        const response = await fetch('/api/daily-image');
        const data = await response.json();
        
        if (data.image && data.allImages && data.allImages.length > 0) {
          setAllImages(data.allImages);
          setCurrentImageIndex(data.currentIndex);
          
          // Set initial images
          const currentIdx = data.currentIndex;
          const totalImages = data.allImages.length;
          
          setCurrentImage(data.allImages[currentIdx]);
          
          // Get left image (previous image, wrapping around if needed)
          const leftIdx = (currentIdx - 1 + totalImages) % totalImages;
          setLeftImage(data.allImages[leftIdx]);
          
          // Get right image (next image, wrapping around if needed)
          const rightIdx = (currentIdx + 1) % totalImages;
          setRightImage(data.allImages[rightIdx]);
        }
      } catch (error) {
        console.error('Error fetching daily image:', error);
        setCurrentImage("/placeholder.svg");
        setLeftImage("/placeholder.svg");
        setRightImage("/placeholder.svg");
      }
    };

    fetchDailyImage();

    // Get today's date - use this to select the message
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dayOfMonth = today.getDate();
    const month = today.getMonth(); // 0-indexed (0 = January, 1 = February, etc.)
    
    // Check if today is Valentine's Day (February 14th)
    if (month === 1 && dayOfMonth === 14) {
      // Display special intimate Valentine's Day message
      setCurrentMessage(valentinesMessage);
    } else if (dayOfMonth === 30) {
      // Display special anniversary message on the 30th
      setCurrentMessage(anniversaryMessage);
    } else {
      // Regular daily message rotation for other days
      const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
      const messageIndex = daysSinceEpoch % loveMessages.length;
      setCurrentMessage(loveMessages[messageIndex]);
    }

    setIsLoaded(true)
  }, [])

  // Separate useEffect for image rotation
  useEffect(() => {
    if (allImages.length === 0) return;

    // Set up interval to change images every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % allImages.length;
        
        // Update all three images based on new index
        setCurrentImage(allImages[newIndex]);
        
        const leftIdx = (newIndex - 1 + allImages.length) % allImages.length;
        setLeftImage(allImages[leftIdx]);
        
        const rightIdx = (newIndex + 1) % allImages.length;
        setRightImage(allImages[rightIdx]);
        
        return newIndex;
      });
    }, 5000); // 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [allImages])

  const saveMessage = () => {
    const newMessage: SavedMessage = {
      id: Date.now().toString(),
      message: currentMessage,
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      timestamp: Date.now(),
    }

    const updatedMessages = [newMessage, ...savedMessages]
    setSavedMessages(updatedMessages)
    
    try {
      localStorage.setItem('savedLoveMessages', JSON.stringify(updatedMessages))
    } catch (error) {
      console.error('Error saving message:', error)
    }
  }

  const deleteMessage = (id: string) => {
    const updatedMessages = savedMessages.filter(msg => msg.id !== id)
    setSavedMessages(updatedMessages)
    
    try {
      localStorage.setItem('savedLoveMessages', JSON.stringify(updatedMessages))
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const isMessageAlreadySaved = savedMessages.some(msg => msg.message === currentMessage)

  return (
    <main className="relative w-full min-h-screen overflow-y-auto">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
          {/* Title - Enhanced with strong text shadow glow */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center text-pink-50 drop-shadow-[0_0_30px_rgba(255,192,203,0.8)] animate-fade-in"
            style={{
              textShadow:
                "0 0 40px rgba(255,105,180,0.9), 0 0 60px rgba(255,105,180,0.6), 0 0 80px rgba(255,105,180,0.4)",
            }}
          >
            Joy
          </h1>

          {/* Subtitle - Enhanced text clarity with better shadow */}
          <p
            className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-pink-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] animate-fade-in [animation-delay:200ms] font-medium"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(255,182,193,0.6)" }}
          >
            A little reminder of how much you mean to me
          </p>

          {/* Photo Frames - Enhanced glow effects with three photos */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 animate-fade-in [animation-delay:400ms]">
            {/* Left Photo - Smaller */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full opacity-60 blur-xl group-hover:opacity-80 transition duration-1000"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 rounded-full overflow-hidden border-3 border-pink-200/60 shadow-[0_0_30px_rgba(255,182,193,0.6)] backdrop-blur-sm bg-white/15">
                <img
                  src={leftImage || "/placeholder.svg"}
                  alt="Joy"
                  className="w-full h-full object-cover animate-scale-in"
                />
              </div>
            </div>

            {/* Center Photo - Main/Largest */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full opacity-80 blur-2xl group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-full opacity-40 blur-3xl group-hover:opacity-60 transition duration-1000"></div>

              {/* Photo container - Enhanced border glow */}
              <div className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-64 xl:h-64 rounded-full overflow-hidden border-4 border-pink-200/70 shadow-[0_0_40px_rgba(255,182,193,0.8)] backdrop-blur-sm bg-white/20">
                <img
                  src={currentImage || "/placeholder.svg"}
                  alt="Joy"
                  className="w-full h-full object-cover animate-scale-in"
                />
              </div>
            </div>

            {/* Right Photo - Smaller */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full opacity-60 blur-xl group-hover:opacity-80 transition duration-1000"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 rounded-full overflow-hidden border-3 border-pink-200/60 shadow-[0_0_30px_rgba(255,182,193,0.6)] backdrop-blur-sm bg-white/15">
                <img
                  src={rightImage || "/placeholder.svg"}
                  alt="Joy"
                  className="w-full h-full object-cover animate-scale-in"
                />
              </div>
            </div>
          </div>

          {/* Message Card - Enhanced card glow and text clarity */}
          {isLoaded && (
            <div className="backdrop-blur-md bg-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_0_50px_rgba(255,182,193,0.5)] border-2 border-pink-200/40 animate-fade-in [animation-delay:600ms]">
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center text-pink-50 leading-relaxed font-normal text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95), 0 0 15px rgba(255,182,193,0.5)" }}
              >
                {currentMessage}
              </p>

              {/* Date indicator - Enhanced text clarity */}
              <div className="mt-3 sm:mt-4 md:mt-5">
                <p
                  className="text-xs sm:text-sm text-pink-100 text-center font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                >
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Love Button - Enhanced glow effect */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in [animation-delay:800ms]">
            <button
              onClick={() => setShowPopup(true)}
              className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-[0_0_30px_rgba(255,105,180,0.6)] hover:shadow-[0_0_50px_rgba(255,105,180,0.9)] transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700"
            >
              <span className="relative z-10 drop-shadow-lg">Tap for Love</span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={saveMessage}
              disabled={isMessageAlreadySaved}
              className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(168,85,247,0.9)] transform hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:via-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 drop-shadow-lg">
                {isMessageAlreadySaved ? '💾 Saved' : '💾 Save Message'}
              </span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => setShowSavedMessages(true)}
              className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-[0_0_30px_rgba(251,113,133,0.6)] hover:shadow-[0_0_50px_rgba(251,113,133,0.9)] transform hover:scale-105 transition-all duration-300 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700"
            >
              <span className="relative z-10 drop-shadow-lg">
                📖 Saved ({savedMessages.length})
              </span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Heart emoji - Added glow effect */}
          <div className="text-center animate-bounce-slow">
            <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,182,193,0.8)]">💕</span>
          </div>
        </div>
      </div>

      {/* Popup Modal - Enhanced popup glow and text clarity */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative max-w-[90vw] sm:max-w-md md:max-w-lg w-full bg-gradient-to-br from-pink-500/98 via-rose-500/98 to-pink-600/98 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(255,105,180,0.8)] border-4 border-pink-200/60 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative hearts - Added glow to heart emojis */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 text-3xl sm:text-4xl md:text-5xl animate-bounce-slow drop-shadow-[0_0_15px_rgba(255,182,193,0.9)]">
              💕
            </div>
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-3xl sm:text-4xl md:text-5xl animate-bounce-slow [animation-delay:200ms] drop-shadow-[0_0_15px_rgba(255,182,193,0.9)]">
              💖
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 text-3xl sm:text-4xl md:text-5xl animate-bounce-slow [animation-delay:400ms] drop-shadow-[0_0_15px_rgba(255,182,193,0.9)]">
              💗
            </div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 text-3xl sm:text-4xl md:text-5xl animate-bounce-slow [animation-delay:600ms] drop-shadow-[0_0_15px_rgba(255,182,193,0.9)]">
              💝
            </div>

            {/* Message - Enhanced text clarity with strong shadows */}
            <div className="text-center">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-balance"
                style={{ textShadow: "0 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.4)" }}
              >
                Benjamin Loves You Joy
              </h2>
              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-balance"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.3)" }}
              >
                With All His Heart
              </p>

              {/* Close button - Enhanced button glow */}
              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-white/25 hover:bg-white/35 text-white rounded-full font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Messages Modal */}
      {showSavedMessages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
          onClick={() => setShowSavedMessages(false)}
        >
          <div
            className="relative max-w-[95vw] sm:max-w-2xl md:max-w-3xl w-full bg-gradient-to-br from-pink-500/98 via-rose-500/98 to-pink-600/98 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(255,105,180,0.8)] border-4 border-pink-200/60 animate-scale-in my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                style={{ textShadow: "0 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.4)" }}
              >
                📖 Saved Messages
              </h2>
              <p
                className="text-sm sm:text-base text-pink-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
              >
                Your collection of love messages
              </p>
            </div>

            {/* Messages List */}
            <div className="max-h-[60vh] overflow-y-auto space-y-4 mb-6 pr-2">
              {savedMessages.length === 0 ? (
                <div className="text-center py-12">
                  <p
                    className="text-lg sm:text-xl text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
                  >
                    No saved messages yet. Save your favorite messages to keep them here! 💕
                  </p>
                </div>
              ) : (
                savedMessages.map((savedMsg) => (
                  <div
                    key={savedMsg.id}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border-2 border-pink-200/30 shadow-lg hover:bg-white/25 transition-all duration-300"
                  >
                    <p
                      className="text-sm sm:text-base text-white leading-relaxed mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
                    >
                      {savedMsg.message}
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        className="text-xs sm:text-sm text-pink-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                      >
                        {savedMsg.date}
                      </p>
                      <button
                        onClick={() => deleteMessage(savedMsg.id)}
                        className="px-3 py-1.5 bg-red-500/80 hover:bg-red-600/90 text-white rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowSavedMessages(false)}
              className="w-full px-6 py-3 bg-white/25 hover:bg-white/35 text-white rounded-full font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
