[dev:vite]   ➜  Local:   http://localhost:5173/
[dev:vite]   ➜  Network: use --host to expose
[dev:api] [dotenv@17.2.3] injecting env (3) from .env -- tip: ⚙️  override existing env vars with { override: true }
[dev:api] [API Server] Listening on http://localhost:3001
[dev:api] [API /instagram-lookup] Calling RapidAPI for username: mats.ia
[dev:api] [API /instagram-lookup] Successfully fetched data from RapidAPI.
[dev:api] [API /instagram-lookup] Calling OpenAI to generate custom message...
[dev:api] [API /instagram-lookup] Successfully generated custom message.
[dev:api] [API /generate-diagnostic] Received request: {
[dev:api]   name: 'Mateus',
[dev:api]   whatsapp: '(81) 98298-6181',
[dev:api]   instagram: 'mats.ia',
[dev:api]   site: '',
[dev:api]   industry: 'Dono de Clínica médica, estética ou saúde',
[dev:api]   obstacles: [ 'Preciso sair do operacional do meu negócio e não consigo' ],
[dev:api]   instagramProfile: {
[dev:api]     fullName: 'Mateus',
[dev:api]     username: 'mats.ia',
[dev:api]     biography: '♾️ Fundador da Vertical Lex\n' +
[dev:api]       '⚜️ Implementando Ecossistemas de inteligência artificial para Advogados \n' +
[dev:api]       '↓ Teste o nosso Agente',
[dev:api]     followers: 4733,
[dev:api]     profilePicUrl: 'https://scontent-cdg4-1.cdninstagram.com/v/t51.2885-19/524754517_18051583328396488_2690550161479251329_n.jpg?stp=dst-jpg_e0_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2QGuyJ3JMWpFmNlgD1svQAnUyO7sDLEqYr9fogRbAxeRJEBtHvKL9AK-U2bMfovKUtY&_nc_ohc=4_ha-pG1uaAQ7kNvwFGXhor&_nc_gid=6gP8FeMCcJp2ilMHrqMPAg&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfdvA3gEEpiyO5joc9MR89mUxhs5234gw6cx41Da_uFv4w&oe=68F44DDC&_nc_sid=10d13b'
[dev:api]   }
[dev:api] }
[dev:api] [API /generate-diagnostic] Calling OpenAI with new prompt...
[dev:api] [API /generate-diagnostic] Received request: {
[dev:api]   name: 'Mateus',
[dev:api]   whatsapp: '(81) 98298-6181',
[dev:api]   instagram: 'mats.ia',
[dev:api]   site: '',
[dev:api]   industry: 'Dono de Clínica médica, estética ou saúde',
[dev:api]   obstacles: [ 'Preciso sair do operacional do meu negócio e não consigo' ],
[dev:api]   instagramProfile: {
[dev:api]     fullName: 'Mateus',
[dev:api]     username: 'mats.ia',
[dev:api]     biography: '♾️ Fundador da Vertical Lex\n' +
[dev:api]       '⚜️ Implementando Ecossistemas de inteligência artificial para Advogados \n' +
[dev:api]       '↓ Teste o nosso Agente',
[dev:api]     followers: 4733,
[dev:api]     profilePicUrl: 'https://scontent-cdg4-1.cdninstagram.com/v/t51.2885-19/524754517_18051583328396488_2690550161479251329_n.jpg?stp=dst-jpg_e0_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2QGuyJ3JMWpFmNlgD1svQAnUyO7sDLEqYr9fogRbAxeRJEBtHvKL9AK-U2bMfovKUtY&_nc_ohc=4_ha-pG1uaAQ7kNvwFGXhor&_nc_gid=6gP8FeMCcJp2ilMHrqMPAg&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfdvA3gEEpiyO5joc9MR89mUxhs5234gw6cx41Da_uFv4w&oe=68F44DDC&_nc_sid=10d13b'
[dev:api]   }
[dev:api] }
[dev:api] [API /generate-diagnostic] Calling OpenAI with new prompt...
[dev:api] [API /generate-diagnostic] Raw content from OpenAI: {
[dev:api]   "personalizedSummary": "Mateus, como proprietário de uma clínica no setor médico, estético ou de saúde, sua presença no Instagram demonstra um forte foco em inteligência artificial e inovação. No entanto, a dificuldade em se afastar das operações diárias indica uma oportunidade crucial para integrar IA e automação em seus processos. O ecossistema RAA da VX Company é a escolha lógica para impulsionar seu crescimento, liberando seu tempo para focar em expansão estratégica.",
[dev:api]   "timelineSolutions": [
[dev:api]     "**Automação de Processos Operacionais:** Implementaremos soluções automatizadas para minimizar tarefas repetitivas, permitindo que você se concentre em estratégias de crescimento.",
[dev:api]     "**Agentes de IA para Atendimento ao Cliente:** Nossos agentes estarão disponíveis 24/7 para lidar com consultas e solucionar problemas comuns, garantindo um serviço eficiente e contínuo."
[dev:api]   ]
[dev:api] }
[dev:api] [API /generate-diagnostic] Parsed diagnostic from OpenAI: {
[dev:api]   "personalizedSummary": "Mateus, como proprietário de uma clínica no setor médico, estético ou de saúde, sua presença no Instagram demonstra um forte foco em inteligência artificial e inovação. No entanto, a dificuldade em se afastar das operações diárias indica uma oportunidade crucial para integrar IA e automação em seus processos. O ecossistema RAA da VX Company é a escolha lógica para impulsionar seu crescimento, liberando seu tempo para focar em expansão estratégica.",
[dev:api]   "timelineSolutions": [
[dev:api]     "**Automação de Processos Operacionais:** Implementaremos soluções automatizadas para minimizar tarefas repetitivas, permitindo que você se concentre em estratégias de crescimento.",
[dev:api]     "**Agentes de IA para Atendimento ao Cliente:** Nossos agentes estarão disponíveis 24/7 para lidar com consultas e solucionar problemas comuns, garantindo um serviço eficiente e contínuo."
[dev:api]   ]
[dev:api] }
[dev:api] [API /generate-diagnostic] Final diagnostic generated.
[dev:api] [API /generate-diagnostic] Raw content from OpenAI: 
[dev:api] {
[dev:api]   "personalizedSummary": "Mateus, ao analisar o cenário de sua clínica na indústria de saúde e estética, juntamente com sua expertise em inteligência artificial para advogados, é evidente que sua necessidade é sair do operacional para focar em áreas mais estratégicas. A integração de automação e IA é crucial para atingir essa meta, especialmente no ambiente dinâmico e exigente da saúde. O ecossistema RAA da VX Company é a solução lógica para otimizar suas operações e impulsionar o crescimento sustentável.",
[dev:api]   "timelineSolutions": [
[dev:api]     "**Automação de Processos Operacionais:** Implementaremos agentes de IA para automatizar tarefas administrativas na sua clínica, como agendamentos e gerenciamento financeiro, liberando seu tempo para decisões estratégicas.",
[dev:api]     "**Agentes de IA para Atendimento ao Cliente:** Nossos agentes fornecerão suporte 24/7 aos seus pacientes, garantindo resolução rápida para dúvidas comuns, melhorando a satisfação e fidelização.",
[dev:api]     "**Análise de Dados com IA:** Utilizaremos análises avançadas para extrair insights dos dados da clínica, otimizando suas estratégias de atendimento e marketing, permitindo uma operação mais eficiente e centrada no paciente."
[dev:api]   ]
[dev:api] }
[dev:api] [API /generate-diagnostic] Parsed diagnostic from OpenAI: {
[dev:api]   "personalizedSummary": "Mateus, ao analisar o cenário de sua clínica na indústria de saúde e estética, juntamente com sua expertise em inteligência artificial para advogados, é evidente que sua necessidade é sair do operacional para focar em áreas mais estratégicas. A integração de automação e IA é crucial para atingir essa meta, especialmente no ambiente dinâmico e exigente da saúde. O ecossistema RAA da VX Company é a solução lógica para otimizar suas operações e impulsionar o crescimento sustentável.",
[dev:api]   "timelineSolutions": [
[dev:api]     "**Automação de Processos Operacionais:** Implementaremos agentes de IA para automatizar tarefas administrativas na sua clínica, como agendamentos e gerenciamento financeiro, liberando seu tempo para decisões estratégicas.",
[dev:api]     "**Agentes de IA para Atendimento ao Cliente:** Nossos agentes fornecerão suporte 24/7 aos seus pacientes, garantindo resolução rápida para dúvidas comuns, melhorando a satisfação e fidelização.",
[dev:api]     "**Análise de Dados com IA:** Utilizaremos análises avançadas para extrair insights dos dados da clínica, otimizando suas estratégias de atendimento e marketing, permitindo uma operação mais eficiente e centrada no paciente."
[dev:api]   ]
[dev:api] }
[dev:api] [API /generate-diagnostic] Final diagnostic generated.
