import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter, FaHeart } from 'react-icons/fa';
import { useBusinessData } from '../context/BusinessContext';
import laranjaBoyImg from './imgs/laranjaboy.png';
import './Footer.css';

const Footer = () => {
  const { businessData } = useBusinessData();
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (type) => {
    const icons = {
      instagram: <FaInstagram />,
      facebook: <FaFacebook />,
      whatsapp: <FaWhatsapp />,
      twitter: <FaTwitter />,
    };
    return icons[type] || null;
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-mascot">
            <img src={laranjaBoyImg} alt="Laranja Boy Mascote" />
          </div>
          <div className="footer-brand">
            <h3>{businessData.name}</h3>
            <p>{businessData.slogan}</p>
          </div>
        </motion.div>

        <motion.div
          className="footer-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4>Links Rápidos</h4>
          <ul className="footer-links">
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#redes">Redes Sociais</a></li>
            <li><a href="#pix">Chaves PIX</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </motion.div>

        <motion.div
          className="footer-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4>Siga-nos</h4>
          <div className="footer-social">
            {businessData.socialLinks.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
              >
                {getSocialIcon(link.type)}
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <p>{businessData.contacts.find(c => c.type === 'email')?.value}</p>
            <p>{businessData.contacts.find(c => c.type === 'phone')?.value}</p>
          </div>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} {businessData.name}. Todos os direitos reservados.
        </p>
        <p className="footer-love">
          Feito com <FaHeart className="heart-icon" /> para você
        </p>
      </div>
    </footer>
  );
};

export default Footer;
