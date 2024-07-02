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

//Listening
const port = 4500;
server.listen(port, () => {
	console.log(`servidor arrancado: http://localhost:${port}`);
});

//CRUD

//Guardar nueva publicación POST
server.post('/api/publish', async (req, res) => {
	const {
		idUser,
		userName,
		idSection,
		date_response,
		title,
		description,
		url_job,
		url_linkedIn,
		idPublishTags,
		reactionsPublish,
		tags,
	} = req.body;

	console.log('Estoy enviando el body', req.body);

	try {
		//Insertar en tabla publishes
		const [publish] = await sql`
			insert into publishes (
				fk_id_user,
				date,
				title,
				description,
				url_job, 
				url_linkedin, 
				fk_id_section, 
				fk_id_publish_tags, 
				fk_reactions_publish
			) values (
				${idUser}, 
				${date_response},
				${title}, 
				${description},
				${url_job},
				${url_linkedIn},
				${idSection},
				${idPublishTags},
				${reactionsPublish} 
			) returning id
		`;

		// const publishId = publish.id;

		//Datos para insertar en publishTags
		// const tagInserts = tags.map((tagId, index) => {
		// 	return {
		// 		kf_id_publish: publishId,
		// 		[`fk_id_tag${index + 1}`]: tagId,
		// 	};
		// });

		// //Insertar en tabla publishTags
		// await sql`
		// 	insert into publishTags ${sql(tagInserts)}
		// `;

		res.status(200).json({ message: 'Ok 200' });
		// console.log('Dentro del try');
		// console.log('req: ', req);
		// console.log('res: ', res);
	} catch (error) {
		res.status(500).json({ error: error.message });
		// console.error(error);
		// console.log('Dentro del catch');
		// console.log('req: ', req);
		// console.log('res: ', res);
	}
});

// async function getUsersOver() {
// 	try {
// 		const users = await sql`
//     select user_name, email_name
//     from users
//   `;
// 		console.log(users);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// getUsersOver();
