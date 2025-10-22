// Mapeamento de áreas de atuação
const industryMapping: Record<string, string> = {
  'Dono de Escritório de Advocacia': 'Advogado',
  'Dono de Clínica médica, estética ou saúde': 'Profissional da Saúde',
  'Dono de imobiliária': 'Corretor de Imóveis'
};

// Mapeamento de obstáculos para soluções
const obstacleToSolutionMapping: Record<string, string> = {
  'Dor de cabeça com atendimento no WhatsApp': 'automação inteligente de atendimento no WhatsApp',
  'Preciso sair do operacional do meu negócio e não consigo': 'automação de processos operacionais e gestão estratégica',
  'Meu time está sobrecarregado, preciso de IA': 'implementação de Inteligência Artificial para otimização de equipe',
  'Não tenho um funil de captação que gere leads todos os dias': 'criação de funil de captação automatizado de leads',
  'Todas as alternativas acima, o negócio está feio': 'transformação digital completa com IA e automação'
};

/**
 * Gera uma mensagem personalizada para WhatsApp baseada na área de atuação e obstáculos
 * @param industry - Área de atuação do lead
 * @param obstacles - Array de obstáculos selecionados pelo lead
 * @returns Mensagem personalizada para WhatsApp
 */
export function generateWhatsAppMessage(industry: string, obstacles: string[]): string {
  // Mapeia a área de atuação
  const areaAtuacao = industryMapping[industry] || 'Empreendedor';
  
  // Mapeia os obstáculos para soluções
  const solucoes = obstacles
    .map(obstacle => obstacleToSolutionMapping[obstacle])
    .filter(Boolean) // Remove valores undefined
    .join(', ');
  
  // Se não há soluções mapeadas, usa uma mensagem genérica
  const solucoesTexto = solucoes || 'estratégias de marketing digital personalizadas';
  
  // Gera a mensagem personalizada
  const mensagem = `Opa, vim pelo site da Vertical Partners. Sou ${areaAtuacao} e preciso implementar ${solucoesTexto}.`;
  
  return encodeURIComponent(mensagem);
}

/**
 * Gera a URL completa do WhatsApp com a mensagem personalizada
 * @param phoneNumber - Número do WhatsApp (formato: 5581982986181)
 * @param industry - Área de atuação do lead
 * @param obstacles - Array de obstáculos selecionados pelo lead
 * @returns URL completa do WhatsApp
 */
export function generateWhatsAppURL(phoneNumber: string, industry: string, obstacles: string[]): string {
  const message = generateWhatsAppMessage(industry, obstacles);
  return `https://wa.me/${phoneNumber}?text=${message}`;
}