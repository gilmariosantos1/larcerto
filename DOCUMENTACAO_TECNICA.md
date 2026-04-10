# 📘 Documentação Completa — Projeto Lar Certo

**Última atualização:** 08 de Abril de 2026  

---

## 🗺️ Visão Geral do Projeto

O **Lar Certo** é uma plataforma web de adoção responsável de animais.
Ela conecta dois tipos de usuários:

- **Doador**: pessoa que tem um animal e quer colocá-lo para adoção. Possui acesso a um painel de gerenciamento de solicitações.
- **Adotante**: pessoa que deseja adotar um animal.
A plataforma se destaca por uma interface **"Supreme"** de alta qualidade, garantindo fluidez e excelente experiência de usuário através de microinterações, design moderno (Glassmorphism) e design voltado para atração emocional responsável.

A arquitetura é **Client-Server**:

```
[Navegador / React] ──HTTP/REST──► [API Node.js/Express] ──► [MySQL - larcerto]
     (porta 5173)                        (porta 3001)
```

---

## 🗄️ BANCO DE DADOS — MySQL (`larcerto`)

### Por que esse schema?

O sistema precisa diferenciar quem é **doador** de quem é **adotante**.
Por isso a tabela `Pessoa` tem o campo `Perfil`.  
As credenciais de acesso ficam separadas em `Login`, que aponta para a Pessoa.
Cada pet tem um doador responsável (`idDoador`) e uma localização (`idLocal`).

---

### Tabela `Localizacao`

```sql
CREATE TABLE `Localizacao` (
  `idLocal`   INT          NOT NULL AUTO_INCREMENT,
  `Cidade`    VARCHAR(45)  NULL,
  `Estado`    VARCHAR(45)  NULL,
  `Bairro`    VARCHAR(45)  NULL,
  `Detalhes`  VARCHAR(100) NULL,
  PRIMARY KEY (`idLocal`)
);
```

**Por que existe?**  
Tanto `Pessoa` quanto `Pet` podem ter uma localização associada.
Ao centralizar num tabela única, evitamos repetição de dados (normalização 3FN).
Um pet em Aracaju/SE pode ter seu bairro específico detalhado.

---

### Tabela `Pessoa`

```sql
CREATE TABLE `Pessoa` (
  `idPessoa`  INT          NOT NULL AUTO_INCREMENT,
  `Nome`      VARCHAR(100) NOT NULL,
  `Telefone`  VARCHAR(20)  NULL,
  `Perfil`    VARCHAR(20)  NOT NULL DEFAULT 'Adotante',  -- 'Adotante' ou 'Doador'
  `idLocal`   INT          NULL,                          -- FK → Localizacao
  PRIMARY KEY (`idPessoa`),
  CONSTRAINT `fk_Pessoa_Localizacao`
    FOREIGN KEY (`idLocal`) REFERENCES `Localizacao` (`idLocal`)
    ON DELETE SET NULL ON UPDATE CASCADE
);
```

**Por que existe?**  
Representa o perfil humano do usuário, independente de login.
O campo `Perfil` é o que diferencia um Doador de um Adotante no sistema.
Se a Localização for deletada, `idLocal` vira NULL (ON DELETE SET NULL)
para não deletar a Pessoa junto.

**Campos explicados:**
- `Nome`: nome completo obrigatório.
- `Telefone`: opcional, usado para contato via WhatsApp.
- `Perfil`: define o papel do usuário. Aceita apenas `'Adotante'` ou `'Doador'`.
- `idLocal`: onde a pessoa mora, opcional, pode ser preenchido depois.

---

### Tabela `Login`

```sql
CREATE TABLE `Login` (
  `idLogin`   INT          NOT NULL AUTO_INCREMENT,
  `email`     VARCHAR(100) NOT NULL,
  `senha`     VARCHAR(255) NOT NULL,   -- sempre armazenada em hash bcrypt
  `idPessoa`  INT          NOT NULL,   -- FK → Pessoa
  PRIMARY KEY (`idLogin`),
  UNIQUE KEY `email_unique` (`email`), -- garante que não há emails duplicados
  CONSTRAINT `fk_Login_Pessoa`
    FOREIGN KEY (`idPessoa`) REFERENCES `Pessoa` (`idPessoa`)
    ON DELETE CASCADE ON UPDATE CASCADE
);
```

**Por que existe?**  
Separar credenciais de acesso do perfil pessoal é uma boa prática de segurança.
Se um dia o sistema oferecer login por Google/Facebook (OAuth), basta adicionar
campos na tabela `Login` sem tocar em `Pessoa`.

**Decisão de design importante:**  
O `idPessoa` fica em `Login`, não o contrário.
Isso significa: "um login pertence a uma pessoa" (Login → Pessoa).
A ordem de criação no registro é:
1. Cria `Pessoa` primeiro (sem credenciais)
2. Cria `Login` depois, apontando para a Pessoa recém-criada

**ON DELETE CASCADE:** se a Pessoa for deletada, o Login é deletado junto.
Nunca haverá um Login "órfão" sem dono.

---

### Tabela `Pet`

```sql
CREATE TABLE `Pet` (
  `idPet`    INT          NOT NULL AUTO_INCREMENT,
  `Nome`     VARCHAR(45)  NOT NULL,
  `Tipo`     VARCHAR(20)  NULL,   -- 'cao', 'gato' ou 'outro'
  `Porte`    VARCHAR(20)  NULL,   -- 'P', 'M' ou 'G'
  `Genero`   VARCHAR(10)  NULL,   -- 'Macho' ou 'Femea'
  `Idade`    VARCHAR(20)  NULL,   -- ex: '2 anos', '5 meses'
  `Status`   VARCHAR(20)  NOT NULL DEFAULT 'disponivel', -- 'disponivel' ou 'adotado'
  `Img`      VARCHAR(500) NULL,   -- URL da imagem ou caminho do upload (Multer)
  `Descricao` TEXT        NULL,   -- História e personalidade do pet
  `idDoador` INT          NULL,   -- FK → Pessoa (quem cadastrou o pet)
  `idLocal`  INT          NULL,   -- FK → Localizacao (onde o pet está)
  PRIMARY KEY (`idPet`),
  CONSTRAINT `fk_Pet_Doador`
    FOREIGN KEY (`idDoador`) REFERENCES `Pessoa` (`idPessoa`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_Pet_Localizacao`
    FOREIGN KEY (`idLocal`) REFERENCES `Localizacao` (`idLocal`)
    ON DELETE SET NULL ON UPDATE CASCADE
);
```

**Por que existe?**  
Representa cada animal disponível para adoção.
`idDoador` aponta para quem cadastrou o pet (sempre um Doador).
`idLocal` aponta para onde o pet está fisicamente.
Ambos usam `ON DELETE SET NULL` — se o Doador ou a Localização forem
deletados, o pet não some, apenas perde o vínculo.

**Campos chave:**
- `Img`: Arquivo físico processado via middleware interno (`Multer`), armazenando apenas o caminho de acesso.
- `Descricao`: Permite textos longos (`TEXT`) para contar a história e a personalidade do pet, engajando os adotantes antes de solicitarem adoção.

---

### Tabela `Doacao`

```sql
CREATE TABLE `Doacao` (
  `idDoacao`        INT         NOT NULL AUTO_INCREMENT,
  `idPet`           INT         NOT NULL,      -- FK → Pet
  `idAdotante`      INT         NOT NULL,      -- FK → Pessoa (quem quer adotar)
  `Status`          VARCHAR(20) NOT NULL DEFAULT 'pendente', -- pendente/aprovado/recusado
  `DataSolicitacao` DATE        NOT NULL,      -- data do pedido
  PRIMARY KEY (`idDoacao`),
  CONSTRAINT `fk_Doacao_Pet`
    FOREIGN KEY (`idPet`) REFERENCES `Pet` (`idPet`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Doacao_Adotante`
    FOREIGN KEY (`idAdotante`) REFERENCES `Pessoa` (`idPessoa`)
    ON DELETE CASCADE ON UPDATE CASCADE
);
```

**Por que existe?**  
É a tabela que liga um `Pet` a um `Adotante`. É o "pedido de adoção".
Um pet pode ter vários pedidos, mas só um aprovado por vez.
Quando um pedido é aprovado, o controller muda o `Status` do Pet para `'adotado'`.

**Fluxo completo de uma adoção:**
```
Adotante vê o pet → clica "Quero Adotar" → cria Doacao (pendente)
Doador vê o pedido → aprova ou recusa
Se aprovado → Pet.Status muda para 'adotado' automaticamente
```

---

### Diagrama de Relacionamento

```
Localizacao ◄──── Pessoa ◄──── Login
    ▲                ▲
    │                │
    └──── Pet        └──── Doacao ────► Pet
           ▲                    ▲
      (idDoador)           (idAdotante)
```

---

## ⚙️ BACKEND — Node.js / Express / Sequelize

### Estrutura de pastas

```
api/
├── .env                  → configurações do ambiente (banco, JWT, porta)
├── server.js             → entrada da aplicação, configura express e rotas
├── reset-db.js           → script utilitário para recriar o banco do zero
├── database/
│   ├── connection.js     → cria e exporta a instância do Sequelize
│   └── reset.sql         → SQL completo para recriar o banco larcerto
├── uploads/              → diretório de armazenamento estático de imagens de pets
├── models/
│   ├── index.js          → carrega todos os models e define associações
│   ├── Login.js          → model da tabela Login
│   ├── Pessoa.js         → model da tabela Pessoa
│   ├── Localizacao.js    → model da tabela Localizacao
│   ├── Pet.js            → model da tabela Pet
│   └── Adocao.js         → model da tabela Doacao
├── controllers/
│   ├── LoginController.js   → registrar, logar, meuPerfil
│   ├── PetController.js     → CRUD de pets
│   ├── AdocaoController.js  → listar, criar, atualizarStatus
│   └── PessoaController.js  → listar, buscarPorId, atualizar
├── routes/
│   ├── loginRoutes.js    → /api/auth/*
│   ├── petRoutes.js      → /api/pets/*
│   ├── adocaoRoutes.js   → /api/adocoes/*
│   └── pessoaRoutes.js   → /api/pessoas/*
└── middlewares/
    ├── authMiddleware.js → valida JWT e injeta req.userId
    └── upload.js         → configuração do Multer para upload de imagens

```

---

### `server.js` — Configuração da aplicação

O servidor Express é configurado com:

- **CORS** explícito: apenas `http://localhost:5173` (Vite/frontend) e
  `http://localhost:3000` podem fazer requisições. Isso previne que outros
  sites acessem a API.
- **`express.json()`**: habilita o servidor a ler corpo JSON das requisições.
- **Middleware de erro global**: qualquer erro não tratado cai aqui e retorna
  status 500 sem expor detalhes internos ao cliente.
- **Porta**: lida do `.env` (`PORT=3001`). O frontend usa a `5172`/`5173` (Vite),
  então a API precisa de uma porta diferente.
- **Arquivos Estáticos**: diretório `/uploads` exposto de forma estática para servir as imagens dos pets aos clientes via URL configurada.

---

### `database/connection.js` — Conexão com MySQL

Cria uma instância do **Sequelize** usando as variáveis do `.env`:
```
DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME
```
Ao importar esse arquivo, o Sequelize tenta autenticar na conexão imediatamente
e loga o resultado no console. Se falhar, o servidor ainda sobe — mas os
endpoints que usam o banco vão dar erro 500.

**Por que usar o path absoluto no `dotenv.config()`?**  
Porque quando rodamos scripts utilitários (como `reset-db.js`) de fora da
pasta `api/`, o `dotenv` procura o `.env` na pasta atual, não na `api/`.
O `path.join(__dirname, '..', '.env')` garante que sempre lê o arquivo correto.

---

### `models/index.js` — Associações entre models

Este arquivo é o "orquestrador" dos models. Ele:
1. Importa todos os models
2. Define as **associações** (relações entre tabelas)
3. Exporta tudo junto

**Associações definidas:**
```
Pessoa.belongsTo(Localizacao)   → Pessoa tem uma Localizacao
Login.belongsTo(Pessoa)         → Login tem uma Pessoa (o dono)
Pessoa.hasOne(Login)            → Pessoa tem um Login
Pet.belongsTo(Pessoa)           → Pet tem um Doador (Pessoa)
Pet.belongsTo(Localizacao)      → Pet tem uma Localizacao
Doacao.belongsTo(Pet)           → Doacao referencia um Pet
Doacao.belongsTo(Pessoa)        → Doacao tem um Adotante (Pessoa)
```

Ao usar `include: [{ model: Pessoa, as: 'doador' }]` em uma query,
o Sequelize faz um JOIN automaticamente, trazendo os dados da Pessoa
junto com o Pet, sem precisar escrever SQL manualmente.

---

### `controllers/LoginController.js`

#### `registrar(req, res)`

Fluxo de cadastro com o novo schema:

```
1. Valida campos obrigatórios: Nome, email, senha
2. Valida força da senha: mínimo 6 caracteres
3. Verifica se o email já está em uso (UNIQUE no banco)
4. Cria Pessoa primeiro:
     Pessoa.create({ Nome, Telefone, Perfil })
5. Cria Login depois, vinculando à Pessoa:
     Login.create({ email, senha: hash, idPessoa: pessoa.idPessoa })
6. Retorna os dados do usuário criado (sem a senha)
```

**Por que criar Pessoa antes?**  
Porque `Login` precisa do `idPessoa` para ser criado (campo NOT NULL).
Se criássemos na ordem errada, teríamos erro de FK violada.

**Hash da senha:**  
A senha nunca é armazenada em texto puro. Usamos `bcrypt.hash(senha, 10)`.
O `10` é o número de "rounds" (quanto maior, mais seguro e mais lento).
10 é o padrão recomendado para a maioria das aplicações.

#### `logar(req, res)`

```
1. Valida email e senha presentes
2. Busca o Login pelo email, incluindo os dados da Pessoa (JOIN automático)
3. Se não encontrar → 401 "E-mail não encontrado"
4. Compara senha digitada com o hash no banco (bcrypt.compare)
5. Se senha errada → 401 "Senha incorreta"
6. Gera token JWT com { id: login.idLogin } e validade de 1 dia
7. Retorna token + dados do usuário (idLogin, email, Nome, Perfil, etc.)
```

#### `meuPerfil(req, res)` — Endpoint `GET /api/auth/me`

Retorna o perfil do usuário logado. O `req.userId` é injetado pelo
`authMiddleware` após validar o token JWT.

---

### `middlewares/authMiddleware.js`

Intercepta requisições que precisam de autenticação:

```
1. Lê o header Authorization: Bearer <token>
2. Se não tiver → 401 "Token não fornecido"
3. Verifica o token com jwt.verify() usando o JWT_SECRET do .env
4. Se inválido ou expirado → 401 "Token inválido ou expirado"
5. Se válido → extrai o id do usuário e coloca em req.userId
6. Chama next() para continuar para o controller
```

**Por que não usar fallback no JWT_SECRET?**  
Antes havia `process.env.JWT_SECRET || 'chave_padrao'`. Isso é inseguro:
se alguém souber a chave padrão, pode forjar tokens válidos.
Agora, se `JWT_SECRET` não estiver no `.env`, o `jwt.verify()` vai lançar
um erro — o que é o comportamento correto (falha explícita).

---

### `controllers/PetController.js`

- `listar`: retorna todos os pets com dados do Doador e da Localização (JOIN).
- `buscarPorId`: retorna um pet específico com dados completos.
- `criar`: cria um novo pet. **Se `idDoador` não for enviado**, o controller
  busca automaticamente o `idPessoa` do usuário logado (via token).
  Isso garante que o pet seja sempre vinculado ao Doador correto.
- `atualizar` e `excluir`: operações padrão protegidas por JWT.

---

### `controllers/AdocaoController.js`

- `criar`: o endpoint mais inteligente do sistema.
  ```
  1. Valida que idPet foi enviado
  2. Busca o Login do usuário logado para descobrir o idPessoa
  3. Verifica se o Pet existe E se está 'disponivel'
  4. Bloqueia se o próprio doador estiver tentando adotar o próprio pet
  5. Se estiver tudo OK → cria a Doacao com status 'pendente'
  ```
- `listarRecebidas`: endpoint de gestão para Doadores.
  1. Confirma identidade (`req.userId` → `idPessoa`).
  2. Obtém em uma sub-busca a lista de pets que pertencem ao doador logado.
  3. Faz uma Query pelas Doações cuja `idPet` está na lista do doador.
  4. Adiciona ao resultado informações conjuntas da Pessoa (Adotante) e Pet visado.
- `atualizarStatus`:
  Segurança baseada em propriedade: Apenas o dono do respectivo pet (doador) pode aprovar/recusar a solicitação (validação cruzada entre `Doacao.idPet` e `Pet.idDoador`).
  Quando aprovado: muda o status do sistema, atrela o pet como `'adotado'` e recusa as solicitações de outros candidatos automaticamente (Cascade Update Negocial).


---

### `routes/` — Definição das rotas

| Rota | Método | Auth | Ação |
|------|--------|------|------|
| `/api/auth/registrar` | POST | ❌ | Cria Pessoa + Login |
| `/api/auth/logar` | POST | ❌ | Autentica e retorna JWT |
| `/api/auth/me` | GET | ✅ | Retorna perfil do usuário logado |
| `/api/pets` | GET | ❌ | Lista todos os pets disponíveis |
| `/api/pets/:id` | GET | ❌ | Detalhe de um pet |
| `/api/pets` | POST | ✅ (Doador)* | Cadastra novo pet com `multipart/form-data` |
| `/api/pets/:id` | PUT | ✅ | Atualiza pet |
| `/api/pets/:id` | DELETE | ✅ | Remove pet |
| `/api/adocoes` | GET | ✅ | Lista todas as adoções |
| `/api/adocoes/recebidas` | GET | ✅ (Doador) | Lista solicitações de adoção filtradas por pets do doador |
| `/api/adocoes` | POST | ✅ (Adotante) | Solicita adoção |
| `/api/adocoes/:id` | PUT | ✅ (Doador) | Aprova ou recusa adoção |
| `/api/pessoas` | GET | ✅ | Lista pessoas |
| `/api/pessoas/:id` | GET | ✅ | Detalhe de pessoa |
| `/api/pessoas/:id` | PUT | ✅ | Atualiza perfil |


---

### `.env` — Variáveis de ambiente

```env
PORT=3001           → porta da API (diferente do Vite na 5173 e da 3000)
DB_HOST=localhost   → host do MySQL
DB_USER=root        → usuário do banco
DB_PASS=root        → senha do banco
DB_PORT=3306        → porta padrão do MySQL
DB_NAME=larcerto    → nome do banco de dados
JWT_SECRET=...      → chave secreta para assinar e verificar tokens JWT
```

> ⚠️ O `.env` nunca deve ser enviado para o GitHub. Adicione ao `.gitignore`.

---

## 🌐 FRONTEND — React (Vite)

### Estrutura de pastas

```
web/src/
├── App.jsx               → roteamento principal e AuthProvider global
├── main.jsx              → ponto de entrada, monta o React no DOM
├── context/
│   └── AuthContext.jsx   → estado global de autenticação
├── services/
│   └── api.js            → instância do Axios configurada
├── components/
│   ├── Navbar.jsx         → barra de navegação com estado de login
│   ├── Footer.jsx         → rodapé com links
│   ├── Logo.jsx           → componente do logo
│   ├── MenuCards.jsx      → cards de navegação rápida
│   ├── BackToTop.jsx      → botão de voltar ao topo
│   └── VLibras.jsx        → acessibilidade para Libras
├── pages/
│   ├── Home.jsx             → página inicial com grid flexível
│   ├── Login.jsx            → formulário de login
│   ├── Cadastro.jsx         → formulário de cadastro completo
│   ├── Adotar.jsx           → galeria de pets disponíveis
│   ├── GerenciarAdocoes.jsx → painel exclusivo para Doadores
│   └── ... (outras páginas)
└── styles/
    ├── global.css           → design system supreme estrutural

    └── ... (css por página)
```

---

### `context/AuthContext.jsx` — O coração do estado de login

**O problema que resolve:**  
Antes, o estado de login era apenas `localStorage` acessado diretamente
em cada componente. Isso significa que ao fazer login, a Navbar não
"sabia" que o usuário havia entrado.

**A solução — React Context:**  
O `AuthContext` cria um estado global compartilhado por toda a aplicação.
Qualquer componente pode chamar `useAuth()` e ter acesso a:

```javascript
const { user, isLoggedIn, login, logout, loading } = useAuth()
```

**Como funciona:**

| Função/Estado | O que faz |
|---|---|
| `user` | Objeto com dados do usuário (Nome, email, Perfil, etc.) |
| `isLoggedIn` | `true` se o usuário está autenticado |
| `loading` | `true` enquanto carrega do localStorage (evita flash) |
| `login(token, userData)` | Salva no localStorage, configura Axios, atualiza estado |
| `logout()` | Limpa localStorage, remove header Axios, zera estado |

**`useEffect` na inicialização:**  
Quando a página é recarregada, o Context verifica se há token no
`localStorage`. Se houver, restaura o usuário automaticamente.
Isso é o que mantém o usuário logado entre sessões/recarregamentos.

**Axios configurado automaticamente:**  
Ao fazer `login()`, o header é configurado:
```javascript
api.defaults.headers.common['Authorization'] = `Bearer ${token}`
```
Isso significa que **todas as requisições futuras** do Axios já incluem
o token automaticamente, sem precisar passar manualmente.

---

### `services/api.js` — Cliente HTTP

```javascript
const api = axios.create({
  baseURL: '/api',  // proxy via vite.config.js
})

// Interceptor: adiciona token JWT em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

**Proxy de Requisição via Vite / Proxy CORS:**  
Para total flexibilidade e para evitar dores de cabeça com CORS no desenvolvimento, configuramos um proxy em `vite.config.js`. Dessa maneira, as requisições apontam apenas no endpoint (Ex: `/api/pets`) e são reencaminhadas internamente pro Node server `http://localhost:3001/api/...`.

**Por que 3001?**  
O Vite usa a porta para desenvolvimento (ex. 5172 ou 5173). Para evitar conflito, a API Node escuta na porta 3001.

---

### UX/UI — Interface Supreme e Design System Avançado

Todo o aplicativo Front-End obedece um padrão interativo de Alto Nível **(Supreme Aesthetic)**:
- **Bento Grids**: Estilo de herói (hero-banner) modular na _Home_, misturando CTAs expressivas e layouts atraentes com imagem de fundo, blur e sombras.
- **Microinterações:**
  - Cards que se elevam (`transform: translateY`) com suavidade (`cubic-bezier`).
  - Gradiente em textos e componentes.
  - O uso constante de pill badges indicativos (Cão, Porte, Status).
- **Layout Modular Autoadaptável:** Implementação de `grid-template-columns: repeat(auto-fill, ...)` assegura proporções elegantes das fotos de perfl sem distorções, seja com centenas de pets ou apenas um.
- **Modal Integrado**: Na home page, para manter a retenção, a visualização da história de um pet ocorre nativamente sem saltos de página (um backdrop visual estético exibe fotos, metadados e botão de CTAs).

---

### `App.jsx` — Roteamento e Provider global

```jsx
<AuthProvider>         {/* ← envolve tudo para dar acesso ao contexto */}
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      ...
    </Routes>
  </BrowserRouter>
</AuthProvider>
```

O `AuthProvider` envolve **toda** a aplicação, garantindo que qualquer
página ou componente possa usar `useAuth()`.

---

### `components/Navbar.jsx` — Indicador visual de login

**Estado NÃO logado:**
```
Logo | Início | Adotar | Blog | Apoiar | [Entrar]
```

**Estado logado:**
```
Logo | Início | Adotar | Blog | Apoiar | [A Ana ▼]
                                          ├ ana@teste.com
                                          └ [🚪 Sair da conta]
```

**Como funciona o dropdown:**
1. `useAuth()` fornece `user`, `isLoggedIn` e `logout`.
2. Quando `isLoggedIn` é `true`, exibe o avatar com a inicial do nome.
3. Ao clicar no avatar, `dropdownOpen` alterna entre aberto/fechado.
4. Um `useEffect` com `mousedown` fecha o dropdown ao clicar fora dele.
5. Ao clicar em "Sair", chama `logout()` e redireciona para `/`.

---

### `pages/Cadastro.jsx` — Formulário completo

Campos do formulário:
1. **Nome completo** (obrigatório) → vai para tabela `Pessoa`
2. **E-mail** (obrigatório) → vai para tabela `Login`
3. **Telefone** (opcional) → vai para tabela `Pessoa`
4. **Perfil** (select) → `Adotante` ou `Doador` → vai para `Pessoa.Perfil`
5. **Senha** (mín. 6 chars) → vai para `Login` (hash bcrypt)
6. **Confirmar senha** → validado apenas no frontend, não enviado para API

**Validações no frontend (antes de enviar):**
- Nome não pode estar vazio
- As senhas devem ser iguais
- Senha deve ter mínimo 6 caracteres

**Fluxo após cadastro bem-sucedido:**
```
1. POST /api/auth/registrar → cria Pessoa + Login no banco
2. POST /api/auth/logar     → faz login automático
3. login(token, user)       → atualiza o AuthContext
4. Redireciona para "/"     → usuário já aparece logado na Navbar
```
O login automático após cadastro melhora a experiência do usuário —
ele não precisa fazer login manualmente após criar a conta.

---

### `pages/Login.jsx` — Formulário de login

```
1. Valida que email e senha estão preenchidos (client-side)
2. POST /api/auth/logar
3. Se sucesso → login(token, user) → atualiza contexto → redireciona para "/"
4. Se erro → exibe mensagem específica vinda da API
   (ex: "E-mail não encontrado" ou "Senha incorreta")
```

---

### `pages/GerenciarAdocoes.jsx` — O Painel de Controle do Doador
Criada exclusivamente para o acesso restrito dos `Doadores`, essa interface resolve a dor "Como saberei se fui postulado para adoção?":
1. **Listagem Pessoal**: Só puxa perfis de pets criados por ele e que estão no banco como pendentes, recusados ou aprovados.
2. **Interface Clara**: Cada card exibe de forma visual o interessado, as ferramentas de contato e os botões "Aprovar Adoção" x "Recusar".
3. **Comportamento em Cascata**: Após Aprovar algum interessado, reflete status real-time e inviabiliza as outras candidaturas no backend.

---

## 🔄 FLUXO COMPLETO — Do navegador ao banco

### Cadastro

```
Usuário preenche form Cadastro.jsx
  ↓
Validação client-side (senha igual, mínimo 6 chars)
  ↓
api.post('/auth/registrar', { Nome, email, senha, Telefone, Perfil })
  ↓
LoginController.registrar()
  ↓
Pessoa.create({ Nome, Telefone, Perfil })       ── INSERT em Pessoa
  ↓
Login.create({ email, senha: hash, idPessoa })  ── INSERT em Login
  ↓
Resposta 201 com dados do usuário
  ↓
Login automático → JWT gerado → AuthContext atualizado
```

### Login

```
Usuário preenche form Login.jsx
  ↓
api.post('/auth/logar', { email, senha })
  ↓
LoginController.logar()
  ↓
Login.findOne({ where: { email }, include: [Pessoa] })  ── SELECT com JOIN
  ↓
bcrypt.compare(senha, login.senha)
  ↓
jwt.sign({ id: login.idLogin }, JWT_SECRET, { expiresIn: '1d' })
  ↓
Resposta 200 com { token, user: { Nome, email, Perfil, ... } }
  ↓
AuthContext.login(token, user) → Navbar muda para avatar do usuário
```

### Solicitação de adoção

```
Adotante logado clica "Quero Adotar"
  ↓
api.post('/adocoes', { idPet: 5 })
  ↓
authMiddleware → valida JWT → injeta req.userId
  ↓
AdocaoController.criar()
  ↓
Login.findByPk(req.userId) → descobre idPessoa do adotante
  ↓
Pet.findByPk(5) → verifica status === 'disponivel'
  ↓
Doacao.create({ idPet: 5, idAdotante, Status: 'pendente', DataSolicitacao })
  ↓
Resposta 201 "Solicitação enviada com sucesso!"
```

### Aprovação de adoção

```
Doador aprova a solicitação
  ↓
api.patch('/adocoes/1/status', { Status: 'aprovado' })
  ↓
AdocaoController.atualizarStatus()
  ↓
Doacao.update({ Status: 'aprovado' })
  ↓ (se aprovado)
Pet.update({ Status: 'adotado' }, { where: { idPet: doacao.idPet } })
  ↓
Agora o pet não aparece mais como 'disponivel'
```


## 🔐 Segurança — Decisões tomadas

| Prática | Implementação |
|---|---|
| Senhas nunca em texto puro | bcrypt com 10 rounds |
| Autenticação stateless | JWT com expiração de 1 dia |
| CORS restritivo | Apenas localhost:5173 e localhost:3000 |
| JWT_SECRET sem fallback | Se não estiver no .env, quebra explicitamente |
| Validação em dupla camada | Frontend (UX) + Backend (segurança real) |
| ON DELETE CASCADE/SET NULL | Banco não deixa dados órfãos |

---