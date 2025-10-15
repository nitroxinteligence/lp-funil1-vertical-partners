import { Step } from '@/App';
import { AnimatedSection } from '@/components/ui/AnimatedSectionWrapper';
import { RainbowButton } from '@/components/ui/RainbowButton';

interface RejectionSectionProps {
  setCurrentStep: (step: Step) => void;
}

const RejectionSection = ({ setCurrentStep }: RejectionSectionProps) => {
  return (
    <AnimatedSection stepKey="rejection" className="w-full flex flex-col items-center p-4 text-center text-white">
      <h2 className="text-6xl font-light mb-4">Você tem certeza?</h2>
      <p className="text-lg mb-8">A oportunidade de transformar seu negócio está a um passo de distância.</p>
      <RainbowButton onClick={() => setCurrentStep('diagnostic')} className="h-auto text-white px-12 py-4">
        Quero prosseguir!!!
      </RainbowButton>
    </AnimatedSection>
  );
};

export default RejectionSection;
