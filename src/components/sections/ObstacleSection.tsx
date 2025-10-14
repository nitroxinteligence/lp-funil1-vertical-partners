import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CheckIcon from '@/components/ui/CheckIcon';
import { Step } from '@/App';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';
import { RainbowButton } from '@/components/ui/RainbowButton';
import Modal from '@/components/ui/Modal';
import Typewriter from 'typewriter-effect';

interface ObstacleSectionProps {
  setCurrentStep: (step: Step) => void;
  setSelectedObstacles: (obstacles: string[]) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const ObstacleSection = ({ setCurrentStep, setSelectedObstacles, audioRef }: ObstacleSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [typingFinished, setTypingFinished] = useState(false);
  const modalAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const modalAudio = modalAudioRef.current;
    const backgroundAudio = audioRef.current;

    const handlePlay = () => {
      if (backgroundAudio) {
        backgroundAudio.volume = 0.1;
      }
    };

    const handleEnded = () => {
      if (backgroundAudio) {
        backgroundAudio.volume = 1.0;
      }
    };

    if (isModalOpen && modalAudio) {
      modalAudio.play().catch(error => console.error("Audio play failed", error));
      modalAudio.addEventListener('play', handlePlay);
      modalAudio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (modalAudio) {
        modalAudio.removeEventListener('play', handlePlay);
        modalAudio.removeEventListener('ended', handleEnded);
      }
    };
  }, [isModalOpen, audioRef]);


  const allOptions = [
    'Dor de cabeça com atendimento no WhatsApp',
    'Preciso sair do operacional do meu negócio e não consigo',
    'Meu time está sobrecarregado, preciso de IA',
    'Não tenho um funil de captação que gere leads todos os dias',
  ];
  const selectAllOption = 'Todas as alternativas acima, o negócio está feio';
  const options = [...allOptions, selectAllOption];

  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    if (option === selectAllOption) {
      // If "select all" is already in the selection, clear everything.
      // Otherwise, select all options.
      if (selected.includes(selectAllOption)) {
        setSelected([]);
      } else {
        setSelected([...allOptions, selectAllOption]);
      }
    } else {
      // For any other option, just select that single one.
      setSelected([option]);
    }
  };

  const handleContinue = () => {
    setSelectedObstacles(selected);
    setCurrentStep('message');
  };

  const modalText = `Você começou bem! 👍<br/><br/>Uma boa parte não toma essa atitude por medo, preguiça ou até mesmo achar que não precisa, mas quando se dá conta, está atolado no operacional, travado e sem conseguir escalar com previsibilidade.<br/><br/>Se você está pronto para implementar Inteligência artificial de verdade em seu negócio, este é o caminho.<br/><br/>Mas se você acha que já sabe de tudo e que não precisa de nós, recomendo sair dessa pagina, não perca o seu e muito menos o nosso tempo.<br/><br/>Você chegou até aqui, talvez possa ter acesso ao nosso Ecossistema RAA (raciocinio autônomo avançado).<br/><br/>Com certeza você será recompensado!`;



  return (
    <>
      <Modal isOpen={isModalOpen}>
        <audio ref={modalAudioRef} id="modal-audio" src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/VX-C-AUDIO-1-1.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yL1ZYLUMtQVVESU8tMS0xLm1wMyIsImlhdCI6MTc2MDM5Mzk3NiwiZXhwIjoyMTA3Mjg5OTc2fQ.BzS4Yp7MTi3j8ix8UWUjQCpuWUoIkTJFGrunxLSUgH8" autoPlay></audio>
        <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-[#141414]">
          <CardContent className="w-full p-8 md:p-12 rounded-2xl border border-[#323232] text-white text-left">
            <h2 className="text-2xl font-bold mb-4 text-center">ETAPA DESBLOQUEADA!</h2>
            <div className="leading-relaxed">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(modalText)
                    .callFunction(() => {
                      setTypingFinished(true);
                    })
                    .start();
                }}
                options={{
                  delay: 20,
                  cursor: '',
                }}
              />
            </div>
            {typingFinished && (
              <div className="mt-8 text-center">
                <RainbowButton onClick={() => setIsModalOpen(false)} className="h-auto text-white px-12 py-4">
                  Quero prosseguir ❤️
                </RainbowButton>
              </div>
            )}
          </CardContent>
        </Card>
      </Modal>

      <AnimatedSection stepKey="obstacle" className={`w-full flex flex-col items-center p-4 transition-filter duration-300 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="max-w-2xl w-full">
          <div className="w-full text-left mb-8">
            <h2 className="text-[19px] font-normal mb-4 text-white leading-relaxed">
              Qual é o maior obstáculo que você enfrenta atualmente?
            </h2>
          </div>
          <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
            <CardContent className="w-full p-8 md:p-12 rounded-2xl border border-[#323232] relative" style={{ backgroundColor: '#141414', boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)' }}>
              <div className="flex flex-col items-start gap-4">
                {options.map((option) => {
                  const isSelected = selected.includes(option);
                  return (
                    <Button
                      key={option}
                      variant="outline"
                      onClick={() => handleSelect(option)}
                      className={`w-full bg-transparent text-white px-6 py-8 rounded-lg text-left justify-start transition-all duration-300 flex items-center ${
                        isSelected
                          ? 'border-custom-gold'
                          : 'border-[#3D3D3D] hover:border-custom-gold'
                      }`}
                    >
                      <CheckIcon
                        className={`transition-all duration-300 ease-in-out text-custom-gold ${
                          isSelected ? 'w-6 opacity-100 mr-4' : 'w-0 opacity-0'
                        }`}
                      />
                      <span>{option}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          {selected.length > 0 && (
            <div className="mt-8 flex justify-center">
              <RainbowButton onClick={handleContinue} className="h-auto text-white px-12 py-4">
                Continuar 🔥
              </RainbowButton>
            </div>
          )}
        </div>
      </AnimatedSection>
    </>
  );
};

export default ObstacleSection;