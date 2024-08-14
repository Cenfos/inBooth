import express from 'express';
import pool from './db.js'; // Asegúrate de importar el pool de conexiones

const app = express();
const PORT = 3001;

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: true }));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

// Ruta para manejar el formulario de contacto
app.post('/send-form', async (req, res) => {
  const { nombre, apellidos, razonSocial, telefono, email, observaciones } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO contactos (nombre, apellidos, razonSocial, telefono, email, observaciones) VALUES (?, ?, ?, ?, ?, ?)', 
      [nombre, apellidos, razonSocial, telefono, email, observaciones]);
    conn.release();

    res.send('Formulario enviado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar el formulario');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
