import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/RainbowButton';
import Typewriter from 'typewriter-effect';
import { Step } from '@/App';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';
import CheckIcon from '@/components/ui/CheckIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageSectionProps {
  name: string;
  obstacles: string[];
  setCurrentStep: (step: Step) => void;
}

const getMessageFlow = (name: string, obstacles: string[]) => {
  const flows: { [key: string]: { text: string; imageUrl: string | null; details?: { title?: string; description?: string; features: string[]; final_text?: string } } } = {
    'Todas as alternativas acima, o negócio está feio': {
      text: `${name}, se o atendimento tá caótico, a equipe sobrecarregada e os leads sumindo… não é falta de talento, é falta de estrutura. A boa notícia é que dá pra resolver tudo isso de uma vez. Nosso ecossistema de Raciocínio Autônomo Avançado integra captação, atendimento e operação num só fluxo. Quer descobrir quanto o seu negócio tá perdendo por ainda não rodar nesse nível?`,
      imageUrl: null,
    },
    'Dor de cabeça com atendimento no WhatsApp': {
      text: `${name}, me diz uma coisa… você também sente que o WhatsApp virou o coração do negócio, né? Quando ele para, parece que tudo para junto. A boa notícia é que dá pra resolver isso sem depender de ninguém. Hoje já existe uma IA que responde, qualifica e agenda clientes pra você, sem folga, 24h por dia. Quer que eu te mostre quanto isso tá te custando por ainda fazer tudo manual?`,
      imageUrl: 'https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/1%201.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yLzEgMS5wbmciLCJpYXQiOjE3NjAzNjQ3ODYsImV4cCI6MjEwNzI2MDc4Nn0.ViB8ZfXJG06prEAB2RwDe7DNDTm3j_YpCT9z1r6tGQc',
      details: {
        title: 'Agente IA SDR (Especialista em atender, qualificar e agendar)',
        description: 'Vai assumir 100% do seu WhatsApp. Ele trabalha 24/7.',
        features: [
          'Ele nunca se cansa.',
          'Responde instantaneamente.',
          'Filtra, qualifica e agenda.',
          'As reuniões simplesmente \"aparecem\" na sua agenda.',
          'Manipula seu CRM kanban, tags, campos, notas, etc.',
        ],
        final_text: 'E muito mais funçoes.',
      },
    },
    'Preciso sair do operacional do meu negócio e não consigo': {
      text: `${name}, posso ser sincero? O dono não nasceu ser o funcionário que mais trabalha na empresa, afinal você abriu um negoco para trabalhar menos e ter mais liberdade. Automatizar alguns processos pode te dar esse tempo valioso que perde no operacional mesmo sendo dono, mas é o que acaba acontecendo quando tudo depende de você. Com uma IA operacional cuidando do repetitivo, você recupera tempo, energia e até lucro que nem percebia estar perdendo. Quer ver na prática, quanto isso representa no seu caso?`,
      imageUrl: 'https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/2%201.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yLzIgMS5wbmciLCJpYXQiOjE3NjAzNjQ4MzIsImV4cCI6MjEwNzI2MDgzMn0.Y5y2MfcCxphf2K_3-IpJIprhFzh68NVcROj5cQ_EfEE',
      details: {
        features: [
          'Inteligencias Artificiais que utilizam RAA para reduzir a carga operacional',
          'Ferramentas e softwares desenvolvidos por nós',
          'Ecossistema automatizado com RAA',
        ],
      },
    },
    'Meu time está sobrecarregado, preciso de IA': {
      text: `${name}, sabe quando o time tá no limite e, mesmo assim, parece que o trabalho só cresce? Pois é… não é falta de esforço, é falta de automação. Com agentes internos de IA, dá pra aliviar a carga da equipe e deixar eles focarem no que realmente importa. Quer que eu calcule quanto isso poderia economizar na sua folha?`,
      imageUrl: 'https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/3%201.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yLzMgMS5wbmciLCJpYXQiOjE3NjAzNjQ4NTEsImV4cCI6MjEwNzI2MDg1MX0.9-yIL8VTMxsXZDLkr-FhuEeobhJ7VicMogczzFBFBq8',
      details: {
        features: [
          'Inteligencias Artificiais que utilizam RAA para reduzir a carga operacional',
          'Ferramentas e softwares desenvolvidos por nós',
          'Ecossistema automatizado com RAA',
        ],
      },
    },
    'Não tenho um funil de captação que gere leads todos os dias': {
      text: `${name}, sem novos contatos, qualquer negócio fica refém da sorte. O que poucos percebem é que dá pra gerar conversas reais todos os dias com o público certo de forma automática. Nosso Agente de Prospecção faz exatamente isso, enquanto você foca em atender. Quer ver quanto dinheiro tá ficando na mesa por não ter isso rodando ainda?`,
      imageUrl: 'https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/4%201.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yLzQgMS5wbmciLCJpYXQiOjE3NjAzNjQ4NjgsImV4cCI6MjEwNzI2MDg2OH0.HNiQBWU-2KD4ep0oFczVuJZUtroP4dA2UraqLnttFiU',
      details: {
        features: [
          'Inteligencias Artificiais que utilizam RAA para prospectar clientes',
          'Ferramentas e softwares desenvolvidas para trazer clientes ideais',
          'Ecossistema automatizado com RAA com máxima capacidade e eficiencia',
        ],
      },
    },
  };

  if (obstacles.includes('Todas as alternativas acima, o negócio está feio')) {
    return flows['Todas as alternativas acima, o negócio está feio'];
  }

  for (const obstacle of obstacles) {
    if (flows[obstacle]) {
      return flows[obstacle];
    }
  }

  return { text: "Selecione uma opção para ver sua mensagem.", imageUrl: null };
};

const MessageSection = ({ name, obstacles, setCurrentStep }: MessageSectionProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const message = getMessageFlow(name, obstacles);

  const handleNoClick = () => {
    if (showConfirmation) {
      setCurrentStep('rejection');
    } else {
      setShowConfirmation(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatedSection stepKey="message" className="w-full flex flex-col items-center p-4">
      {!isConfirmed ? (
        <div className="w-full max-w-2xl flex flex-col items-center">
          <div className="w-full text-left mb-8">
            <h2 className="text-[19px] font-normal mb-4 text-white leading-relaxed">
              A partir de hoje você vai parar de andar em círculos e de uma vez por todas utilizar a inteligência artificial ao seu favor para controlar o seu próprio negócio e escalar com mais lucro e previsibilidade.
            </h2>
          </div>
          <img src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/correndo-em-circulos.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvY29ycmVuZG8tZW0tY2lyY3Vsb3MuZ2lmIiwiaWF0IjoxNzYwMzMxNTMxLCJleHAiOjIxMDcyMjc1MzF9.bLUhm0UbITG9tb1HwzL6hgNv0sUNQUQtswheur0i2hc" alt="Visual representation" className="w-full rounded-lg" />
          <div className="w-full mt-8 flex justify-center">
            <RainbowButton onClick={() => setIsConfirmed(true)} className="h-auto text-white px-12 py-4">
              Vou encarar sem medo 🦾
            </RainbowButton>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl text-white text-lg text-left leading-loose mb-8">

          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(message.text)
                .callFunction(() => {
                  setTypingFinished(true);
                })
                .start();
            }}
            options={{
              delay: 40,
              cursor: '',
            }}
          />
          <div className="mt-8">
            <AnimatePresence>
              {typingFinished && message.imageUrl && (
                <motion.img
                  key="message-image"
                  src={message.imageUrl}
                  alt="Fluxo"
                  className="w-full max-w-md mb-8 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              )}
              {typingFinished && message.details && (
                <motion.div
                  key="message-details"
                  className="text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {message.details.title && <h3 className="font-bold text-xl mb-4">{message.details.title}</h3>}
                  {message.details.description && <p className="mb-4">{message.details.description}</p>}
                  <ul className="space-y-2">
                    {message.details.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckIcon className="w-6 h-6 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {message.details.final_text && <p className="mt-4 font-bold">{message.details.final_text}</p>}
                </motion.div>
              )}
              {typingFinished && (
                <motion.div
                  key="message-buttons"
                  className="mt-8 flex w-full gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button onClick={() => setCurrentStep('diagnostic')} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg h-auto shadow-green-glow transition-all duration-300">
                    SIM
                  </Button>
                  <Button onClick={handleNoClick} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg h-auto transition-all duration-300">
                    {showConfirmation ? 'TEM CERTEZA?' : 'NAO'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default MessageSection;