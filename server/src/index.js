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