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
              As mentes por trás da VX Company
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
                        src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/img-2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yL2ltZy0yLmpwZyIsImlhdCI6MTc2MDQ2NDczMywiZXhwIjoyMTA3MzYwNzMzfQ.e-DbwC_qVXro_sqL26p4P6hi0IDAFU-IX0vb1NMwgd4" 
                        alt="Mateus Paz" 
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="px-8 pb-8 pt-6 text-left">
                      <h3 className="text-xl mb-3" style={{ color: 'white', fontWeight: 500 }}>
                        Mateus Paz
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#c1c1c1' }}>
                        Sempre estive imerso no universo jurídico. Durante anos, como dono de uma agência, tive o privilégio de trabalhar lado a lado com advogados, auxiliando-os a estruturar suas estratégias de marketing e vendas. Essa jornada me permitiu não apenas conhecer as suas dores, mas também desenvolver as soluções para superá-las.
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
                        src="https://nxbcmrqcadrgzhrengsc.supabase.co/storage/v1/object/sign/documents%20vision-site/docs-2/img-1.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTNhNjgzZC1kYmQwLTRiZDctOGUzMy1hYjZmMjEwZGNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMgdmlzaW9uLXNpdGUvZG9jcy0yL2ltZy0xLkpQRyIsImlhdCI6MTc2MDQ2NDY5OSwiZXhwIjoyMTA3MzYwNjk5fQ.MvnTuxhdCqqCKynBi4HMnaGs45C6VT56xiUBl3lLkR0" 
                        alt="Gessyan Lion" 
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="px-8 pb-8 pt-6 text-left">
                      <h3 className="text-xl mb-3" style={{ color: 'white', fontWeight: 500 }}>
                        Gessyan Lion
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#c1c1c1' }}>
                        Com vasta experiência em desenvolvimento de software e inteligência artificial, meu foco sempre foi criar tecnologias que resolvam problemas reais. Na VX Company, aplico esse conhecimento para construir um ecossistema que não apenas automatiza, mas redefine o que é possível em termos de eficiência e escala para nossos clientes.
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
