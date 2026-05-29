# SSE Monitor

Pequeno exemplo de monitoramento em tempo real com Server-Sent Events (SSE).

O projeto expõe um servidor Node.js na porta `3000` e uma interface web que mostra:

- uso de CPU
- uso de RAM
- uptime do processo

Os dados são enviados pela rota `/events` e atualizados automaticamente na página.

## Como executar

### Localmente

```bash
node server.js
```

Depois, abra `http://localhost:3000`.

### Com Docker

```bash
docker compose up --build
```

Depois, abra `http://localhost:3000`.

## Estrutura

- `server.js`: servidor HTTP e endpoint SSE
- `index.html`: interface do painel
- `Dockerfile`: imagem Docker do projeto
- `docker-compose.yml`: execução com Compose

## Observação

Os valores de CPU e RAM sao simulados apenas para demonstracao do SSE.
