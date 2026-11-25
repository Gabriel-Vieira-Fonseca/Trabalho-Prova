# Projeto Monte seu elenco de futebol

# A ideia era criar um elenco com jogadores de qualquer time e fazer uma escalação com eles como se você fosse um treinador

# Aplicação web desenvolvida com **Node.js**, **Express**, **EJS** e **MySQL** para gerenciamento de jogadores de futebol, controle de valor de mercado e montagem interativa de escalações táticas.

## 📋 Funcionalidades

- **Gestão Completa de Elenco (CRUD):**
  - Cadastro de novos jogadores com upload de foto (armazenada localmente em `public/images`), nome, posição, valor de mercado (€), nacionalidade e clube.
  - Edição e exclusão de jogadores cadastrados.
  - Busca dinâmica por nome, posição, nacionalidade ou clube.
  - Cálculo automático do total de jogadores e do valor total do elenco.
- **Escalação Tática Interativa:**
  - Campinho visual com suporte aos esquemas **4-3-3**, **4-4-2**, **3-5-2** e **4-2-3-1**.
  - Seleção de jogadores por posição ou livremente no elenco, com prevenção de duplicidade em campo.
  - Cálculo em tempo real do valor total dos 11 titulares escalados.

  ## 🛠️ Tecnologias Utilizadas

- **Back-end:** Node.js, Express
- **Template Engine:** EJS
- **Banco de Dados:** MySQL (`mysql2/promise`)
- **Upload de Arquivos:** Multer
- **Variáveis de Ambiente:** Dotenv
- **Front-end:** HTML5, CSS3, JavaScript (Vanilla)

## Passos para instalar 
 - Baixar node.js em sua máquina
 - Baixar mysql em sua máquina
 - no terminal rodar npm install
 - e rodar npm install multer dotenv
 - trocar .env.example por .env e colocar sua senha no process.env.DB_PASSWORD
 - rodar o código mysql 
 - no terminal rodar npm start