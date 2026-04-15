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
import MisiScreen from './screens/MisiScreen/MisiScreen';
import DetailSilaScreen from './screens/DetailSilaScreen/DetailSilaScreen';
import BelajarScreen from './screens/BelajarScreen/BelajarScreen';
import ARScreen from './screens/ARScreen/ARScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [showSplash, setShowSplash] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [tourFinished, setTourFinished] = useState(true);
  const [userName, setUserName] = useState('Developer');
  const [character, setCharacter] = useState('Laki-laki');
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // Global navigation state
  const [activeSila, setActiveSila] = useState(null); // Tracks selected Sila
  const [activeMateri, setActiveMateri] = useState(null); // Tracks selected learning session

  useEffect(() => {
    // DEVELOPMENT BYPASS: Skipping real Supabase auth
    /*
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (session?.user?.user_metadata?.full_name) {
        setUserName(session.user.user_metadata.full_name);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session?.user?.user_metadata?.full_name) {
        setUserName(session.user.user_metadata.full_name);
      }
    });

    return () => subscription.unsubscribe();
    */
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
  };

  // Developer Bypass
  if (hash === '#homescreen' || hash === '#homepage') {
    if (showNotifications) return <NotificationScreen onBack={() => setShowNotifications(false)} />;
    
    if (activeMateri) {
      return <BelajarScreen materiId={activeMateri} onClose={() => setActiveMateri(null)} />;
    }

    if (activeSila) {
      return <DetailSilaScreen silaId={activeSila} onBack={() => setActiveSila(null)} onMateriSelect={setActiveMateri} />;
    }
    
    if (activeTab === 'misi') {
      return <MisiScreen userName="Developer" character="Laki-laki" onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} />;
    }

    if (activeTab === 'jelajah') {
      return <JelajahScreen userName="Developer" character="Laki-laki" onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
    }

    if (activeTab === 'ar') {
      return <ARScreen userName="Developer" character="Laki-laki" onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} />;
    }

    if (activeTab === 'profil') {
      return <ProfileScreen userName="Developer" character="Laki-laki" onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} />;
    }
    
    return <HomeScreen userName="Developer" character="Laki-laki" onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
  }

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return <OnboardingScreen onLogin={handleGoogleLogin} />;
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
  if (activeTab === 'misi') {
    return <MisiScreen userName={userName} character={character} onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} />;
  }

  if (activeTab === 'jelajah') {
    return <JelajahScreen userName={userName} character={character} onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
  }

  if (activeTab === 'ar') {
    return <ARScreen userName={userName} character={character} onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} />;
  }

  if (activeTab === 'profil') {
    return <ProfileScreen userName={userName} character={character} onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} />;
  }

  // Dashboard / Native Home
  return <HomeScreen userName={userName} character={character} onNotificationClick={() => setShowNotifications(true)} onTabChange={setActiveTab} onSilaSelect={setActiveSila} />;
}

export default App;
