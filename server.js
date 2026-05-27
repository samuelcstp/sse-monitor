const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
    // 1. Rota para servir a página web
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Erro ao carregar index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } 
    // 2. Rota do Event Stream (SSE)
    else if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            // Evita problemas de CORS se necessário
            'Access-Control-Allow-Origin': '*' 
        });

        // Função para simular métricas do servidor
        const sendMetrics = () => {
            const metrics = {
                cpu: Math.floor(Math.random() * 40) + 20, // Simula 20% - 60%
                ram: Math.floor(Math.random() * 30) + 50, // Simula 50% - 80%
                uptime: process.uptime().toFixed(0)
            };

            // O formato do SSE REQUER o prefixo "data: " e dois quebras de linha "\n\n" no final
            res.write(`data: ${JSON.stringify(metrics)}\n\n`);
        };

        // Envia dados a cada 1.5 segundos
        const intervalId = setInterval(sendMetrics, 1500);

        // Limpa o intervalo quando o cliente fecha a aba/conexão
        req.on('close', () => {
            clearInterval(intervalId);
            res.end();
        });
    } 
    // 3. Rota de fallback (404)
    else {
        res.writeHead(404);
        res.end('Não encontrado');
    }
}).listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});