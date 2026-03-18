import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
      

    </div>
  );
};

const NavButton = ({ icon, active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary-500 scale-110' : 'text-gray-500 opacity-70'}`}
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

const Dashboard = () => {
  const [userName, setUserName] = useState('Explorer');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      setUserName(WebApp.initDataUnsafe.user.first_name);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6 pb-20"
    >
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-gray-400 text-sm font-medium">Welcome back,</h2>
          <h1 className="text-2xl font-bold">{userName} ✨</h1>
        </div>
        <div className="bg-white/5 p-2 rounded-full border border-white/10 relative cursor-pointer" onClick={() => WebApp.HapticFeedback.impactOccurred('light')}>
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
            <button 
              onClick={() => {
                WebApp.HapticFeedback.notificationOccurred('success');
                WebApp.showAlert('Connection sequence started...');
              }}
              className="bg-primary-500 glow-button text-white font-bold py-2 px-6 rounded-xl text-sm flex items-center gap-2"
            >
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Zap size={20} className="text-primary-400" /> 
            Popular Plans
          </h3>
          <button onClick={() => navigate('/plans')} className="text-primary-400 text-xs font-medium">View All</button>
        </div>
        <PlanCard months="1" price="299" best onClick={() => navigate('/plans')} />
      </section>
    </motion.div>
  );
};

const Tariffs = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 pb-20"
    >
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className="p-2 bg-white/5 rounded-full border border-white/10">
           <ChevronRight size={20} className="rotate-180" />
        </button>
        <h1 className="text-2xl font-bold">Select Plan</h1>
      </header>

      <div className="space-y-4">
        <PlanCard months="1" price="299" desc="Great for testing" />
        <PlanCard months="3" price="799" discount="11% OFF" best desc="Most popular choice" />
        <PlanCard months="6" price="1299" discount="27% OFF" desc="Perfect for streamers" />
        <PlanCard months="12" price="1999" discount="45% OFF" desc="Best value for money" />
      </div>

      <div className="glass-card p-4 bg-primary-500/10 border-primary-500/20">
        <p className="text-xs text-center text-gray-400">
          All plans include 24/7 support, access to 50+ countries, and military-grade encryption.
        </p>
      </div>
    </motion.div>
  );
};

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const refLink = "https://max.ru/id24188512?start=ref123";

  const handleCopy = () => {
    WebApp.HapticFeedback.impactOccurred('medium');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-20"
    >
      <h1 className="text-2xl font-bold mb-2">Referral Program</h1>
      <p className="text-gray-400 text-sm">Earn 50₽ for every friend you bring to Space VPN ecosystem.</p>

      <div className="glass-card p-6 text-center space-y-4">
        <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-primary-500/30">
          <Users size={40} className="text-primary-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">128</h3>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Total Referrals</p>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 w-[65%]" />
        </div>
        <p className="text-[10px] text-gray-500">You are 35% away from Master Rank</p>
      </div>

      <div className="glass-card p-4 space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Invite Link</p>
        <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex justify-between items-center">
          <code className="text-[10px] text-primary-400 truncate mr-2">{refLink}</code>
          <button onClick={handleCopy} className="text-[10px] font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg active:scale-90 transition-all uppercase">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Profile = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      <div className="flex flex-col items-center gap-4 py-4">
         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
              <User size={48} className="text-white/20" />
            </div>
         </div>
         <div className="text-center">
            <h2 className="text-xl font-bold">Space Traveler</h2>
            <p className="text-gray-500 text-xs">ID: #24188512</p>
         </div>
      </div>

      <div className="space-y-3">
        <MenuRow icon={<ShieldCheck size={20} className="text-green-400" />} label="Security Settings" />
        <MenuRow icon={<CreditCard size={20} className="text-blue-400" />} label="Payment History" />
        <MenuRow icon={<Settings size={20} className="text-gray-400" />} label="Application Config" />
        <div className="pt-4">
           <MenuRow icon={<Bell size={20} className="text-amber-400" />} label="Support Center" />
        </div>
        <button className="w-full py-4 text-red-500 text-sm font-bold opacity-70">Logout Account</button>
      </div>
    </motion.div>
  );
};

const MenuRow = ({ icon, label }) => (
  <div className="glass-card p-4 flex justify-between items-center active:bg-white/5 transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-600" />
  </div>
);

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

const PlanCard = ({ months, price, best, discount, desc, onClick }) => (
  <div 
    onClick={onClick}
    className={`glass-card p-4 mb-3 border flex justify-between items-center transition-all active:scale-95 ${best ? 'border-primary-500/50 bg-primary-500/5' : 'border-white/5'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${best ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400'}`}>
        {months}
      </div>
      <div>
        <h4 className="font-bold">{months} Month{months > 1 ? 's' : ''}</h4>
        <p className="text-[10px] text-gray-500 leading-tight">{desc || 'Access to all protocols'}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-lg">{price}₽</p>
      {discount && <p className="text-green-500 text-[10px] font-bold uppercase tracking-tighter">{discount}</p>}
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Layout>
      <div className="relative pb-24">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plans" element={<Tariffs />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </div>
      
      {/* Navigation - Injected into Layout ideally but for simplicity here */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-2xl border-t border-white/5 px-8 py-4 flex justify-between items-end z-[100] max-w-md mx-auto">
        <NavButton onClick={() => navigate('/')} icon={<ShieldCheck size={26} />} active={path === '/'} label="Home" />
        <NavButton onClick={() => navigate('/plans')} icon={<Zap size={26} />} active={path === '/plans'} label="Buy" />
        <NavButton onClick={() => navigate('/referral')} icon={<Users size={26} />} active={path === '/referral'} label="Ref" />
        <NavButton onClick={() => navigate('/profile')} icon={<User size={26} />} active={path === '/profile'} label="Me" />
      </div>
    </Layout>
  );
};

export default App;
