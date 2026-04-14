import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import TourScreen from './screens/TourScreen/TourScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CharacterScreen from './screens/CharacterScreen/CharacterScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NotificationScreen from './screens/NotificationScreen/NotificationScreen';
import JelajahScreen from './screens/JelajahScreen/JelajahScreen';
import DetailSilaScreen from './screens/DetailSilaScreen/DetailSilaScreen';
import BelajarScreen from './screens/BelajarScreen/BelajarScreen';

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tourFinished, setTourFinished] = useState(false);
  const [userName, setUserName] = useState('');
  const [character, setCharacter] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // Global navigation state
  const [activeSila, setActiveSila] = useState(null); // Tracks selected Sila
  const [activeMateri, setActiveMateri] = useState(null); // Tracks selected learning session

  // Developer Bypass
  if (hash === '#homescreen' || hash === '#homepage') {
    if (showNotifications) return <NotificationScreen onBack={() => setShowNotifications(false)} />;
    
    if (activeMateri) {
      return <BelajarScreen materiId={activeMateri} onClose={() => setActiveMateri(null)} />;
    }

    if (activeSila) {
      return <DetailSilaScreen silaId={activeSila} onBack={() => setActiveSila(null)} onMateriSelect={setActiveMateri} />;
    }
    
    if (activeTab === 'jelajah') {
      return <JelajahScreen userName="Developer" character="Laki-laki" onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
    }
    
    return <HomeScreen userName="Developer" character="Laki-laki" onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
  }

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return <OnboardingScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!tourFinished) {
    return <TourScreen onFinishTour={() => setTourFinished(true)} />;
  }

  if (!userName) {
    return <RegisterScreen onNameSubmit={(name) => setUserName(name)} />;
  }

  if (!character) {
    return <CharacterScreen onCharacterSelect={(gender) => setCharacter(gender)} />;
  }

  // Application Modules Priority Routing

  if (showNotifications) {
    return <NotificationScreen onBack={() => setShowNotifications(false)} />;
  }

  // Interactive Learning Pipeline
  if (activeMateri) {
    return <BelajarScreen materiId={activeMateri} onClose={() => setActiveMateri(null)} />;
  }

  // Sila Detail Sub-navigation
  if (activeSila) {
    return <DetailSilaScreen silaId={activeSila} onBack={() => setActiveSila(null)} onMateriSelect={setActiveMateri} />;
  }

  // Nav Routing
  if (activeTab === 'jelajah') {
    return <JelajahScreen userName={userName} character={character} onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
  }

  // Dashboard / Native Home
  return <HomeScreen userName={userName} character={character} onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
}

export default App;
