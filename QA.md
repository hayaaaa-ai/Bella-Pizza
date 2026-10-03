# Verificação da primeira etapa

Revisão realizada em 2–3 de outubro de 2026.

- Testes: 10/10 aprovados; falhas observadas antes das implementações de regras, armazenamento e revalidação do checkout, seguidas de aprovação.
- TypeScript: `tsc --noEmit`, sem erros.
- Lint do código de produto: sem erros; três recomendações genéricas de next/image. As fotos possuem WebP, srcset, dimensões reservadas e loading apropriado; o logo é pequeno e estático.
- Home e cardápio: 320, 360, 375, 390, 412, 430, 768, 1024, 1280, 1440 e 1920 px, sem overflow horizontal. Composição completa revisada em desktop e mobile; marca, headline, CTA e foto visíveis na primeira tela de 390 px.
- Produto/carrinho: variante, adicional, observação, quantidade, subtotal em centavos, edição, remoção, carrinho vazio e persistência após recarga conferidos pela interface.
- Acessibilidade: Tab contido no diálogo, fundo bloqueado, Escape e retorno do foco conferidos. CSS inclui safe area e reduced motion. Rede lenta e zoom de texto não foram emulados; não há resultado Lighthouse.
- Checkout: identificação inválida, entrega preenchida seguida de retirada, pagamento ausente, troco insuficiente, revisão e conclusão percorridos no celular. Condições reais a confirmar; nenhum pedido ou pagamento criado.
- Revisão independente: quatro apontamentos corrigidos. Alterar a quantidade na revisão agora revalida o troco antes de concluir; tamanho, adicionais e observações aparecem nos resumos; o CEP aparece na revisão da entrega; a conclusão recebe foco no título. Reproduzidos os problemas antes das correções e confirmados os resultados na interface após os ajustes. Sem apontamentos pendentes.
- Conta: entrar, criar conta e recuperar acesso exibem estados de integração futura; recuperação não envia e-mail e entrada não cria sessão falsa.
- Rotas: sete rotas principais responderam 200 em acesso direto, 404 respondeu 404; todas com noindex. Imagem social respondeu 200.
- WebMCP: ambos os registros de leitura foram consultados com entradas válidas e inválidas; a releitura confirmou que entradas inválidas não alteraram o carrinho.
- Capturas: `outputs/preview/home-mobile.jpg`, `home-desktop.jpg`, `home-mobile-completa.jpg` e `home-completa.jpg`.

Build de produção concluído sem erros após as correções finais. A revisão automática de permissões rejeitou o envio ao processo de publicação; nenhum link hospedado foi confirmado. O projeto está pronto para retomar a publicação privada pelo mesmo projeto Sites, sem novo cadastro.
