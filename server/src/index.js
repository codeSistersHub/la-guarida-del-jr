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