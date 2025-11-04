import { BusinessProvider } from './context/BusinessContext';
import { AuthProvider } from './context/AuthContext';
import Hero from './components/Hero';
import About from './components/About';
import SocialContacts from './components/SocialContacts';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BusinessProvider>
        <div className="app">
          <Hero />
          <SocialContacts />
          <AdminPanel />
        </div>
      </BusinessProvider>
    </AuthProvider>
  );
}

export default App;
