# Bella Pizza · Januária

Primeira etapa: Home editorial, cardápio ilustrativo, personalização, carrinho local e checkout demonstrativo. Interface pt-BR responsiva, preparada para receber os dados oficiais.

## Executar

Node.js 22.13 ou superior. O starter declara Next.js 16.3.4, React 19.2.6 e TypeScript 5.9.3; o runtime é Vinext 1.0.0-beta.5, compatível com o App Router. Não é um servidor Next.js convencional. A hospedagem usa um Worker Cloudflare pelo Sites.

```sh
npm run install:ci
npm run dev
node --experimental-strip-types --test tests/ordering.test.ts tests/storage.test.ts tests/checkout.test.ts
node node_modules/typescript/bin/tsc --noEmit
npm run build
```

Prévia local: `http://localhost:5173`. No Windows, se o helper não localizar npm, execute `C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js` com Node e use um cache gravável. Preserve o lockfile e os scripts suportados. `npm start` serve o build com Wrangler; não publica.

## Conteúdo e identidade

- `data/restaurant-config.ts`: identificação, endereço, telefones, Instagram e links. WhatsApp e horários não foram confirmados.
- `data/demo-menu.ts` e `data/demo-payments.ts`: todo produto, variante, preço e pagamento é exemplo. Valores em centavos; taxa de entrega a confirmar. Meio a meio está reservado nos tipos e desativado até as regras oficiais.
- `data/media.ts`: fontes, dimensões, textos alternativos e recortes. Substitua as fotos neste arquivo e em `public/images` quando receber material da Bella.
- `app/globals.css`: tokens de creme, vinho, terracota e tipografia. O logo original foi preservado; a paleta da interface é provisória porque os materiais públicos não estabelecem uma identidade completa e consistente.
- `app/layout.tsx`: title, description, Open Graph, Twitter e origem da hospedagem. `public/images/og.jpg` segue a composição do Hero. Prévia com `noindex/nofollow` e robots bloqueando indexação.

Logo: perfil [@bellapizzajanuaria](https://www.instagram.com/bellapizzajanuaria/), sem redesenho. Arquivo de 150 px; substitua pelo original de alta qualidade quando disponível. A [Prefeitura de Januária](https://www.januaria.mg.gov.br/pizzaria-bella-pizza) confirma o endereço e os contatos usados. Posts antigos não foram tratados como cardápio, preços ou horários atuais.

As fotografias são de banco e têm marcação discreta de **ilustrativas**; não representam produtos ou instalações reais da Bella. Consulte [ASSETS.md](./ASSETS.md) para autoria e licença. Não foram inventadas avaliações, história empresarial, estatísticas ou prêmios.

## Estrutura e dados

`app/` contém as rotas; `components/` organiza layout, Home, catálogo, carrinho, checkout e conta. Primitivas acessíveis do starter ficam em `components/ui`. `types/domain.ts` define RestaurantConfig, MenuItem, ProductVariant, ProductOption, CartLine, Address, CheckoutDraft e Order. `lib/ordering.ts` concentra busca, validação e cálculo; `lib/cart-storage.ts` trata armazenamento indisponível. `lib/repositories.ts` define a substituição dos dados demonstrativos.

Rotas: `/`, `/cardapio`, `/checkout`, `/conta`, `/conta/pedidos`, `/conta/enderecos`, `/conta/perfil` e 404. As páginas internas da conta têm estados simples nesta etapa.

Somente itens, opções, quantidade e observação do carrinho são persistidos em `bella-cart-v1`. O payload é versionado, normalizado e validado na restauração. Produtos removidos/indisponíveis e entradas inválidas são descartados. Identificação, telefone, endereço e pagamento ficam em memória; sair ou atualizar o checkout os descarta. O campo de observação orienta a não incluir dados pessoais. Formulários de conta não enviam nem salvam senhas.

O checkout oferece pedido sem cadastro, identificação, entrega/retirada, opções de pagamento e revisão. A conclusão afirma que **nenhum pedido foi enviado**. Não limpa o carrinho nem simula pedido recebido, transação ou sessão autenticada. Telefone, Instagram e Maps usam os contatos reais.

## Próxima integração

Substitua `demoMenuRepository` por um adaptador que implemente MenuRepository. Para Supabase, prepare tabelas de restaurantes, categorias, produtos, variantes e opções com os IDs dos tipos. Use Storage para mídia e RLS por restaurante e usuário. Revalide disponibilidade e calcule valores no servidor antes de criar pedidos; nunca confie no subtotal recebido do navegador.

OrderRepository é apenas um contrato. Sua futura implementação deve criar pedidos de modo idempotente, vincular identificação/endereço com consentimento, retornar um ID real e atualizar estados por Realtime quando apropriado. Use Supabase Auth para entrar/cadastrar/recuperar, com perfis e endereços protegidos por RLS. Pagamentos devem usar um provedor e webhooks, sem manipular cartão neste frontend. Clientes recebem apenas chaves públicas; credenciais administrativas ficam no servidor. Backend, painel administrativo e autenticação de clientes não foram implementados nesta etapa.

A infraestrutura e exemplos não usados do starter foram preservados para manter os scripts suportados; não são rotas do produto. O acesso privado do Sites é separado da futura conta dos clientes.

## Consultas para agentes

Quando há `document.modelContext`, a interface registra `read_demo_menu` e `read_demo_cart`. São leituras do catálogo e carrinho usados pela tela, identificadas como demonstração; não enviam pedidos ou pagamentos. Entradas são validadas, o registro é removido por AbortSignal e falta de suporte não interrompe o site. Foram verificadas com entradas válidas, inválidas e releitura do carrinho sem corrupção.

## Verificação

Dez testes cobrem acentos, preços, quantidades, restauração malformada/obsoleta/indisponível, personalizações distintas, armazenamento bloqueado, exclusão de campos pessoais na normalização e revalidação do checkout após alteração do carrinho. TypeScript foi verificado sem erro. Consulte [QA.md](./QA.md) para a revisão; build e publicação são confirmados na entrega.

O fluxo mobile foi percorrido com variante, adicional, observação, quantidade, edição, recarga, busca sem resultado, categoria indisponível, carrinho vazio e conclusão demonstrativa. Conferidos identificação inválida, troca de entrega para retirada, pagamento não escolhido, troco insuficiente, Escape, contenção de Tab e retorno de foco. Home e cardápio têm prioridade em 390 px; capturas ficam em `outputs/preview`, ao lado do projeto.

Rede lenta e ampliação de texto não foram emuladas pela ferramenta disponível; não há pontuação Lighthouse inventada. Safe area e reduced motion têm tratamento no CSS. Antes de habilitar vendas, confirme catálogo, fotos, horários, modalidades, taxas, pagamentos e WhatsApp com a Bella.
