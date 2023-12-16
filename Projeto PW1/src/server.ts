import express from 'express';
import router from './router/routes';

const app = express();

app.use(express.json());

app.use(router);
app.use('/images', express.static('./src/uploads'));

app.listen(3000, () => console.log('Servidor na porta 3000'));
