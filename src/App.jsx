import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Menu, 
  User, 
  CreditCard, 
  Users, 
  Settings, 
  Key, 
  ChevronRight, 
  Zap,
  Globe,
  Bell
} from 'lucide-react';
import WebApp from '@twa-dev/sdk';

// Components
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary-600/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[20%] left-[-20%] w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
      
      <main className="flex-grow p-4 pt-6 z-10">
        {children}
      </main>
      
      {/* Simple Tabs for Navigation */}
      <nav className="sticky bottom-0 bg-black/40 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
        <NavButton icon={<ShieldCheck size={24} />} active label="Home" />
        <NavButton icon={<Zap size={24} />} label="Plans" />
        <NavButton icon={<Users size={24} />} label="Ref" />
        <NavButton icon={<User size={24} />} label="Profile" />
      </nav>
    </div>
  );
};

const NavButton = ({ icon, active, label }) => (
  <button className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary-500 scale-110' : 'text-gray-500 opacity-70'}`}>
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

const Dashboard = () => {
  const [userName, setUserName] = useState('Explorer');
  
  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      setUserName(WebApp.initDataUnsafe.user.first_name);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-gray-400 text-sm font-medium">Welcome back,</h2>
          <h1 className="text-2xl font-bold">{userName} ✨</h1>
        </div>
        <div className="bg-white/5 p-2 rounded-full border border-white/10 relative">
          <Bell size={20} className="text-gray-300" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-black" />
        </div>
      </header>

      {/* Subscription Card */}
      <div className="glass-card p-6 border-l-4 border-l-primary-500 shadow-glass overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck size={100} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary-500/20 text-primary-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Premium Active</span>
            <span className="text-gray-500 text-xs">• 24 days left</span>
          </div>
          <h3 className="text-xl font-bold mb-1">Space VPN VIP</h3>
          <p className="text-gray-400 text-sm mb-4">Unlimited speed & servers protected</p>
          
          <div className="flex gap-3">
            <button className="bg-primary-500 glow-button text-white font-bold py-2 px-6 rounded-xl text-sm flex items-center gap-2">
              Connect Now
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<Globe size={20} className="text-blue-400" />} label="Location" value="Netherlands" />
        <StatCard icon={<Key size={20} className="text-amber-400" />} label="Active Keys" value="2 Keys" />
      </div>

      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap size={20} className="text-primary-400" /> 
          Recommended Plans
        </h3>
        <PlanCard months="1" price="299" best />
        <PlanCard months="12" price="1999" discount="45% OFF" />
      </section>
    </motion.div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="glass-card p-4 flex flex-col gap-2">
    <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{label}</p>
      <p className="font-bold text-sm">{value}</p>
    </div>
  </div>
);

const PlanCard = ({ months, price, best, discount }) => (
  <div className={`glass-card p-4 mb-3 border flex justify-between items-center transition-all active:scale-95 ${best ? 'border-primary-500/50 bg-primary-500/5' : 'border-white/5'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${best ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400'}`}>
        {months}
      </div>
      <div>
        <h4 className="font-bold">{months} Month{months > 1 ? 's' : ''}</h4>
        <p className="text-xs text-gray-500">Access to all protocols</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-lg">{price}₽</p>
      {discount && <p className="text-green-500 text-[10px] font-bold">{discount}</p>}
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
