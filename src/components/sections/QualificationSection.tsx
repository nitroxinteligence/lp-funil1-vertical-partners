import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CheckIcon from '@/components/ui/CheckIcon';
import { RainbowButton } from '@/components/ui/RainbowButton';
import { Step } from '@/App';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';
import Modal from '../ui/Modal';
import { Input } from '../ui/input';
import api from '@/lib/api';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

interface QualificationSectionProps {
  setCurrentStep: (step: Step) => void;
  setIndustry: (industry: string) => void;
  setInstagramProfile: (profile: any) => void;
  setInstagram: (handle: string) => void;
  leadName: string;
  setCustomMessage: (message: string) => void;
}

const QualificationSection = ({ setCurrentStep, setIndustry, setInstagramProfile, setInstagram, leadName, setCustomMessage }: QualificationSectionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isInstaModalOpen, setIsInstaModalOpen] = useState(false);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalStep, setModalStep] = useState('input'); // 'input' | 'result'
  const [profileData, setProfileData] = useState<any>(null);
  const [localCustomMessage, setLocalCustomMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

  useEffect(() => {
    // Open the modal automatically when the component mounts
    setIsInstaModalOpen(true);
  }, []);

  const handleInstagramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instagramHandle) return;

    setIsLoading(true);
    setError(null);
    setInstagram(instagramHandle); // Save the handle to the main state

    try {
      // 1. Fetch Instagram Profile
      const lookupResponse = await api.post('/instagram-lookup', { username: instagramHandle });
      if (lookupResponse.status !== 200 || !lookupResponse.data.profileData) {
        throw new Error('Não foi possível encontrar o perfil do Instagram.');
      }
      const fetchedProfileData = lookupResponse.data.profileData;
      setProfileData(fetchedProfileData);
      setInstagramProfile(fetchedProfileData); // Update parent state

      // 2. Generate Personalized Message
      const messageResponse = await api.post('/generate-insta-message', { profileData: fetchedProfileData });
      if (messageResponse.status !== 200 || !messageResponse.data.customMessage) {
        throw new Error('Não foi possível gerar a mensagem personalizada.');
      }
      const finalMessage = messageResponse.data.customMessage.replace(/"/g, '');
      setLocalCustomMessage(finalMessage);
      setCustomMessage(finalMessage);

      setModalStep('result');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const options = [
    'Dono de Escritório de Advocacia',
    'Dono de Clínica médica, estética ou saúde',
    'Dono de imobiliária',
  ];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIndustry(option);
  };

  return (
    <>
      <AnimatedSection stepKey="qualification" className="w-full flex flex-col items-center p-4">
        <div className="w-full max-w-2xl">
          <div className="w-full text-left mb-8">
            <h2 className="text-[19px] font-normal mb-4 text-white leading-relaxed">
              Para que consigamos personalizar ao máximo a sua experiência, em qual área você está atualmente:
            </h2>
          </div>
          <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
            <CardContent className="w-full p-8 md:p-12 rounded-2xl border border-[#323232] relative" style={{ backgroundColor: '#141414', boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)' }}>
              <div className="flex flex-col items-start gap-4">
                {options.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    onClick={() => handleSelect(option)}
                    className={`w-full bg-transparent text-white px-6 py-8 rounded-lg text-left justify-start transition-all duration-300 flex items-center ${
                      selectedOption === option
                        ? 'border-custom-gold'
                        : 'border-[#3D3D3D] hover:border-custom-gold'
                    }`}
                  >
                    <CheckIcon
                      className={`transition-all duration-300 ease-in-out text-custom-gold ${
                        selectedOption === option ? 'w-6 opacity-100 mr-4' : 'w-0 opacity-0'
                      }`}
                    />
                    <span>{option}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          {selectedOption && (
            <div className="mt-8 flex justify-center">
              <RainbowButton
                onClick={() => setCurrentStep('obstacle')}
                className="h-auto text-white px-12 py-4"
              >
                Continuar 🔥
              </RainbowButton>
            </div>
          )}
        </div>
      </AnimatedSection>

      <Modal isOpen={isInstaModalOpen}>
        <Card className="w-full max-w-lg p-2 rounded-3xl border border-[#141414] bg-[#141414]">
          <CardContent className="w-full p-8 rounded-2xl border border-[#323232] bg-[#141414] text-center">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <motion.h1
                  className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-base font-regular text-transparent"
                  initial={{ backgroundPosition: "200% 0" }}
                  animate={{ backgroundPosition: "-200% 0" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                >
                  Analisando seu perfil...
                </motion.h1>
              </div>
            ) : modalStep === 'input' ? (
              <>
                <h2 className="text-2xl font-medium text-white mb-4">Mais uma coisinha, {leadName}...</h2>
                <p className="text-neutral-400 mb-6">
                  Vamos nos conectar! <br /> Qual o seu instagram? Isso nos ajuda a melhorar < br/>ainda mais a sua experiência.
                </p>
                <form onSubmit={handleInstagramSubmit} className="flex flex-col gap-4">
                  <Input
                    placeholder="@seuusuario"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    className="bg-[#202020] border-[#3D3D3D] text-white p-4 rounded-lg placeholder:text-neutral-600 h-12 text-center"
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  <RainbowButton type="submit" className="h-auto text-white px-12 py-3" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Conectando...
                      </div>
                    ) : (
                      'Conectar instagram'
                    )}
                  </RainbowButton>
                </form>
              </>
            ) : (
              profileData && (
                <>
                  <img src={`${api.defaults.baseURL}/image-proxy?url=${encodeURIComponent(profileData.profilePicUrl)}`} alt="Foto de Perfil" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-custom-gold" />
                  <h2 className="text-2xl font-bold text-white">{profileData.fullName}</h2>
                  <p className="text-sm text-neutral-400 mb-4">@{profileData.username} • {profileData.followers} seguidores</p>
                  <div className="text-white my-6 text-lg leading-relaxed">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString(localCustomMessage)
                          .callFunction(() => {
                            setIsTypewriterComplete(true);
                          })
                          .start();
                      }}
                      options={{ delay: 40, cursor: '' }}
                    />
                  </div>
                  {isTypewriterComplete && (
                    <RainbowButton onClick={() => setIsInstaModalOpen(false)} className="h-auto text-white px-12 py-3">
                      CONTINUAR! 🧠
                    </RainbowButton>
                  )}
                </>
              )
            )}
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default QualificationSection;