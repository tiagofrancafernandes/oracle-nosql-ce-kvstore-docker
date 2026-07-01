# Oracle NoSQL Manager (Node.js Demo)

A robust Command Line Interface (CLI) utility to manage and interact with **Oracle NoSQL Database Cloud Service** (running locally via Docker).

## 🚀 Why this application?

This demo was created to solve a common developer friction point: **how to quickly prototype and test NoSQL schemas without a heavy UI or complex cloud setup.**

The primary goals are:
1.  **Bridging the Gap:** Demonstrating how to use the `oracle-nosqldb` SDK with a non-secure local Docker environment.
2.  **HTAP Capabilities:** Showcasing how Oracle NoSQL handles both structured data (Key-Value) and unstructured data (JSON) in the same table using SQL-like syntax.
3.  **Automation for AI Agents:** Built with a structure that allows AI Coding Agents (like Claude Code or Cline) to easily read, write, and manage database states through simple CLI commands.

## 🛠 Tech Stack

*   **Runtime:** Node.js v22+
*   **Database:** Oracle NoSQL Community Edition (Docker)
*   **Protocol:** Binary over HTTP (via Proxy on port 8080)
*   **Architecture:** Singleton Manager Pattern with Dynamic Command Execution.

## 📦 Prerequisites

Ensure you have your local Oracle NoSQL container running:

```bash
docker compose up -d
```

*Note: This application is configured to connect to `http://localhost:8080` using `ServiceType.KVSTORE` to bypass local authorization requirements.*

## 📖 Commands & Usage

The script supports simple string commands or JSON-formatted arguments for more complex tasks.

### Basic Commands

| Command | Description |
| :--- | :--- |
| `check` | (Default) Validates the connection and counts existing tables. |
| `setup` | Bootstraps the environment by creating the `users` table. |
| `seed` | Populates the database with initial fake JSON data. |
| `listTables` | Lists all tables currently available in the store. |
| `help` | Displays the documentation and examples. |

### Advanced Usage (JSON Params)

You can pass arguments to functions using JSON arrays:

```bash
# List data from a specific table
node index.js '["listData", "users"]'

# Advanced execution using object syntax
node index.js '{"fn": "listData", "args": ["users"]}'
```

## 📂 Code Structure

*   **`_docs`**: Internal metadata for self-documentation.
*   **`init()`**: Handles the Singleton connection to the NoSQL Proxy.
*   **`tableDDL()`**: Demonstrates how to run Data Definition Language (DDL) statements.
*   **`query()`**: Uses the SQL for NoSQL engine to filter data inside JSON blocks.
*   **`execute()`**: A dynamic dispatcher that parses CLI input and routes to the correct method.

## 💡 Practical Examples

**1. Create the environment:**
```bash
node index.js setup
```

**2. Insert test data:**
```bash
node index.js seed
```

**3. Retrieve and inspect JSON objects:**
```bash
node index.js listData
```

---
Developed for testing and integration purposes in local development environments.
