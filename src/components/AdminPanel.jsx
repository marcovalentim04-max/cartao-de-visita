import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useBusinessData } from '../context/BusinessContext';
import { useAuth } from '../context/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const {
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
  } = useBusinessData();

  const { isAuthenticated, login, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('business');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setShowLogin(false);
      setIsOpen(true);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Senha incorreta! Tente novamente.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setActiveTab('business');
  };

  const handleTogglePanel = () => {
    if (isAuthenticated) {
      setIsOpen(!isOpen);
    } else {
      setShowLogin(true);
    }
  };

  const handleBusinessUpdate = () => {
    updateBusinessInfo(formData);
    setFormData({});
    alert('Informações atualizadas com sucesso!');
  };

  const handleAddSocial = () => {
    if (formData.type && formData.url && formData.label) {
      addSocialLink(formData);
      setFormData({});
      alert('Rede social adicionada!');
    }
  };

  const handleUpdateSocial = () => {
    if (editingItem) {
      updateSocialLink(editingItem, formData);
      setEditingItem(null);
      setFormData({});
      alert('Rede social atualizada!');
    }
  };

  const handleAddPix = () => {
    if (formData.type && formData.key && formData.label) {
      addPixKey(formData);
      setFormData({});
      alert('Chave PIX adicionada!');
    }
  };

  const handleUpdatePix = () => {
    if (editingItem) {
      updatePixKey(editingItem, formData);
      setEditingItem(null);
      setFormData({});
      alert('Chave PIX atualizada!');
    }
  };

  const handleAddContact = () => {
    if (formData.type && formData.value && formData.label) {
      addContact(formData);
      setFormData({});
      alert('Contato adicionado!');
    }
  };

  const handleUpdateContact = () => {
    if (editingItem) {
      updateContact(editingItem, formData);
      setEditingItem(null);
      setFormData({});
      alert('Contato atualizado!');
    }
  };

  const startEdit = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({});
  };

  return (
    <>
      <motion.button
        className="admin-toggle"
        onClick={handleTogglePanel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaEdit />}
      </motion.button>

      {/* Modal de Login */}
      <AnimatePresence>
        {showLogin && !isAuthenticated && (
          <motion.div
            className="login-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              className="login-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="login-close" onClick={() => setShowLogin(false)}>
                <FaTimes />
              </button>
              <div className="login-icon">
                <FaLock />
              </div>
              <h2>Acesso Administrativo</h2>
              <p>Digite a senha para acessar o painel</p>
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                {loginError && <p className="login-error">{loginError}</p>}
                <button type="submit" className="login-btn">
                  Entrar
                </button>
              </form>
              <p className="login-hint">Dica: A senha padrão é "admin123"</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && isAuthenticated && (
          <motion.div
            className="admin-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="admin-header">
              <h2>Painel Administrativo</h2>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </button>
            </div>

            <div className="admin-tabs">
              <button
                className={activeTab === 'business' ? 'active' : ''}
                onClick={() => setActiveTab('business')}
              >
                Empresa
              </button>
              <button
                className={activeTab === 'social' ? 'active' : ''}
                onClick={() => setActiveTab('social')}
              >
                Redes Sociais
              </button>
              <button
                className={activeTab === 'pix' ? 'active' : ''}
                onClick={() => setActiveTab('pix')}
              >
                PIX
              </button>
              <button
                className={activeTab === 'contacts' ? 'active' : ''}
                onClick={() => setActiveTab('contacts')}
              >
                Contatos
              </button>
            </div>

            <div className="admin-content">
              {/* Business Info */}
              {activeTab === 'business' && (
                <div className="admin-section">
                  <h3>Informações da Empresa</h3>
                  <div className="form-group">
                    <label>Nome da Empresa</label>
                    <input
                      type="text"
                      defaultValue={businessData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Slogan</label>
                    <input
                      type="text"
                      defaultValue={businessData.slogan}
                      onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                      defaultValue={businessData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="4"
                    />
                  </div>
                  <button className="btn-save" onClick={handleBusinessUpdate}>
                    <FaSave /> Salvar Alterações
                  </button>
                </div>
              )}

              {/* Social Links */}
              {activeTab === 'social' && (
                <div className="admin-section">
                  <h3>Redes Sociais</h3>
                  <div className="items-list">
                    {businessData.socialLinks.map((link) => (
                      <div key={link.id} className="item-card">
                        {editingItem === link.id ? (
                          <>
                            <select
                              value={formData.type || link.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                              <option value="instagram">Instagram</option>
                              <option value="facebook">Facebook</option>
                              <option value="whatsapp">WhatsApp</option>
                              <option value="twitter">Twitter</option>
                              <option value="linkedin">LinkedIn</option>
                            </select>
                            <input
                              type="text"
                              value={formData.label || link.label}
                              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                              placeholder="Label"
                            />
                            <input
                              type="text"
                              value={formData.url || link.url}
                              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                              placeholder="URL"
                            />
                            <div className="item-actions">
                              <button className="btn-save-small" onClick={handleUpdateSocial}>
                                <FaSave />
                              </button>
                              <button className="btn-cancel" onClick={cancelEdit}>
                                <FaTimes />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="item-info">
                              <strong>{link.type}</strong>
                              <span>{link.label}</span>
                            </div>
                            <div className="item-actions">
                              <button className="btn-edit" onClick={() => startEdit(link)}>
                                <FaEdit />
                              </button>
                              <button className="btn-delete" onClick={() => removeSocialLink(link.id)}>
                                <FaTrash />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="add-form">
                    <h4>Adicionar Nova Rede</h4>
                    <select onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                      <option value="">Selecione...</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="twitter">Twitter</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Label (ex: @minhaempresa)"
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                    <button className="btn-add" onClick={handleAddSocial}>
                      <FaPlus /> Adicionar
                    </button>
                  </div>
                </div>
              )}

              {/* PIX Keys */}
              {activeTab === 'pix' && (
                <div className="admin-section">
                  <h3>Chaves PIX</h3>
                  <div className="items-list">
                    {businessData.pixKeys.map((pix) => (
                      <div key={pix.id} className="item-card">
                        {editingItem === pix.id ? (
                          <>
                            <select
                              value={formData.type || pix.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                              <option value="email">E-mail</option>
                              <option value="phone">Telefone</option>
                              <option value="cpf">CPF</option>
                              <option value="cnpj">CNPJ</option>
                              <option value="random">Chave Aleatória</option>
                            </select>
                            <input
                              type="text"
                              value={formData.label || pix.label}
                              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                              placeholder="Label"
                            />
                            <input
                              type="text"
                              value={formData.key || pix.key}
                              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                              placeholder="Chave PIX"
                            />
                            <div className="item-actions">
                              <button className="btn-save-small" onClick={handleUpdatePix}>
                                <FaSave />
                              </button>
                              <button className="btn-cancel" onClick={cancelEdit}>
                                <FaTimes />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="item-info">
                              <strong>{pix.label}</strong>
                              <span>{pix.key}</span>
                            </div>
                            <div className="item-actions">
                              <button className="btn-edit" onClick={() => startEdit(pix)}>
                                <FaEdit />
                              </button>
                              <button className="btn-delete" onClick={() => removePixKey(pix.id)}>
                                <FaTrash />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="add-form">
                    <h4>Adicionar Nova Chave</h4>
                    <select onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                      <option value="">Selecione...</option>
                      <option value="email">E-mail</option>
                      <option value="phone">Telefone</option>
                      <option value="cpf">CPF</option>
                      <option value="cnpj">CNPJ</option>
                      <option value="random">Chave Aleatória</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Label"
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Chave PIX"
                      onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    />
                    <button className="btn-add" onClick={handleAddPix}>
                      <FaPlus /> Adicionar
                    </button>
                  </div>
                </div>
              )}

              {/* Contacts */}
              {activeTab === 'contacts' && (
                <div className="admin-section">
                  <h3>Contatos</h3>
                  <div className="items-list">
                    {businessData.contacts.map((contact) => (
                      <div key={contact.id} className="item-card">
                        {editingItem === contact.id ? (
                          <>
                            <select
                              value={formData.type || contact.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                              <option value="email">E-mail</option>
                              <option value="phone">Telefone</option>
                              <option value="address">Endereço</option>
                            </select>
                            <input
                              type="text"
                              value={formData.label || contact.label}
                              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                              placeholder="Label"
                            />
                            <input
                              type="text"
                              value={formData.value || contact.value}
                              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                              placeholder="Valor"
                            />
                            <div className="item-actions">
                              <button className="btn-save-small" onClick={handleUpdateContact}>
                                <FaSave />
                              </button>
                              <button className="btn-cancel" onClick={cancelEdit}>
                                <FaTimes />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="item-info">
                              <strong>{contact.label}</strong>
                              <span>{contact.value}</span>
                            </div>
                            <div className="item-actions">
                              <button className="btn-edit" onClick={() => startEdit(contact)}>
                                <FaEdit />
                              </button>
                              <button className="btn-delete" onClick={() => removeContact(contact.id)}>
                                <FaTrash />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="add-form">
                    <h4>Adicionar Novo Contato</h4>
                    <select onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                      <option value="">Selecione...</option>
                      <option value="email">E-mail</option>
                      <option value="phone">Telefone</option>
                      <option value="address">Endereço</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Label"
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Valor"
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    />
                    <button className="btn-add" onClick={handleAddContact}>
                      <FaPlus /> Adicionar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
