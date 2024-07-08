import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import express from 'express'
import postgres from 'postgres';


//Arranque servidor

const server = express()

//configuración de servidor

server.use(cors())
server.use(express.json({limit:"10mb"}))
//listening

const port = 4500;
server.listen(port, ()=>{ console.log (`servidor arrancado: http://localhost:${port}`)})

//conexión a BBDD
const connectionString = process.env.DATABASE_URL;
console.log('DATABASE_URL:', process.env.DATABASE_URL);
if (!connectionString) {
  console.error('DATABASE_URL no está definida');
	process.exit(1);
}

const sql = postgres(connectionString,
  {host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE}
);



async function getUsersOver() {
  try{
	const users = await sql`
    select user_name, email_name
    from users
  `;
  console.log(users);
  } catch(err){
    console.log(err)
  }
}

getUsersOver()
//GET

server.get('/api/users', async (req, res) => {
  try {
    const users = await sql`
      SELECT user_name, email_name
      FROM users
    `;
    res.json(users);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
})

server.get('/api/threads', async (req, res) => {
  console.log('Solicitud recibida en /api/threads'); // Log inicial

  const { id_section } = req.query;
  console.log('Parámetro id_section:', id_section); // Log para verificar el id_section

  // Verificar si se ha proporcionado el parámetro id_section
  if (!id_section) {
    console.log('Falta el parámetro id_section'); // Log para verificar falta de parámetro
    return res.status(400).json({ error: 'Se requiere el parámetro id_section' });
  }
 
  try {
    const publish = await sql`
      SELECT 
        id_publish, 
        name_user, 
        fkid_section, 
        title_publish, 
        url_job, 
        url_linkedIn, 
        fk_id_tag, 
        votesSmile, 
        votesSad, 
        votesHeart, 
        fk_id_user, 
        num_responses, 
        isfav 
      FROM publish 
      WHERE fkid_section = ${id_section}
    `;
    console.log('Resultados de la consulta:', publish); // Log para verificar los resultados de la consulta
    res.json(publish);
  } catch (err) {
    console.error('Error al obtener publicaciones:', err);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
});

