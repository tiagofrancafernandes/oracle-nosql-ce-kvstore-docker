# Oracle NoSQL Client Demo

[🇧🇷 Versão em Português](README.pt-br.md)

A powerful Node.js CLI utility to manage JSON documents and execute SQL queries on a local Oracle NoSQL instance.

## 📖 Features
- **Dynamic CLI**: Supports positional arguments and JSON strings.
- **SQL on JSON**: Query unstructured data using familiar SQL syntax.
- **Auto-Documentation**: Integrated help system.

## 🚀 Usage
```bash
# Setup table
node index.js setup

# Insert data
node index.js insert users '{"id": 1, "info": {"name": "Tiago"}}'

# Query data
node index.js query "SELECT * FROM users"
```
