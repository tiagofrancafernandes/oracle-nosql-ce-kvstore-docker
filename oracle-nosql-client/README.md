# Oracle NoSQL Manager (Node.js CLI Demo)

Este projeto é um utilitário de interface de linha de comando (CLI) projetado para gerenciar e interagir com o **Oracle NoSQL Database Cloud Service**, rodando localmente através do Docker.

## 🚀 Por que esta aplicação?

A aplicação foi desenvolvida para agilizar o ciclo de desenvolvimento de software em ambientes que utilizam tecnologias Oracle:
1.  **Workflow Sem Fricção**: Conecta-se diretamente ao Proxy local (Porta 8080) sem a necessidade de chaves de segurança complexas, utilizando o driver nativo `ServiceType.KVSTORE`.
2.  **Poder do SQL sobre JSON**: Demonstra como executar consultas SQL tradicionais em documentos JSON semiestruturados, permitindo filtrar dados internos com facilidade.
3.  **Prototipagem Rápida**: Fornece comandos de bootstrap (setup) e manipulação de dados instantâneos para desenvolvedores que utilizam ferramentas de IA como **Claude Code** ou **Ollama**.

## 🛠 Especificações do Ambiente de Teste

O desenvolvimento foi validado em um sistema de alta performance:
*   **Sistema Operacional**: Ubuntu 24.04.3 LTS.
*   **Processador**: 12th Gen Intel i7-12650H (10 núcleos/16 threads).
*   **Memória**: ~32GB RAM.
*   **Gráficos**: NVIDIA GeForce RTX 3050 (Arquitetura Ampere com 6GB VRAM).

## 📖 Como Usar

### Pré-requisitos
Certifique-se de que o Oracle NoSQL está rodando via Docker:
```bash
docker compose up -d
```

### Comandos CLI
A ferramenta aceita argumentos posicionais simples ou strings JSON para automação.

| Comando | Descrição | Exemplo |
| :--- | :--- | :--- |
| `setup` | Cria a tabela `users` com suporte a JSON. | `node index.js setup` |
| `insert`| Insere um documento em uma tabela. | `node index.js insert users '{"id": 1, "info": {"name": "Tiago"}}'` |
| `query` | Executa consultas SQL-like. | `node index.js query "SELECT * FROM users"` |
| `help`  | Mostra a ajuda completa. | `node index.js --help` |

## 📂 Estrutura Técnica
*   **`init()`**: Gerencia o ciclo de vida da conexão com o driver `oracle-nosqldb`.
*   **`insert()`**: Utiliza a `Put API` para persistir dados transformando strings em objetos JS suportados.
*   **`statement()`**: Interface para a `Query API` que permite execução de comandos DML e DDL.
*   **`execute()`**: Despachante que interpreta o `process.argv` do Node.js v22 para roteamento dinâmico de funções.

---
*Aviso: Este projeto é destinado apenas para fins de demonstração técnica e desenvolvimento local.*
