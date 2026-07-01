# Oracle NoSQL Local Environment

Este repositório contém a infraestrutura necessária para rodar o **Oracle NoSQL Database Community Edition** localmente utilizando Docker, além de um projeto de exemplo para integração.

## 🚀 Estrutura do Repositório

- `compose.yml`: Orquestração do container Oracle NoSQL (Proxy + Storage Node).
- `oracle-nosql-client/`: Projeto Node.js de demonstração para interação com o banco.

## 🛠 Pré-requisitos

- Docker e Docker Compose instalados.
- Node.js v22 ou superior (para o projeto cliente).

## ⚡ Quick Start (Infraestrutura)

1. **Configurar variáveis:**
   Crie um arquivo `.env` na raiz ou renomeie o exemplo (se disponível) para definir as portas:
   ```env
   NOSQL_PROXY_PORT=8080
   NOSQL_STORAGE_PORT=5000
   NOSQL_VERSION=2025-12-ce
   ```

2. **Subir o Banco de Dados:**
   ```bash
   docker compose up -d
   ```

3. **Verificar logs:**
   Aguarde a mensagem `Storage Node ... is RUNNING` aparecer nos logs:
   ```bash
   docker compose logs -f
   ```

## 📋 Detalhes Técnicos

- **Imagem:** `ghcr.io/oracle/nosql`
- **Modo:** Não seguro (`-secure-config disable`) para facilitar o desenvolvimento local.
- **Persistência:** Os dados são salvos no volume Docker `nosql_data` mapeado para `/kvroot` no container.

---
Desenvolvido para testes de integração e prototipagem rápida.
