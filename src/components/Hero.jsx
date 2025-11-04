import { motion } from 'framer-motion';
import { useBusinessData } from '../context/BusinessContext';
import logoImage from './imgs/logo.png';
import './Hero.css';

const Hero = () => {
  const { businessData } = useBusinessData();

  return (
    <section className="hero">
      <div className="hero-background">
        <svg className="hero-curve" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#FFD700"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <svg className="hero-curve-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#FFD700"
            fillOpacity="0.5"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="logo-container">
            <img src={logoImage} alt={businessData.name} />
          </div>
        </motion.div>

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">{businessData.name}</h1>
          <p className="hero-slogan">{businessData.slogan}</p>
          <motion.button
            className="hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Saiba Mais
          </motion.button>
        </motion.div>
      </div>

      <div className="hero-decoration">
        <motion.div
          className="floating-circle circle-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="floating-circle circle-2"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="floating-circle circle-3"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
