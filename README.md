# Oracle NoSQL CE - KVStore Docker

[🇧🇷 Versão em Português](README.pt-br.md)

This repository provides the infrastructure to run **Oracle NoSQL Database Community Edition** locally using Docker, along with a client demo for quick integration.

## 🚀 Repository Structure
- `compose.yml`: Docker orchestration for the NoSQL Proxy and Storage Node.
- `oracle-nosql-client/`: Node.js CLI project to interact with the database.

## 🛠 Prerequisites
- Docker & Docker Compose.
- Node.js v22+ (for the client project).

## ⚡ Quick Start
1. **Up the Database:**
   ```bash
   docker compose up -d
   ```
2. **Verify Logs:**
   Wait for the `Storage Node ... is RUNNING` message:
   ```bash
   docker compose logs -f
   ```

---
*Optimized for Ubuntu 24.04 and 12th Gen Intel i7 environments.*
