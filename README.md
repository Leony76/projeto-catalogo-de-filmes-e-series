# HÁGHÀBÊÖH — Catálogo de Filmes e Séries

Projeto desenvolvido para a AVP2 da disciplina de Desenvolvimento para Dispositivos Móveis.

## Sobre o Projeto

HÁGHÀBÊÖH é uma aplicação mobile para gerenciamento de um catálogo de filmes e séries. O sistema permite cadastrar, visualizar, pesquisar, filtrar, favoritar e remover títulos, proporcionando uma experiência simples e intuitiva para organização de conteúdos audiovisuais.

## Funcionalidades

### Catálogo

* Listagem de todos os filmes e séries cadastrados.
* Visualização de informações detalhadas de cada título.
* Ampliação do poster em tela cheia.

### Pesquisa

Busca de títulos por:

* Nome
* Gênero
* Ano de lançamento

### Filtros

* Nenhum
* Favoritos
* Título (A → Z)
* Título (Z → A)
* Gênero (A → Z)
* Gênero (Z → A)
* Mais recente
* Mais antigo

### Gerenciamento de Títulos

Cadastro de novos títulos contendo:

* Poster por URL
* Poster enviado pelo dispositivo
* Nome
* Ano de lançamento
* Um ou mais gêneros

Formatos de imagem aceitos:

* JPG
* JPEG
* PNG
* WEBP

### Favoritos

* Adicionar títulos aos favoritos
* Remover títulos dos favoritos

### Remoção

* Exclusão de títulos cadastrados no catálogo

## Tecnologias Utilizadas

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript
* React Hook Form
* Zod
* Axios

### Backend

* Node.js
* JSON Server

## Estrutura do Projeto

```text
/
├── backend/
├── mobile/
├── shared/
└── README.md
```

## Como Executar o Projeto

### Pré-requisitos

* Node.js instalado
* NPM instalado

### 1. Iniciar o Backend

Abra um terminal:

```bash
cd backend
npm install
npm run dev
```

O servidor JSON será iniciado localmente.

### 2. Iniciar o Frontend

Abra outro terminal:

```bash
cd mobile
npm install
npx expo start -c
```

Após iniciar o Expo:

* Pressione `a` para Android
* Pressione `w` para Web
* Escaneie o QR Code com o aplicativo Expo Go

## Propósito

Projeto acadêmico desenvolvido para a AVP 2 da disciplina de Desenvolvimento para Dispositivos Móveis.
