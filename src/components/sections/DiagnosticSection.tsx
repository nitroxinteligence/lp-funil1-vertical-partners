import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';
import { Badge } from '@/components/ui/badge';
import TeamSection from './TeamSection';
import Modal from '../ui/Modal';
import Typewriter from 'typewriter-effect';
import { Button } from '../ui/button';
import { Timeline } from '../ui/Timeline';
import CheckIcon from '../ui/CheckIcon';
import { AiLoader } from '../ui/AiLoader';
import { RainbowButton } from '../ui/RainbowButton';
import { supabase } from '@/lib/supabase';
import api from '@/lib/api';

interface DiagnosticSectionProps {
  name: string;
  whatsapp: string;
  instagram: string;
  site: string;
  industry: string;
  obstacles: string[];
  instagramProfile: any;
  customMessage: string;
}

const DiagnosticSection: React.FC<DiagnosticSectionProps> = ({
  name,
  whatsapp,
  instagram,
  site,
  industry,
  obstacles,
  instagramProfile,
  customMessage,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrollModalOpen, setIsScrollModalOpen] = useState(false);
  const [hasScrollModalBeenShown, setHasScrollModalBeenShown] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollModalAudioRef = useRef<HTMLAudioElement>(null);

  // Define components inside the main component to ensure correct scope
  const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="bg-[#1a1a1a] p-4 rounded-lg text-center">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  );

  const ProfileStat = ({ value, label }: { value: string; label: string }) => (
    <div className="text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  );

  useEffect(() => {
    const generateDiagnostic = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.post('/generate-diagnostic', {
          name,
          whatsapp,
          instagram,
          site,
          industry,
          obstacles,
          instagramProfile,
        });

        if (response.status === 200) {
          const diagnosticData = response.data;
          setData(diagnosticData);

          // Após gerar o diagnóstico, envie os dados para o Supabase
          const { error: supabaseError } = await supabase
            .from('perfis_leads')
            .insert([
              {
                lead_name: name,
                whatsapp: whatsapp,
                instagram_username: instagramProfile?.username,
                instagram_bio: instagramProfile?.bio,
                instagram_followers: instagramProfile?.followers,
                industry: industry,
                obstacles: obstacles,
                diagnostic_summary: diagnosticData?.personalizedSummary,
              },
            ]);

          if (supabaseError) {
            console.error('Error saving lead to Supabase:', supabaseError);
            // Opcional: decidir se quer mostrar um erro para o usuário
          } else {
            console.log('Lead saved to Supabase successfully!');
          }

        } else {
          throw new Error(response.data.error || 'Falha ao gerar o diagnóstico.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    generateDiagnostic();
  }, [name, whatsapp, instagram, site, industry, obstacles, instagramProfile]);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode || loading) return;

    const handleScroll = () => {
      if (hasScrollModalBeenShown) return;
      const { top, height } = sectionNode.getBoundingClientRect();
      if (top < window.innerHeight * 0.7 && top + height > window.innerHeight * 0.3) {
        const scrolledPercentOfSection = (window.innerHeight - top) / height;
        if (scrolledPercentOfSection > 0.3) {
          setIsScrollModalOpen(true);
          setHasScrollModalBeenShown(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrollModalBeenShown, loading, data]);

  useEffect(() => {
    const backgroundAudio = audioRef.current;
    const modalAudio = scrollModalAudioRef.current;
    const handlePlay = () => { if (backgroundAudio) backgroundAudio.volume = 0.1; };
    const handleEnded = () => { if (backgroundAudio) backgroundAudio.volume = 1.0; };

    if (isScrollModalOpen && modalAudio) {
      modalAudio.play().catch(e => console.error("Scroll modal audio failed", e));
      modalAudio.addEventListener('play', handlePlay);
      modalAudio.addEventListener('ended', handleEnded);
    }
    return () => {
      if (modalAudio) {
        modalAudio.removeEventListener('play', handlePlay);
        modalAudio.removeEventListener('ended', handleEnded);
      }
    };
  }, [isScrollModalOpen, audioRef]);

  const timelineData = data ? [
    {
      title: "Descoberta",
      content: (
        <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
          <CardContent className="w-full p-6 rounded-2xl border border-[#323232] bg-[#141414]">
            <p>Você encontrou a VX Company através de tráfego pago, buscando soluções para escalar seu negócio.</p>
            <Badge variant="secondary" className="mt-4">Origem: Meta ADS</Badge>
          </CardContent>
        </Card>
      ),
    },
    {
      title: "Diagnóstico Personalizado",
      content: (
        <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
          <CardContent className="w-full p-6 rounded-2xl border border-[#323232] bg-[#141414]">
            <p>Aqui você entenderá como a VX Company vai transformar a sua operação utilizando nosso Ecossistema RAA.</p>
          </CardContent>
        </Card>
      ),
    },
    {
      title: "Próximos 30 dias",
      content: (
        <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
          <CardContent className="w-full p-6 rounded-2xl border border-[#323232] bg-[#141414]">
            <h3 className="text-xl font-bold text-white mb-4">Soluções</h3>
            <div className="space-y-4 text-neutral-300">
              {data.timelineSolutions.map((solution: string, index: number) => {
                const colonIndex = solution.indexOf(':');
                if (colonIndex === -1) {
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 mt-1 flex-shrink-0 text-custom-gold" />
                      <p>{solution}</p>
                    </div>
                  );
                }
                const rawTitle = solution.substring(0, colonIndex + 1);
                const description = solution.substring(colonIndex + 2);
                const title = rawTitle.replace(/\*\*/g, '');

                return (
                  <div key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 mt-1 flex-shrink-0 text-custom-gold" />
                    <p>
                      <strong className="text-white">{title}</strong> {description}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      title: "Em 30 dias",
      content: (
        <Card className="w-full p-2 rounded-3xl border border-[#141414] bg-transparent">
          <CardContent className="w-full p-6 rounded-2xl border border-[#323232] bg-[#141414]">
            <p className="mb-4">Seu negócio potencializado pela IA.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <StatCard value="+35%" label="em reuniões qualificadas" />
              <StatCard value="-80%" label="em tarefas operacionais" />
              <StatCard value="IA" label="Escalando sem inflar custos" />
              <StatCard value="+Leads" label="Mais leads qualificados" />
            </div>
          </CardContent>
        </Card>
      ),
    },
  ] : [];

  if (loading) {
    return <AiLoader text="Analisando..." />;
  }

  if (error) {
    return (
      <AnimatedSection stepKey="diagnostic-error" className="w-full flex flex-col items-center p-4 text-white text-center min-h-screen justify-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Ocorreu um Erro</h1>
        <p className="text-lg text-neutral-400">{error}</p>
      </AnimatedSection>
    );
  }

  return (
    <>
      <AnimatedSection ref={sectionRef} stepKey="diagnostic" className="w-full flex flex-col items-center p-4 text-white">
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-4xl md:text-7xl font-light text-center mb-12">Diagnóstico Personalizado para {name}</h1>

          {instagramProfile && (
            <Card className="w-full p-2 mb-12 rounded-3xl border border-[#141414] bg-transparent">
              <CardContent className="w-full p-8 rounded-2xl border border-[#323232] bg-[#141414]">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <img src={`${api.defaults.baseURL}/image-proxy?url=${encodeURIComponent(instagramProfile.profilePicUrl)}`} alt="Foto de Perfil" className="w-32 h-32 rounded-full object-cover border-2 border-neutral-700" />
                  <div className="flex-1">
                    <h2 className="text-3xl font-medium">@{instagramProfile.username}</h2>
                    <p className="text-neutral-400 mt-2 text-sm max-w-md mx-auto sm:mx-0">{instagramProfile.bio}</p>
                    <p className="text-neutral-300 whitespace-pre-wrap mt-4">{customMessage}</p>
                  </div>
                  <div className="border-l border-neutral-800 px-6">
                    <ProfileStat value={instagramProfile.followers || 'N/A'} label="Seguidores" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="w-full p-2 mb-12 rounded-3xl border border-[#141414] bg-transparent">
            <CardContent className="w-full p-8 rounded-2xl border border-[#323232] bg-[#141414]">
              <h3 className="text-3xl font-medium mb-4">{name}, o momento é agora!</h3>
              <p className="text-neutral-300 whitespace-pre-wrap">{data?.personalizedSummary || "Gerando seu diagnóstico personalizado..."}</p>
            </CardContent>
          </Card>

          <div className="mt-20">
            <h2 className="text-3xl md:text-6xl font-light text-center mb-12">Veja como foi e como será<br/> sua experiência conosco</h2>
            <Timeline data={timelineData} />
          </div>

          <TeamSection />

          <div className="mt-20 flex justify-center">
            <RainbowButton
              onClick={() => window.open('https://wa.me/5581982986181', '_blank')}
              className="h-auto text-white px-12 py-4"
            >
              Agendar Reunião
            </RainbowButton>
          </div>
        </div>
      </AnimatedSection>

      <Modal isOpen={isScrollModalOpen}>
        <audio ref={scrollModalAudioRef} src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/VX-C-AUDIO-1-2.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yL1ZYLUMtQVVESU8tMS0yLm1wMyIsImlhdCI6MTc2MDQwNTIwMywiZXhwIjoyMTA3MzAxMjAzfQ.hQ-qKhwUzakwJFeNoImFzrkoKH-3BVamkHwF6Kegdb4" />
        <Card className="w-full max-w-lg p-2 rounded-3xl border border-[#141414] bg-[#141414]">
          <CardContent className="w-full p-8 md:p-12 rounded-2xl border border-[#323232] text-white text-center">
            <div className="leading-relaxed text-2xl font-light">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Agora olha o seu WhatsApp, a brincadeira está apenas começando! 🔥")
                    .start();
                }}
                options={{
                  delay: 50,
                  cursor: '',
                }}
              />
            </div>
            <div className="mt-8">
              <Button onClick={() => setIsScrollModalOpen(false)} className="bg-custom-gold text-black font-bold py-2 px-8 rounded-lg h-auto">
                FECHAR
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default DiagnosticSection;