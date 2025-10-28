import { AnimatedContainer } from '../ui/animated-container';
import Orb from '../ui/Orb';

export default function TeamSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0 opacity-50">
        <Orb orbRadius={0.5} />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="relative z-10">
          {/* Componente O FUNDADOR */}
          <div className="flex justify-center mb-8">
            <div 
              style={{
                background: 'linear-gradient(135deg, #EFE2BA, #AA9372)',
                padding: '1px',
                borderRadius: '5px'
              }}
            >
              <div 
                className="px-6 py-3 text-white"
                style={{
                  backgroundColor: '#000000',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              >
                FUNDADORES
              </div>
            </div>
          </div>

          {/* Título */}
          <AnimatedContainer delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-center leading-tight tracking-tight text-white">
              Mentes por trás <br />da Vertical Partners
            </h2>
          </AnimatedContainer>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card do Mateus Paz */}
            <AnimatedContainer delay={0.6}>
              <div className="max-w-md mx-auto relative">
                <div className="relative z-10 mx-auto rounded-lg border p-4 shadow-lg ring-1 ring-[#141414] backdrop-blur-sm" style={{ borderColor: '#111111' }}>
                  <div className="relative rounded-lg border" style={{ backgroundColor: '#121212', borderColor: '#292929' }}>
                    <div className="w-full">
                      <img 
                        src="https://spciiyaefysixmfekpvo.supabase.co/storage/v1/object/sign/docs-lp-funil-1/img-mateus-m-perfil.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNTZlNzYwYS1kYzlmLTRjNzYtYTc3Ny0yN2M3ZTIyMTkzOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2NzLWxwLWZ1bmlsLTEvaW1nLW1hdGV1cy1tLXBlcmZpbC5qcGciLCJpYXQiOjE3NjExNzExMjksImV4cCI6MjEwODA2NzEyOX0.-VcRKL1l9JpW9Bdf_XHfg21z0estb8ezx0vYS_68bi0" 
                        alt="Mateus Paz" 
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="px-8 pb-8 pt-6 text-left">
                      <h3 className="text-xl mb-3" style={{ color: 'white', fontWeight: 500 }}>
                        Mateus Paz
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#c1c1c1' }}>
                        Sempre estive imerso no universo digital. Durante anos, como dono de empresas, tive o privilégio de escalar a minha empresa e também outras empresas, lado a lado com os empresários, auxiliando-os a estruturas seus negócios, tecnologias, estratégias de marketing e vendas. Essa jornada me permitiu adquirir bagagem e conhecimento suficiente para emergir no mundo das IAs, unindo toda a minha expertise para hoje ter a especialidade de criar as melhores e mais eficientes IAs para o seu negócio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>

            {/* Card do Gessyan Lion */}
            <AnimatedContainer delay={0.8}>
              <div className="max-w-md mx-auto relative">
                <div className="relative z-10 mx-auto rounded-lg border p-4 shadow-lg ring-1 ring-[#141414] backdrop-blur-sm" style={{ borderColor: '#111111' }}>
                  <div className="relative rounded-lg border" style={{ backgroundColor: '#121212', borderColor: '#292929' }}>
                    <div className="w-full">
                      <img 
                        src="https://spciiyaefysixmfekpvo.supabase.co/storage/v1/object/sign/docs-lp-funil-1/img-gessyan-l-perfil.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNTZlNzYwYS1kYzlmLTRjNzYtYTc3Ny0yN2M3ZTIyMTkzOGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2NzLWxwLWZ1bmlsLTEvaW1nLWdlc3N5YW4tbC1wZXJmaWwuSlBHIiwiaWF0IjoxNzYxMTcxMTU3LCJleHAiOjIxMDgwNjcxNTd9.VTfT_mzDhgOBEXYo96nqyZJjYTiwqhqx0ivpw9McKu4" 
                        alt="Gessyan Lion" 
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="px-8 pb-8 pt-6 text-left">
                      <h3 className="text-xl mb-3" style={{ color: 'white', fontWeight: 500 }}>
                        Gessyan Lion
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#c1c1c1' }}>
                        Prazer, eu sou o Lion. Casado, cristão e viciado em entender o que faz as pessoas dizerem “sim”. Há mais de 15 anos no mundo das vendas e 9 no digital. Minhas estratégias ajudaram empresas e experts a faturar mais de R$ 40 milhões. Hoje ensino negócios a escalar com IAs RAA que pensam, decidem e executam de forma mais humana e lucrativa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
