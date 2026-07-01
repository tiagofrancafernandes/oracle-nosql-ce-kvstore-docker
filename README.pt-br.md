# Oracle NoSQL CE - KVStore Docker

[🇺🇸 English Version](README.md)

Este repositório fornece a infraestrutura para rodar o **Oracle NoSQL Database Community Edition** localmente via Docker, junto com um projeto demo para integração rápida.

## 🚀 Estrutura do Repositório
- `compose.yml`: Orquestração Docker para o NoSQL Proxy e Storage Node.
- `oracle-nosql-client/`: Projeto CLI em Node.js para interagir com o banco.

## 🛠 Pré-requisitos
- Docker & Docker Compose.
- Node.js v22+ (para o projeto cliente).

## ⚡ Início Rápido
1. **Subir o Banco:**
   ```bash
   docker compose up -d
   ```
2. **Verificar Logs:**
   Aguarde a mensagem `Storage Node ... is RUNNING`:
   ```bash
   docker compose logs -f
   ```

---
*Otimizado para ambientes Ubuntu 24.04 e Intel i7 de 12ª Geração.*
