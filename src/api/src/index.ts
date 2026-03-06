import Fastify from 'fastify';
import cors from '@fastify/cors';

const server = Fastify({ logger: true });

server.register(cors, {
    origin: '*'
});

server.get('/', async (request, reply) => {
    return { status: 'ok', service: 'insurancelight-api' };
});

const start = async () => {
    try {
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
