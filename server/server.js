import express from 'express';
import cors from 'cors';
import exampleRoutes from './routes/exampleRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/example', exampleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
