import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IMaskInput } from 'react-imask';
import { RainbowButton } from '@/components/ui/RainbowButton';
import QualificationSection from './QualificationSection';
import ObstacleSection from './ObstacleSection';
import MessageSection from './MessageSection';
import RejectionSection from './RejectionSection';
import DiagnosticSection from './DiagnosticSection';
import { Step } from '@/App';
import { AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  whatsapp: z.string().min(10, { message: "Por favor, insira um telefone válido." }),
});

type FormData = z.infer<typeof formSchema>;

interface InitialSectionProps {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  leadName: string;
  setLeadName: (name: string) => void;
  whatsapp: string;
  setWhatsapp: (whatsapp: string) => void;
  instagram: string;
  setInstagram: (instagram: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
  selectedObstacles: string[];
  setSelectedObstacles: (obstacles: string[]) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  instagramProfile: any;
  setInstagramProfile: (profile: any) => void;
  customMessage: string;
  setCustomMessage: (message: string) => void;
}

const InitialSection = ({
  currentStep,
  setCurrentStep,
  leadName,
  setLeadName,
  whatsapp,
  setWhatsapp,
  instagram,
  setInstagram,
  industry,
  setIndustry,
  selectedObstacles,
  setSelectedObstacles,
  audioRef,
  instagramProfile,
  setInstagramProfile,
  customMessage,
  setCustomMessage,
}: InitialSectionProps) => {
  const [countdown, setCountdown] = useState(5);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", whatsapp: "" },
  });

  const onSubmit = (data: FormData) => {
    const firstName = data.name.split(' ')[0];
    setLeadName(firstName);
    setWhatsapp(data.whatsapp);
    setCurrentStep('sound');
  };

  useEffect(() => {
    if (currentStep === 'sound') {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (countdown === 0 && currentStep === 'sound') {
      setCurrentStep('qualification');
    }
  }, [countdown, currentStep, setCurrentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 'form':
        return (
          <AnimatedSection stepKey="form" className="w-full flex flex-col items-center p-4">
            <div className="text-center mb-8">
              <h2 className="text-6xl font-light mb-4 text-white" style={{ lineHeight: '1.3' }}>
                Nós iremos diminuir a carga operacional, <br /> aumentar o ROI e escalar a sua operaçao<br /> utilizando nosso Ecossistema RAA
              </h2>
              <p className="text-md md:text-lg text-[#929292]">
                O que irei te provar vai além de automações e simples inteligências artificiais
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
                <CardContent className="w-full p-8 md:p-12 rounded-2xl border border-[#323232] relative" style={{ backgroundColor: '#141414', boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)' }}>
                  <p className="text-[#929292] text-center mb-8">Preencha os campos abaixo e vamos iniciar!</p>
                  <form id="lead-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input placeholder="Nome" {...register("name")} className="bg-[#202020] border-[#3D3D3D] text-white p-4 rounded-lg placeholder:text-neutral-600 h-10" />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <IMaskInput
                          mask="(00) 00000-0000"
                          onAccept={(value: any) => setValue('whatsapp', value)}
                          placeholder="WhatsApp com DDD"
                          className="w-full bg-[#202020] border border-[#3D3D3D] text-white p-4 rounded-lg placeholder:text-neutral-600 h-10"
                        />
                        {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>}
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <div className="mt-8 flex justify-center">
                <RainbowButton form="lead-form" type="submit" className="h-auto text-white px-12 py-4">
                  Quero inciar agora
                </RainbowButton>
              </div>
            </div>
          </AnimatedSection>
        );
      case 'sound':
        return (
          <AnimatedSection stepKey="sound" className="w-full flex flex-col items-center p-4">
            <h2 className="text-5xl font-light mb-8 text-white text-center">Aumente o som para melhorar< br/> sua experiência</h2>
            <Card className="max-w-xs w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
              <CardContent className="w-full p-8 md:p-12 rounded-2xl border border-[#323232] text-white text-center" style={{ backgroundColor: '#141414', boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)' }}>
                <p className="text-7xl font-bold">{String(countdown).padStart(2, '0')}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        );
      case 'qualification':
        return <QualificationSection key="qualification" setCurrentStep={setCurrentStep} setIndustry={setIndustry} setInstagramProfile={setInstagramProfile} setInstagram={setInstagram} leadName={leadName} setCustomMessage={setCustomMessage} />;
      case 'obstacle':
        return <ObstacleSection key="obstacle" setCurrentStep={setCurrentStep} setSelectedObstacles={setSelectedObstacles} audioRef={audioRef} />;
      case 'message':
        return <MessageSection key="message" name={leadName} obstacles={selectedObstacles} setCurrentStep={setCurrentStep} />;
      case 'rejection':
        return <RejectionSection key="rejection" setCurrentStep={setCurrentStep} />;
      case 'diagnostic':
        return <DiagnosticSection
          key="diagnostic"
          name={leadName}
          whatsapp={whatsapp}
          instagram={instagram}
          site=""
          industry={industry}
          obstacles={selectedObstacles}
          instagramProfile={instagramProfile}
          customMessage={customMessage}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </>
  );
};

export default InitialSection;
