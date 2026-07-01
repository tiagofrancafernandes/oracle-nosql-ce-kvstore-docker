'use strict';

const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
const ServiceType = require('oracle-nosqldb').ServiceType;

const dbManager = {
    client: null,

    // Configurações de documentação para o Help
    _docs: {
        check: {
            desc: 'Verifica a conexão com o banco e conta as tabelas.',
            example: 'node index.js check'
        },
        setup: {
            desc: 'Cria a tabela inicial "users" se ela não existir.',
            example: 'node index.js setup'
        },
        seed: {
            desc: 'Insere 2 registros de exemplo na tabela.',
            example: 'node index.js seed'
        },
        listTables: {
            desc: 'Lista os nomes de todas as tabelas no banco.',
            example: 'node index.js listTables'
        },
        listData: {
            desc: 'Lista todos os registros de uma tabela.',
            example: 'node index.js \'["listData", "users"]\''
        }
    },

    async init() {
        if (!this.client) {
            this.client = new NoSQLClient({
                serviceType: ServiceType.KVSTORE,
                endpoint: 'http://localhost:8080'
            });
        }
    },

    async check() {
        await this.init();
        try {
            const res = await this.client.listTables();
            console.log('✅ Connected. Tables found:', res.tables.length);
        } catch (err) {
            console.error('❌ Connection failed:', err.message);
        }
    },

    async setup() {
        await this.init();
        const statement = "CREATE TABLE IF NOT EXISTS users (id LONG, info JSON, PRIMARY KEY(id))";
        await this.client.tableDDL(statement, { complete: true });
        console.log('✅ Table "users" ready.');
    },

    async seed(tableName = 'users') {
        await this.init();
        const fakeData = [
            { id: Date.now(), info: { name: "Alpha Bot", type: "AI" } },
            { id: Date.now() + 1, info: { name: "Beta Bot", type: "Agent" } }
        ];
        for (const row of fakeData) {
            await this.client.put(tableName, row);
        }
        console.log(`✅ Seeded 2 rows into ${tableName}.`);
    },

    async listTables() {
        await this.init();
        const res = await this.client.listTables();
        console.log('📋 Tables:', res.tables);
    },

    async listData(tableName = 'users') {
        await this.init();
        const query = `SELECT * FROM ${tableName}`;
        try {
            const res = await this.client.query(query);
            console.log(`📄 Data from ${tableName}:`, JSON.stringify(res.rows, null, 2));
        } catch (err) {
            console.error(`❌ Error:`, err.message);
        }
    },

    help() {
        console.log('\n📖 Oracle NoSQL Manager - Help');
        console.log('='.repeat(40));
        for (const [fn, info] of Object.entries(this._docs)) {
            console.log(`\n🔹 Command: ${fn}`);
            console.log(`   Description: ${info.desc}`);
            console.log(`   Example:     ${info.example}`);
        }
        console.log('\n💡 Tip: You can pass JSON arrays for commands with arguments.');
    },

    async execute(rawArgs) {
        // Pega apenas o que vem depois de 'node index.js'
        const input = rawArgs[2]; 

        if (!input || input === 'help' || input === '--help' || input === '-h') {
            this.help();
            return;
        }

        let fnName = input;
        let args = [];

        try {
            if (input.startsWith('{') || input.startsWith('[')) {
                const parsed = JSON.parse(input);
                if (Array.isArray(parsed)) {
                    [fnName, ...args] = parsed;
                } else {
                    fnName = parsed.fn || 'check';
                    args = parsed.args || [];
                }
            }
        } catch (e) {
            // Se falhar o parse, mantém o input como nome da função (string simples)
        }

        if (typeof this[fnName] === 'function' && !fnName.startsWith('_') && fnName !== 'execute' && fnName !== 'init') {
            await this[fnName](...args);
        } else {
            console.error(`❌ Unknown command: "${fnName}". Type --help for list.`);
        }

        if (this.client) this.client.close();
    }
};

dbManager.execute(process.argv);
