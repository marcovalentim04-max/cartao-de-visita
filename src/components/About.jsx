import { motion } from 'framer-motion';
import { useBusinessData } from '../context/BusinessContext';
import laranjaImg from './imgs/laranja.png';
import './About.css';

const About = () => {
  const { businessData } = useBusinessData();

  return (
    <section className="about" id="sobre-nos">
      <div className="about-container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about-title">Sobre Nós</h2>
          <div className="title-underline"></div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="about-layout">
            <div className="about-card">
              <div className="card-decoration"></div>
              <p className="about-description">{businessData.description}</p>
            </div>
            
            <div className="about-image">
              <img src={laranjaImg} alt="Laranja Fresca" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
