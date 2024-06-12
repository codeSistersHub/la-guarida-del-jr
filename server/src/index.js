//Imports

import express, { json } from 'express';
import cors from 'cors';
//Arranque servidor

const server = express();

//configuración de servidor

server.use(cors());
server.use(json({ limit: '10mb' }));

const port = 3000
server.listen(port, () => {
  console.log(`servidor arrancado: http://localhost:${port}`);
});



