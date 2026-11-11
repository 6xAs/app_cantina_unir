# Cantina UNIR — Cardápio Digital

Aplicação **Node.js** com 16 produtos demonstrativos, busca, categorias, carrinho local e layout responsivo.

## Desenvolvimento local
```bash
npm start
```
Acesse http://localhost:3000

## Vercel
A branch de produção é `main`. O Vercel publica `index.html` e executa `api/menu.js` como Function Node.js.

## Supabase (integração preparada, não conectada)
Crie um projeto Supabase **separado da PraxiLab**. Execute `supabase/schema.sql` no SQL Editor do projeto da cantina e configure na Vercel:
- `SUPABASE_URL` — URL do projeto;
- `SUPABASE_PUBLISHABLE_KEY` — chave pública publishable.

A API `GET /api/menu` usa consultas somente leitura com RLS. Sem configuração, o frontend exibe os 16 produtos demonstrativos locais.

**Importante:** preços e itens fictícios; não há pagamentos, pedidos reais nem vínculo institucional oficial com a UNIR.
