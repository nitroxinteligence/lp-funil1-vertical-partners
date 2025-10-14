import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import { Step } from "@/App";

interface HeaderProps {
  onBackClick: () => void;
  currentStep: Step;
}

const Header = ({ onBackClick, currentStep }: HeaderProps) => {
  if (currentStep === 'form') {
    return null; // Don't render anything on the first step
  }

  return (
    <div className="fixed top-4 left-8 z-50">
      <Button
        onClick={onBackClick}
        variant="ghost"
        className="group bg-transparent text-[#b2b2b2] hover:bg-transparent p-0"
      >
        <ArrowLeftIcon className="h-6 w-0 opacity-0 text-[#efe2ba] transition-all duration-300 group-hover:w-6 group-hover:opacity-100 group-hover:mr-2" />
        <span>VOLTAR</span>
      </Button>
    </div>
  );
};

export default Header;

