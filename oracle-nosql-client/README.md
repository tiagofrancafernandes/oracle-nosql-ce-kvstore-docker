# Oracle NoSQL Client Demo

Este é um projeto de demonstração em **Node.js v22** que implementa uma interface de linha de comando (CLI) para interagir com o Oracle NoSQL local.

## 📖 Funcionalidades

- **Setup Automatizado**: Criação de tabelas com suporte a campos JSON.
- **CLI Dinâmica**: Suporte a argumentos posicionais simples ou comandos formatados em JSON.
- **HTAP**: Execução de consultas SQL diretamente sobre documentos JSON.
- **Auto-documentação**: Sistema de ajuda integrado com o comando `help`.

## ⚙️ Instalação

Entre na pasta do projeto e instale as dependências:

```bash
cd oracle-nosql-client
npm install
```

## 🚀 Como Usar

O script `index.js` gerencia as operações. Você pode executá-lo passando o nome da função e os argumentos.

### Ajuda e Documentação
```bash
node index.js --help
```

### Comandos Disponíveis

| Comando | Descrição | Exemplo |
| :--- | :--- | :--- |
| `check` | Verifica se o proxy está respondendo. | `node index.js check` |
| `setup` | Cria a tabela `users` (id, info). | `node index.js setup` |
| `listTables` | Lista as tabelas do banco. | `node index.js listTables` |
| `insert` | Insere um JSON em uma tabela. | `node index.js insert users '{"id": 1, "info": {"name": "Tiago"}}'` |
| `query` | Executa uma consulta SQL. | `node index.js query "SELECT * FROM users"` |

### Exemplos Avançados (JSON)

Você também pode passar arrays JSON para chamadas complexas:
```bash
node index.js '["listData", "users"]'
```

## 📂 Arquivos de Evolução

Para fins de histórico de desenvolvimento, este diretório contém:
- `index.js`: Versão atual e estável com todos os recursos.
- `index.v1.js` a `index.v4.js`: Versões anteriores e marcos de desenvolvimento.

---
**Ambiente de Teste:** Ubuntu 24.04 | i7-12650H | 32GB RAM
