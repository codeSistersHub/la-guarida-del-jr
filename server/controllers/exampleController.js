import pool from '../db';

export const getExampleData = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM your_table_name');
		res.status(200).json(result.rows);
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: error.message });
	}
};
