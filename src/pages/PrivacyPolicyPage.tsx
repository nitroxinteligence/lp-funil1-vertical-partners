import Footer from "../components/Footer";
import Header from "../components/Header";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen flex flex-col text-white">
      <Header onBackClick={() => window.history.back()} currentStep="form" />
      <main className="flex-grow pt-16 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidade</h1>
          <div className="space-y-6 text-lg text-gray-300">
            <p>A sua privacidade é importante para nós. É política do Vertical Partners respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Vertical Partners, e outros sites que possuímos e operamos.</p>
            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
            <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
            <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
            <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
            <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
            <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre how lidamos com dados do usuário e informações pessoais, entre em contacto connosco.</p>
            <h2 className="text-2xl font-bold pt-4">Google AdSense</h2>
            <p>O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.</p>
            <p>Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.</p>
            <p>Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.</p>
            <p>Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.</p>
            <h2 className="text-2xl font-bold pt-4">Compromisso do Usuário</h2>
            <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Vertical Partners oferece no site e com caráter enunciativo, mas não limitativo:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
              <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
              <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Vertical Partners, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
            </ul>
            <h2 className="text-2xl font-bold pt-4">Mais informações</h2>
            <p>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</p>
            <p>Esta política é efetiva a partir de 17 October 2025 18:44</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
