import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { SiPix } from 'react-icons/si';
import { useBusinessData } from '../context/BusinessContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SocialContacts.css';

const SocialContacts = () => {
  const { businessData } = useBusinessData();

  const getSocialIcon = (type) => {
    const icons = {
      instagram: <FaInstagram />,
      facebook: <FaFacebook />,
      whatsapp: <FaWhatsapp />,
      twitter: <FaTwitter />,
      linkedin: <FaLinkedin />,
    };
    return icons[type] || <FaEnvelope />;
  };

  const getContactIcon = (type) => {
    const icons = {
      email: <FaEnvelope />,
      phone: <FaPhone />,
      address: <FaMapMarkerAlt />,
      whatsapp: <FaWhatsapp />,
    };
    return icons[type] || <FaEnvelope />;
  };

  return (
    <section className="social-contacts">
      <div className="social-container">
        {/* Chaves PIX */}
        <motion.div
          className="section-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title section-title-dark">Chaves PIX</h2>
          <div className="title-underline title-underline-dark"></div>
          
          <div className="pix-grid">
            {businessData.pixKeys.map((pix) => (
              <motion.div
                key={pix.id}
                className="pix-card"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="card-icon pix-icon">
                  <SiPix />
                </div>
                <div>
                  <h4>{pix.label}</h4>
                  <p className="pix-key">{pix.key}</p>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(pix.key);
                    alert('Chave PIX copiada!');
                  }}
                >
                  Copiar
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Redes Sociais */}
        <div className="social-section-wrapper">
          <motion.div
            className="section-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Nossas Redes Sociais</h2>
            <div className="title-underline"></div>
            
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="cards-carousel"
            >
              {businessData.socialLinks.map((link) => (
                <SwiperSlide key={link.id}>
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="card-icon social-icon">{getSocialIcon(link.type)}</div>
                    <h3>{link.type.charAt(0).toUpperCase() + link.type.slice(1)}</h3>
                    <p>{link.label}</p>
                  </motion.a>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Contatos */}
        <div className="contacts-section-wrapper">
          <motion.div
            className="section-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title section-title-dark">Entre em Contato</h2>
            <div className="title-underline title-underline-dark"></div>
            
            <div className="contacts-grid">
              {businessData.contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  className="contact-card"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="card-icon contact-icon">{getContactIcon(contact.type)}</div>
                  <div>
                    <h4>{contact.label}</h4>
                    <p>{contact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialContacts;
