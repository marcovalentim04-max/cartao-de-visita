import { createContext, useContext, useState, useEffect } from 'react';

const BusinessContext = createContext();

export const useBusinessData = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessData deve ser usado dentro de BusinessProvider');
  }
  return context;
};

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(() => {
    // Limpa o localStorage para forçar o uso dos novos dados
    localStorage.removeItem('businessData');
    
    const saved = localStorage.getItem('businessData');
    return saved ? JSON.parse(saved) : {
      name: 'Suco Focco Frescõ',
      slogan: 'O Sabor Autêntico da Laranja Fresca',
      description: 'Bem-vindo à Suco Focco Frescõ! Somos especialistas em criar os sucos de laranja mais frescos e saborosos do Brasil. Cada gota é extraída de laranjas selecionadas, colhidas no ponto ideal de maturação. Nossa missão é levar saúde, frescor e o verdadeiro sabor da laranja para sua casa. Sem conservantes, sem adição de açúcar, apenas pura natureza em cada copo!',
      logo: '/src/components/imgs/logo.png',
      socialLinks: [
        { id: 1, type: 'instagram', url: 'https://instagram.com/sucofoccofesco', label: '@sucofoccofesco' },
        { id: 2, type: 'facebook', url: 'https://facebook.com/sucofoccofrescooficial', label: 'Suco Focco Frescõ' },
        { id: 3, type: 'whatsapp', url: 'https://wa.me/5511912345678', label: '(11) 91234-5678' },
        { id: 4, type: 'twitter', url: 'https://twitter.com/foccofresco', label: '@foccofresco' },
      ],
      pixKeys: [
        { id: 1, type: 'cnpj', key: '45.678.901/0001-23', label: 'CNPJ Focco Frescõ' },
        { id: 2, type: 'email', key: 'financeiro@foccofrescos.com.br', label: 'PIX E-mail' },
        { id: 3, type: 'phone', key: '+5511912345678', label: 'PIX Celular' },
      ],
      contacts: [
        { id: 1, type: 'email', value: 'contato@foccofrescos.com.br', label: 'E-mail Principal' },
        { id: 2, type: 'phone', value: '(11) 4455-6677', label: 'Telefone Comercial' },
        { id: 3, type: 'whatsapp', value: '(11) 91234-5678', label: 'WhatsApp Vendas' },
        { id: 4, type: 'address', value: 'Avenida das Frutas, 789 - Centro, São Paulo/SP - CEP: 01234-567', label: 'Nosso Endereço' },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem('businessData', JSON.stringify(businessData));
  }, [businessData]);

  const updateBusinessInfo = (info) => {
    setBusinessData((prev) => ({ ...prev, ...info }));
  };

  const addSocialLink = (link) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { ...link, id: Date.now() }],
    }));
  };

  const updateSocialLink = (id, updatedLink) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, ...updatedLink } : link
      ),
    }));
  };

  const removeSocialLink = (id) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));
  };

  const addPixKey = (pixKey) => {
    setBusinessData((prev) => ({
      ...prev,
      pixKeys: [...prev.pixKeys, { ...pixKey, id: Date.now() }],
    }));
  };

  const updatePixKey = (id, updatedPixKey) => {
    setBusinessData((prev) => ({
      ...prev,
      pixKeys: prev.pixKeys.map((pix) =>
        pix.id === id ? { ...pix, ...updatedPixKey } : pix
      ),
    }));
  };

  const removePixKey = (id) => {
    setBusinessData((prev) => ({
      ...prev,
      pixKeys: prev.pixKeys.filter((pix) => pix.id !== id),
    }));
  };

  const addContact = (contact) => {
    setBusinessData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { ...contact, id: Date.now() }],
    }));
  };

  const updateContact = (id, updatedContact) => {
    setBusinessData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      ),
    }));
  };

  const removeContact = (id) => {
    setBusinessData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
  };

  const value = {
    businessData,
    updateBusinessInfo,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    addPixKey,
    updatePixKey,
    removePixKey,
    addContact,
    updateContact,
    removeContact,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};
