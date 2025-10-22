interface VerticalPartnersLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const VerticalPartnersLogo = ({ className = "", width = 400, height = 60 }: VerticalPartnersLogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* VERTICAL */}
      <text
        x="0"
        y="45"
        fontSize="36"
        fontWeight="300"
        letterSpacing="2"
        fill="#C4A574"
        fontFamily="Arial, sans-serif"
      >
        VERTICAL
      </text>
      
      {/* PARTNERS */}
      <text
        x="200"
        y="45"
        fontSize="36"
        fontWeight="300"
        letterSpacing="2"
        fill="#C4A574"
        fontFamily="Arial, sans-serif"
      >
        PARTNERS
      </text>
    </svg>
  );
};

export default VerticalPartnersLogo;