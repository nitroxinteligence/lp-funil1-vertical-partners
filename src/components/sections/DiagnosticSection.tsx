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
            .from('leads_funil_1')
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
            <p>Você encontrou a Vertical Partners através de tráfego pago, buscando soluções para escalar seu negócio.</p>
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
            <p>Aqui você entenderá como a Vertical Partners vai transformar a sua operação utilizando nosso Ecossistema RAA.</p>
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
              <h3 className="text-3xl font-medium mb-4">O momento é agora!</h3>
              <p className="text-neutral-300 whitespace-pre-wrap">{data?.personalizedSummary || "Gerando seu diagnóstico personalizado..."}</p>
            </CardContent>
          </Card>

          <div className="mt-20">
            <h2 className="text-3xl md:text-6xl font-light text-center mb-12">Veja como foi e como será<br/> sua experiência conosco</h2>
            <Timeline data={timelineData} />
          </div>

          <TeamSection />

          <div className="mt-20 flex justify-center">
            <Card className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.088"/>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 font-medium">
                  Nossa Agente IA te enviou uma mensagem agora mesmo no WhatsApp.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      <Modal isOpen={isScrollModalOpen} onClose={() => setIsScrollModalOpen(false)}>
        <audio ref={scrollModalAudioRef} src="https://spciiyaefysixmfekpvo.supabase.co/storage/v1/object/sign/docs-lp-funil-1/audio-final-lp-funil-1.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNTZlNzYwYS1kYzlmLTRjNzYtYTc3Ny0yN2M3ZTIyMTkzOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2NzLWxwLWZ1bmlsLTEvYXVkaW8tZmluYWwtbHAtZnVuaWwtMS5tcDMiLCJpYXQiOjE3NjExNzExNzYsImV4cCI6MjEwODA2NzE3Nn0.mhRjxoGLLG8Oof1T3b6YbtZHexPMcT5M9fN8jpZClUo" autoPlay />
        <Card className="w-full max-w-lg p-2 rounded-3xl border border-[#141414] bg-[#141414]">
          <CardContent className="w-full p-8 md:p-12 rounded-2xl border border-[#323232] text-white text-center">
            <div className="leading-relaxed text-2xl font-light">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Agora olha o seu WhatsApp, a brincadeira está apenas começando!")
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