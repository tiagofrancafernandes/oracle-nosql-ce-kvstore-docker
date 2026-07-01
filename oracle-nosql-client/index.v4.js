'use strict';

const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
const ServiceType = require('oracle-nosqldb').ServiceType;

const dbManager = {
    client: null,

    _docs: {
        check: { desc: 'Verifica a conexão com o banco local.', example: 'node index.js check' },
        setup: { desc: 'Cria a tabela inicial "users" se necessário.', example: 'node index.js setup' },
        listTables: { desc: 'Lista todas as tabelas disponíveis.', example: 'node index.js listTables' },
        insert: { 
            desc: 'Insere um registro. Aceita nome da tabela e JSON.', 
            example: 'node index.js insert users \'{"id": 10, "info": {"name": "Bot Alpha"}}\'' 
        },
        query: { 
            desc: 'Executa uma consulta SQL (Alias para statement).', 
            example: 'node index.js query "SELECT * FROM users"' 
        },
        statement: { 
            desc: 'Executa um comando SQL diretamente no banco.', 
            example: 'node index.js statement "SELECT id, info.name FROM users"' 
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
        const sql = "CREATE TABLE IF NOT EXISTS users (id LONG, info JSON, PRIMARY KEY(id))";
        console.log('🛠 Configuring initial table...');
        await this.client.tableDDL(sql, { complete: true });
        console.log('✅ Table "users" ready.');
    },

    async listTables() {
        await this.init();
        const res = await this.client.listTables();
        console.log('📋 Tables:', res.tables);
    },

    async insert(tableName, dataRaw) {
        if (!tableName || !dataRaw) {
            console.error('❌ Usage: node index.js insert <tableName> \'<jsonData>\'');
            return;
        }
        await this.init();
        try {
            const data = typeof dataRaw === 'string' ? JSON.parse(dataRaw) : dataRaw;
            await this.client.put(tableName, data);
            console.log(`✅ Record inserted into ${tableName}.`);
        } catch (err) {
            console.error('❌ Insert Error:', err.message);
        }
    },

    async statement(sql) {
        if (!sql) {
            console.error('❌ Usage: node index.js statement "<sqlQuery>"');
            return;
        }
        await this.init();
        try {
            console.log(`🚀 Executing: ${sql}`);
            const res = await this.client.query(sql);
            console.log('📄 Results:', JSON.stringify(res.rows, null, 2));
        } catch (err) {
            console.error('❌ Statement Error:', err.message);
        }
    },

    async query(sql) {
        return this.statement(sql);
    },

    help() {
        console.log('\n📖 Oracle NoSQL Manager - Help');
        console.log('='.repeat(40));
        for (const [fn, info] of Object.entries(this._docs)) {
            console.log(`\n🔹 ${fn}: ${info.desc}`);
            console.log(`   Ex: ${info.example}`);
        }
    },

    async execute(rawArgs) {
        // Ignora 'node' e o nome do arquivo, foca nos argumentos reais
        const argsList = rawArgs.slice(2);
        
        if (argsList.length === 0 || ['help', '--help', '-h'].includes(argsList[0])) {
            this.help();
            return;
        }

        let fnName = argsList[0];
        let params = argsList.slice(1);

        // Suporte para entrada via JSON (Array ou Objeto)
        if (typeof fnName === 'string' && (fnName.startsWith('{') || fnName.startsWith('['))) {
            try {
                const parsed = JSON.parse(fnName);
                if (Array.isArray(parsed)) {
                    [fnName, ...params] = parsed;
                } else {
                    fnName = parsed.fn || 'check';
                    params = parsed.args || parsed.params || [];
                }
            } catch (e) {
                // Se falhar o parse, mantém o valor original
            }
        }

        // Validação e execução dinâmica (ignora métodos privados/internos)
        if (typeof this[fnName] === 'function' && !fnName.startsWith('_') && !['execute', 'init'].includes(fnName)) {
            try {
                await this[fnName](...params);
            } catch (err) {
                console.error(`❌ Execution failed for "${fnName}":`, err.message);
            }
        } else {
            console.error(`❌ Unknown command: "${fnName}". Type --help for list.`);
        }

        if (this.client) {
            this.client.close();
        }
    }
};

// Execução
dbManager.execute(process.argv);
