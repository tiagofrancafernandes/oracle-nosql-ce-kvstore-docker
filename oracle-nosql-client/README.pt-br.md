# Oracle NoSQL Client Demo

[🇺🇸 English Version](README.md)

Utilitário CLI em Node.js para gerenciar documentos JSON e executar consultas SQL em uma instância local do Oracle NoSQL.

## 📖 Recursos
- **CLI Dinâmica**: Suporte a argumentos posicionais e strings JSON.
- **SQL em JSON**: Consulte dados não estruturados com sintaxe SQL familiar.
- **Auto-documentação**: Sistema de ajuda integrado.

## 🚀 Como Usar
```bash
# Configurar tabela
node index.js setup

# Inserir dados
node index.js insert users '{"id": 1, "info": {"name": "Tiago"}}'

# Consultar dados
node index.js query "SELECT * FROM users"
```

## 🛠 Especificações
- **SO**: Ubuntu 24.04.3 LTS
- **CPU**: Intel i7-12650H (12ª Geração)
- **RAM**: ~32GB
