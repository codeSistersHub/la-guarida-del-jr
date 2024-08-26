// const express = require('express');
// const cors = require('cors');
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



// async function getUsersOver() {
//   try{
// 	const users = await sql`
//     select user_name, email_name
//     from users
//   `;
//   console.log(users);
//   } catch(err){
//     console.log(err)
//   }
// }

// getUsersOver()

server.put('/api/edit_publish', async(req,res)=>{
  try {
    const {id, date, title, description, url_job, url_linkedin} = req.body
    if (!id || [title, description].some(val => !val || typeof val !== 'string' || val.trim().length === 0 )) {
      return res.status(400).json({ errorMessage: 'Invalid parameters' });
    }
    //Doy por hecho que el usuario ya está verificado.
    const result = await sql`
      UPDATE publishes 
      SET
        date=${date}
        ,title=${title}
        ,description=${description}
        ,url_job=${url_job ?? ''}
        ,url_linkedin=${url_linkedin ?? ''}
      WHERE id=${id}
    `;
    if (result.count === 0) {
      res.status(404).json({ errorMessage: '"id" not found' });
    }
    res.status(200).end();    
  } catch (err){
    console.error(err);
    res.status(500).json({errorMessage:'A error has occured', errorDetail: err});
  }
})

server.put('/api/edit_response', async (req,res)=>{
  try{
    const {id, date, description} = req.body
    if(!id || !date || description.trim() < 1){
       return res.status(400).json({ errorMessage: 'Invalid parameters' });
    }
    const result = await sql`
    UPDATE responses 
      SET
        date=${date}
        ,description=${description}
      WHERE id=${id}
    `;
    if (result.count === 0) {
      res.status(404).json({ errorMessage: '"id" not found' });
    }
    res.status(200).end(); 
  }catch(err) {
     res.status(500).json({errorMessage:'A error has occured', errorDetail: err});
  }
})

server.delete('/api/delete_publish', async (req,res)=>{
  try{
    const {id} = req.body
    if(!id ){
       return res.status(400).json({ errorMessage: 'Invalid parameters' });
    }
    const result = await sql`
    DELETE FROM publishes 
    WHERE id=${id}
    `;
    if (result.count === 0) {
      res.status(404).json({ errorMessage: '"id" not found' });
    }
    res.status(200).end(); 
  }catch(err) {
     res.status(500).json({errorMessage:'A error has occured', errorDetail: err});
  }
})
server.delete('/api/delete_response', async (req,res)=>{
  try{
    const {id} = req.body
    if(!id ){
       return res.status(400).json({ errorMessage: 'Invalid parameters' });
    }
    const result = await sql`
    DELETE FROM responses
    WHERE id=${id}
    `;
    if (result.count === 0) {
      res.status(404).json({ errorMessage: '"id" not found' });
    }
    res.status(200).end(); 
  }catch(err) {
     res.status(500).json({errorMessage:'A error has occured', errorDetail: err});
  }
})

//1.API/THREADS
server.get('/api/threads', async (req, res) => {
  console.log('Solicitud recibida en /api/threads'); // Log inicial

  const { id_section } = req.query;
  console.log('Parámetro id_section:', id_section); // Log para verificar el id_section

 
  if (!id_section) {
    console.log('Falta el parámetro id_section'); // Log para verificar falta de parámetro
    return res.status(400).json({ error: 'Se requiere el parámetro id_section' });
  }
 
  try {
    const publish = await sql`
      SELECT 
        id, 
        date, 
        title,
        description
      FROM publishes 
      WHERE fk_id_section = ${id_section}
    `;
    console.log('Resultados de la consulta:', publish); // Log para verificar los resultados de la consulta
    res.json(publish);
  } catch (err) {
    console.error('Error al obtener publicaciones:', err);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
});

//2.API/RESPONSES
server.get('/api/responses', async (req, res) => {
  console.log('Solicitud recibida en /api/responses'); 

  const { id_publish } = req.query;
  console.log('Parámetro id_publishes:', id_publish); 

 
  if (!id_publish) {
    console.log('Falta el parámetro id_pubilshes');
    return res.status(400).json({ error: 'Se requiere el parámetro id_publishes' });
  }
 
  try {
    const response = await sql`
      SELECT 
        id, 
        date, 
        
        description
      FROM responses 
      WHERE fk_id_publish = ${id_publish}
    `;
    console.log('Resultados de la consulta:', response); // Log para verificar los resultados de la consulta
    res.json(response);
  } catch (err) {
    console.error('Error al obtener respuestas:', err);
    res.status(500).json({ error: 'Error al obtener respuestas' });
  }
});

//3.datos publicación para editar publicación
server.get('/api/publish/:id_publish', async (req, res) => {
  console.log('Solicitud recibida en /api/publish'); 

  const { id_publish } = req.params; // Acceder al parámetro de ruta
  console.log('Parámetro id_publish:', id_publish); 

  if (!id_publish) {
    console.log('Falta el parámetro id_publish');
    return res.status(400).json({ error: 'Se requiere el parámetro id_publish' });
  }
 
  try {
    const dataPublish = await sql`
      SELECT 
        id, 
        date, 
        title,
        description
      FROM publishes 
      WHERE id = ${id_publish}
    `;
    console.log('Resultados de la consulta:', dataPublish); // Log para verificar los resultados de la consulta
    res.json(dataPublish);
  } catch (err) {
    console.error('Error al obtener datos de la publicación:', err);
    res.status(500).json({ error: 'Error al obtener datos de la publicación' });
  }
});

//4 datos resspues para poder editar respuesta
server.get('/api/response/:id_response', async (req, res) => {
  console.log('Solicitud recibida en /api/response'); 

  const { id_response } = req.params; // Acceder al parámetro de ruta
  console.log('Parámetro id_response:', id_response); 

  if (!id_response) {
    console.log('Falta el parámetro id_response');
    return res.status(400).json({ error: 'Se requiere el parámetro id_response' });
  }
 
  try {
    const dataResponse = await sql`
      SELECT 
        id, 
        date, 
        description
      FROM responses 
      WHERE id = ${id_response}
    `;
    console.log('Resultados de la consulta:', dataResponse); // Log para verificar los resultados de la consulta
    res.json(dataResponse);
  } catch (err) {
    console.error('Error al obtener datos de la respuesta:', err);
    res.status(500).json({ error: 'Error al obtener datos de la respuesta' });
  }
});

//5 Listar secciones
server.get('/api/sections', async (req, res) => {
  console.log('Solicitud recibida en /api/sections'); 

  try {
    const sections = await sql`
      SELECT 
        id, 
        name
      FROM sections
    `;
    console.log('Resultados de la consulta:', sections); // Log para verificar los resultados de la consulta
    res.json(sections);
  } catch (err) {
    console.error('Error al obtener secciones:', err);
    res.status(500).json({ error: 'Error al obtener secciones' });
  }
});

//6 Listar tags
server.get('/api/tags', async (req, res) => {
  console.log('Solicitud recibida en /api/tags'); 

  try {
    const tags = await sql`
      SELECT 
        id, 
        name,
        color,
        icon
      FROM tags
    `;
    console.log('Resultados de la consulta:', tags); // Log para verificar los resultados de la consulta
    res.json(tags);
  } catch (err) {
    console.error('Error al obtener tags:', err);
    res.status(500).json({ error: 'Error al obtener tags' });
  }
});


//
server.post('/api/publishes', async (req, res) => {
  console.log('Solicitud recibida en /api/publishes'); 

  console.log('body,', req.body);
 const { date, 
  title,
  description,
  url_job,
  url_linkedin,
  fk_id_user,
  fk_id_section,
  fk_id_publish_tags,
  fk_reactions_publish } = req.body;
 
  
  try {
    const response = await sql`
      INSERT INTO publishes (
        date, 
        title,
        description,
        url_job,
        url_linkedin,
        fk_id_user,
        fk_id_section,
        fk_id_publish_tags,
        fk_reactions_publish
      ) VALUES (
        ${date}, 
        ${title}, 
        ${description}, 
        ${url_job}, 
        ${url_linkedin}, 
        ${fk_id_user}, 
        ${fk_id_section}, 
        ${fk_id_publish_tags}, 
        ${fk_reactions_publish}
      )
    `;
    console.log('Resultados de la consulta:', response); // Log para verificar los resultados de la consulta
    res.status(200).json({ message: 'Publicación creada exitosamente' });
  } catch (err) {
    console.error('Error al insertar en la base de datos:', err);
    res.status(500).json({ error: `Error interno: ${err.message ?? 'desconocido'}` });
  }
});

// Iniciar el servidor en un puerto específico
server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});