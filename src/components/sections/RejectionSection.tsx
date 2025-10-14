import { Step } from '@/App';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';
import { Button } from '@/components/ui/button';

interface RejectionSectionProps {
  setCurrentStep: (step: Step) => void;
}

const RejectionSection = ({ setCurrentStep }: RejectionSectionProps) => {
  return (
    <AnimatedSection stepKey="rejection" className="w-full flex flex-col items-center p-4 text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Você tem certeza?</h2>
      <p className="text-lg mb-8">A oportunidade de transformar seu negócio está a um passo de distância.</p>
      <Button onClick={() => setCurrentStep('message')} className="bg-custom-gold text-black font-bold py-2 px-8 rounded-lg h-auto">
        Voltar e Repensar
      </Button>
    </AnimatedSection>
  );
};

export default RejectionSection;
