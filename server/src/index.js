// const express = require('express');
// const cors = require('cors');
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import postgres from 'postgres';

//Conexión a BBDD
const connectionString = process.env.DATABASE_URL;
console.log('DATABASE_URL:', process.env.DATABASE_URL);
if (!connectionString) {
	console.error('DATABASE_URL no está definida');
	process.exit(1);
}

const sql = postgres(connectionString, {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

//Arranque servidor
const server = express();

//Configuración de servidor
server.use(cors());
server.use(express.json({ limit: '10mb' }));

//Guardar nueva publicación POST
server.post('/api/publish', async (req, res) => {
	const { idUser, userName, idSection, date_response, description, url_job, url_linkedIn, tags } = req.body;

	if (!idUser || !userName || !idSection || !description || !tags) {
		return res.status(400).json({ error: 'Faltan campos obligatorios' });
	}

	try {
		const result =
			await sql`INSERT INTO publishes (date, title, description, url_job, url_linkedin, fk_id_user, fk_id_section)
      VALUES (${date_response}, ${userName}, ${description}, ${url_job}, ${url_linkedIn}, ${idUser}, ${idSection})
      RETURNING id`;

		const publishId = result[0].id;

		await sql`INSERT INTO publishTags (fk_id_publish, fk_id_tag1, fk_id_tag2, fk_id_tag3, fk_id_tag4, fk_id_tag5, fk_id_tag6)
			VALUES (${publishId}, ${tags[0]}, ${tags[1]}, ${tags[2]}, ${tags[3]}, ${tags[4]}, ${tags[5]})`;

		res.status(200).json({ ok: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ ok: false, error: 'Ha ocurrido un error al guargar la publicación' });
	}
});

//Listening
const port = 4500;
server.listen(port, () => {
	console.log(`servidor arrancado: http://localhost:${port}`);
});

async function getUsersOver() {
	try {
		const users = await sql`
    select user_name, email_name
    from users
  `;
		console.log(users);
	} catch (err) {
		console.log(err);
	}
}

getUsersOver();
