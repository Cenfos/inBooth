import express from 'express';
import pool from './db.js'; // Asegúrate de importar la conexión a la base de datos

const app = express();
const PORT = 3001;

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

    res.send(`
      <div>
        <p>Formulario enviado exitosamente</p>
        <button onclick="window.location.href='/contacto'">Volver al formulario</button>
        <button onclick="window.location.href='/'">Volver al inicio</button>
      </div>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send(`
      <div>
        <p>Error al enviar el formulario</p>
        <button onclick="window.location.href='/contacto'">Volver al formulario</button>
        <button onclick="window.location.href='/'">Volver al inicio</button>
      </div>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
