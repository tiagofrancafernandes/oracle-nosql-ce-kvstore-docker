'use strict';

const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
const ServiceType = require('oracle-nosqldb').ServiceType;

// Nome da tabela que usaremos para o teste
const TABLE_NAME = 'users';

async function run() {
    let client;
    try {
        // Configuração para conectar ao Oracle NoSQL local (Docker) sem segurança
        // O ServiceType.KVSTORE é necessário quando a segurança está desabilitada
        client = new NoSQLClient({
            serviceType: ServiceType.KVSTORE,
            endpoint: 'http://localhost:8080' // Endpoint do proxy configurado no Docker
        });

        console.log('Conectado ao Oracle NoSQL local...');

        // 1. Criar a tabela se ela não existir
        // Em ambientes locais, usamos DDL simples sem necessidade de provisionamento de nuvem
        const createStatement = `
            CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                id LONG,
                info JSON,
                PRIMARY KEY(id)
            )`;

        console.log(`Criando tabela ${TABLE_NAME}...`);
        await client.tableDDL(createStatement, {
            complete: true // Garante que o código espere a tabela estar PRONTA
        });
        console.log('Tabela verificada/criada com sucesso.');

        // 2. Inserir um registro (Operação PUT)
        console.log('Inserindo registro...');
        const row = {
            id: 1,
            info: {
                name: "Tiago França",
                role: "Developer",
                os: "Ubuntu 24.04",
                hardware: "i7-12650H"
            }
        };

        await client.put(TABLE_NAME, row);
        console.log('Registro inserido com sucesso.');

        // 3. Ler o registro (Operação GET)
        console.log('Recuperando registro...');
        const result = await client.get(TABLE_NAME, { id: 1 });

        if (result.row) {
            console.log('Dados recuperados do banco:');
            console.log(JSON.stringify(result.row, null, 2));
        } else {
            console.log('Registro não encontrado.');
        }

    } catch (err) {
        // Tratamento de erros detalhado do SDK
        console.error('Erro durante a execução:');
        console.error(`Mensagem: ${err.message}`);
        if (err.operation) {
            console.error(`Operação que falhou: ${err.operation.api.name}`);
        }
    } finally {
        // Sempre fechar o cliente para liberar recursos de rede
        if (client) {
            client.close();
            console.log('Conexão encerrada.');
        }
    }
}

// Executar o programa
run();
