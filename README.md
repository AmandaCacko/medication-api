# Medication API

A **Medication API** é uma API construída para fornecer dados sobre medicamentos, com informações detalhadas sobre os produtos, categorias, classes terapêuticas, empresas detentoras de registros e muito mais.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Express**: Framework para construção de APIs em Node.js.
- **CSV-Loader**: Para carregar dados a partir de arquivos CSV.
- **TypeORM**: (Se estiver usando um banco de dados relacional no futuro) para gerenciar entidades e consultas.
- **Jest**: Para testes (caso você queira adicionar testes no futuro).

## 🛠 Funcionalidades

- **Listar Medicamentos**: Endpoint para listar todos os medicamentos disponíveis.
- **Buscar Medicamento**: Endpoint para buscar medicamentos por nome.

## 📊 Dados

Os dados utilizados nesta API foram retirados de uma fonte pública disponibilizada pela **Agência Nacional de Vigilância Sanitária (ANVISA)**. Esses dados são constantemente atualizados pela ANVISA e fornecem informações cruciais sobre os medicamentos registrados no Brasil.

**Fonte dos Dados**:  
[Dados Abertos da ANVISA](https://dados.anvisa.gov.br/dados/)

### 🎯 Objetivo
Este projeto tem como objetivo fornecer uma interface simples para acessar informações sobre medicamentos e possibilitar a integração com outras aplicações que necessitem desses dados.

## 🔧 Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados na sua máquina:

- **Node.js** (Versão 16 ou superior)
- **npm** ou **yarn**

### Passos

1. **Clone este repositório**:

   ```bash
   git clone https://github.com/AmandaCacko/medication-api
   cd medication-api
   ```

2. **Instale as dependências**:

   Com **npm**:
   ```bash
   npm install
   ```

   Com **yarn**:
   ```bash
   yarn install
   ```

3. **Inicie o servidor**:

   Com **npm**:
   ```bash
   npm run dev
   ```

   Com **yarn**:
   ```bash
   yarn dev
   ```

4. O servidor estará rodando em [http://localhost:3000](http://localhost:3000).

## 📂 Estrutura do Projeto

```
/medication-api
│
├── /src
│   ├── /controllers    # Lógica dos endpoints
│   ├── /models        # Modelos de dados
│   ├── /routes        # Definição das rotas da API
│   ├── /services      # Lógica de negócios e serviços
│   └── /utils         # Funções auxiliares como CSV Loader
│
├── /node_modules      # Dependências do projeto
├── .env               # Variáveis de ambiente
├── package.json       # Gerenciamento de dependências e scripts
├── tsconfig.json      # Configurações do TypeScript
└── README.md          # Documentação do projeto
```

## 📄 Endpoints

- **GET `/`**: Retorna todos os medicamentos.
- **GET `/buscar`**: Retorna medicamentos filtrados pelo nome. Utilize o parâmetro `nome` para buscar por medicamentos específicos.

### Exemplo de Requisição

#### Buscar Medicamento

```bash
GET http://localhost:3000/search?nome=vitamina
```

#### Resposta

```json
[
  {
    "TIPO_PRODUTO": "MEDICAMENTO",
    "NOME_PRODUTO": "VITAMINA A + ASSOCIAÇÕES",
    "DATA_FINALIZACAO_PROCESSO": "25/04/2000",
    "CATEGORIA_REGULATORIA": "SIMILAR",
    "NUMERO_REGISTRO_PRODUTO": "104540166",
    "DATA_VENCIMENTO_REGISTRO": "01/04/2005",
    "NUMERO_PROCESSO": "250000254169821",
    "CLASSE_TERAPEUTICA": "VITAMINAS E SUPLEMENTOS MINERAIS",
    "EMPRESA_DETENTORA_REGISTRO": "60874187000184 - DAIICHI SANKYO BRASIL FARMACÊUTICA LTDA",
    "SITUACAO_REGISTRO": "CADUCO/CANCELADO",
    "PRINCIPIO_ATIVO": "VITAMINA A"
  },
  ...
]
```

## 💡 Como Contribuir

1. **Fork o projeto**.
2. **Crie uma branch** (`git checkout -b feature/novidade`).
3. **Commit suas alterações** (`git commit -am 'Adiciona novidade'`).
4. **Push para a branch** (`git push origin feature/novidade`).
5. Abra um **Pull Request**.

## 🔒 Licença

Este projeto é de código aberto e pode ser utilizado sob os termos da [MIT License](LICENSE).

---

Obrigado por usar a **Medication API**! 🎉