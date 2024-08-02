// server/index.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import postgres from 'postgres';
import cors from 'cors';

// Conexión a BBDD
const connectionString = process.env.DATABASE_URL;
console.log('DATABASE_URL:', connectionString);
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

// Arranque servidor
const server = express();

// Configuración de servidor
server.use(cors());
server.use(express.json({ limit: '10mb' }));

// Listening
const port = 4500;
server.listen(port, () => {
	console.log(`servidor arrancado: http://localhost:${port}`);
});

// CRUD
server.pos


// server.post('/api/publish', async (req, res) => {
// 	const { idUser, idSection, date, title, description, url_job, url_linkedIn, idPublishTags, reactionsPublish, tags } =
// 		req.body;

// 	try {
// 		const [publish] = await sql`
//       INSERT INTO publishes (
//         fk_id_user,
//         date,
//         title,
//         description,
//         url_job,
//         url_linkedin,
//         fk_id_section,
//         fk_id_publish_tags,
//         fk_reactions_publish
//       ) VALUES (
//         ${idUser},
//         ${date},
//         ${title},
//         ${description},
//         ${url_job},
//         ${url_linkedIn},
//         ${idSection},
//         ${idPublishTags},
//         ${reactionsPublish}
//       ) RETURNING id
//     `;

// 		const publishId = publish.id;

// 		// Datos para insertar en publishTags
// 		const tagInserts = tags.map((tagId) => ({
// 			fk_id_publish: publishId,
// 			fk_id_tag1: tagId,
// 			fk_id_tag2: null,
// 			fk_id_tag3: null,
// 			fk_id_tag4: null,
// 			fk_id_tag5: null,
// 			fk_id_tag6: null,
// 		}));

// 		// Insertar en tabla publishTags
// 		for (const tag of tagInserts) {
// 			await sql`
//         INSERT INTO publishTags (
//           fk_id_publish,
//           fk_id_tag1,
//           fk_id_tag2,
//           fk_id_tag3,
//           fk_id_tag4,
//           fk_id_tag5,
//           fk_id_tag6
//         ) VALUES (
//           ${tag.fk_id_publish},
//           ${tag.fk_id_tag1},
//           ${tag.fk_id_tag2},
//           ${tag.fk_id_tag3},
//           ${tag.fk_id_tag4},
//           ${tag.fk_id_tag5},
//           ${tag.fk_id_tag6}
//         )
//       `;
// 		}

// 		res.status(200).json({ message: 'Publicación y tags creadas correctamente' });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: error.message });
// 	}
// });

// Función de ejemplo para obtener usuarios
async function getUsersOver() {
	try {
		const users = await sql`
      SELECT user_name, email_name
      FROM users
    `;
		console.log(users);
	} catch (err) {
		console.log(err);
	}
}

getUsersOver();
