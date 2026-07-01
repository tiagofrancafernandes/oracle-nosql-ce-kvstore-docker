'use strict';

const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
const ServiceType = require('oracle-nosqldb').ServiceType;

const dbManager = {
    client: null,

    // Inicializa a conexão com o Oracle NoSQL local
    async init() {
        if (!this.client) {
            this.client = new NoSQLClient({
                serviceType: ServiceType.KVSTORE,
                endpoint: 'http://localhost:8080'
            });
        }
    },

    // Default function: Health Check
    async check() {
        await this.init();
        try {
            const res = await this.client.listTables();
            console.log('✅ Health Check: Connected successfully.');
            console.log(`📊 Tables found: ${res.tables.length}`);
        } catch (err) {
            console.error('❌ Health Check Error:', err.message);
        }
    },

    // Setup initial table
    async setup() {
        await this.init();
        const statement = "CREATE TABLE IF NOT EXISTS users (id LONG, info JSON, PRIMARY KEY(id))";
        console.log('🛠 Configuring initial table...');
        await this.client.tableDDL(statement, { complete: true });
        console.log('✅ Table "users" is ready.');
    },

    // Insert fake data (Fixed syntax and Date.now)
    async seed(tableName = 'users') {
        await this.init();
        console.log(`🌱 Seeding data into "${tableName}"...`);
        
        const fakeData = [
            { id: Date.now(), info: { name: "Bot Alpha", type: "AI", status: "active" } },
            { id: Date.now() + 1, info: { name: "Bot Beta", type: "Agent", status: "idle" } }
        ];

        for (const row of fakeData) {
            await this.client.put(tableName, row);
        }
        console.log('✅ Data inserted.');
    },

    // List all tables
    async listTables() {
        await this.init();
        const res = await this.client.listTables();
        console.log('📋 Tables List:', res.tables);
    },

    // List data from a table
    async listData(tableName = 'users') {
        await this.init();
        console.log(`🔍 Fetching data from "${tableName}"...`);
        const query = `SELECT * FROM ${tableName}`;
        try {
            const res = await this.client.query(query);
            console.log('📄 Results:', JSON.stringify(res.rows, null, 2));
        } catch (err) {
            console.error(`❌ Error listing data from ${tableName}:`, err.message);
        }
    },

    // Dynamic executor
    async execute(input) {
        let fnName = 'check';
        let args = [];

        if (input && typeof input === 'string') {
            try {
                // Handle JSON Array or Object
                if (input.startsWith('{') || input.startsWith('[')) {
                    const parsed = JSON.parse(input);
                    if (Array.isArray(parsed)) {
                        [fnName, ...args] = parsed;
                    } else {
                        fnName = parsed.fn || 'check';
                        args = parsed.args || parsed.params || [];
                    }
                } else {
                    // Simple string
                    fnName = input;
                }
            } catch (err) {
                // If JSON fails, treat as simple string
                fnName = input;
            }
        }

        // Validate and run
        if (typeof this[fnName] === 'function' && !['init', 'execute'].includes(fnName)) {
            try {
                await this[fnName](...args);
            } catch (err) {
                console.error(`❌ Execution failed for "${fnName}":`, err.message);
            }
        } else {
            console.error(`❌ Error: Function "${fnName}" is invalid.`);
        }

        if (this.client) this.client.close();
    }
};

// Handle process arguments
const userArg = process.argv[2]; // Captures only the first argument after index.js
dbManager.execute(userArg);
