import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import InitialSection from "./components/sections/InitialSection";
import Footer from "./components/Footer";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

export type Step = 'form' | 'sound' | 'qualification' | 'obstacle' | 'message' | 'rejection' | 'solution' | 'diagnostic';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [leadName, setLeadName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedObstacles, setSelectedObstacles] = useState<string[]>([]);
  const [instagramProfile, setInstagramProfile] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleAdvance = (step: Step) => {
    if (step === 'sound' && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Ambient audio failed", e));
    }
    setCurrentStep(step);
  };

  const handleBack = () => {
    if (currentStep === 'solution') {
      setCurrentStep('message');
    } else if (currentStep === 'rejection') {
      setCurrentStep('message');
    } else if (currentStep === 'message') {
      setCurrentStep('obstacle');
    } else if (currentStep === 'obstacle') {
      setCurrentStep('qualification');
    } else if (currentStep === 'qualification') {
      setCurrentStep('sound');
    } else if (currentStep === 'sound') {
      setCurrentStep('form');
    }
  };

  if (path === '/politicas') {
    return <PrivacyPolicyPage />;
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex flex-col">
      <audio ref={audioRef} src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/lp-sound.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvbHAtc291bmQubXAzIiwiaWF0IjoxNzYwMzg5MDI4LCJleHAiOjIxMDcyODUwMjh9.1qWUqVH5pwuhRew2L0B027r_6v4rehiwyu5AzwNomCE" loop />
      <Header onBackClick={handleBack} currentStep={currentStep} />
      <main className="flex-grow pt-16 flex items-center justify-center py-16">
        <InitialSection
          currentStep={currentStep}
          setCurrentStep={handleAdvance}
          leadName={leadName}
          setLeadName={setLeadName}
          whatsapp={whatsapp}
          setWhatsapp={setWhatsapp}
          instagram={instagram}
          setInstagram={setInstagram}
          industry={industry}
          setIndustry={setIndustry}
          selectedObstacles={selectedObstacles}
          setSelectedObstacles={setSelectedObstacles}
          audioRef={audioRef}
          instagramProfile={instagramProfile}
          setInstagramProfile={setInstagramProfile}
          customMessage={customMessage}
          setCustomMessage={setCustomMessage}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;