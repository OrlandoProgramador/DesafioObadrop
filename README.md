# DesafioObadrop
# Projeto Next.js - Gerenciamento de Posts

Este projeto é uma aplicação Next.js que gerencia posts, com funcionalidades de visualização, edição e exclusão.

## Como executar

1. Instale as dependências do projeto:

```bash
npm install

Inicie o servidor de desenvolvimento:

npm run dev


Rotas do projeto
Páginas React (Client/Server Components)
Rota	Método	Descrição
/posts	GET	Lista todos os posts
/posts/[id]	GET	Visualiza um post específico
/posts/[id]/patch	GET	Página para editar um post (formulário PATCH)
/posts/[id]/delete	GET	Página que executa a exclusão do post via API

API Routes (Next.js App Router)
Rota	Método	Descrição
/api/posts/[id]/delete	DELETE	Exclui o post com o ID especificado
/api/posts/[id]/patch	PATCH	Atualiza parcialmente o post