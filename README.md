# venobet-site

Template Next.js + TypeScript + Tailwind para Venobet (landing + catálogo de jogos demo).

Como rodar (passo a passo rápido):

1. Crie a pasta do projeto:
   mkdir venobet-site
   cd venobet-site

2. Cole os arquivos conforme os paths acima (package.json, pages/, components/, styles/, tailwind.config.js, postcss.config.js, tsconfig.json, next-env.d.ts).

3. Instale dependências:
   npm install

4. Rode em desenvolvimento:
   npm run dev
   (o site estará em http://localhost:3000)

5. Build para produção:
   npm run build
   npm start

Git e deploy:
- git init
- git add .
- git commit -m "Initial venobet template"
- Crie repo no GitHub e faça push remoto
- Deploy sugerido: Vercel ou Render.

Notas:
- Substitua textos, logos e integre backend ou provedores de jogos conforme sua necessidade.
- Para demos/integrações de jogos HTML5, crie um diretório `public/games` e coloque os arquivos HTML/JS dos jogos, então faça embeds nas páginas de games.
- Se quiser, eu posso gerar também: autenticação demo (NextAuth), Prisma/Postgres schema, ou componentes de jogos simples.