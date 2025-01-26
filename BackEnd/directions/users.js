// directions/user.js
import express from 'express';
import * as functions from '../functions/functions.js';

const router = express.Router();

// Ruta para obtener usuarios
router.get('/user/getUsers', (req, res) => {
  functions.fnGetUsers()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    });
});
router.get('/user/getCategories', (req, res) => {
  functions.fnGetCategories()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    });
});

router.post('/user/loginUser', (req, res) => {
    const { email, password } = req.body;  // Obtener el email y la contraseña desde el cuerpo de la solicitud
    console.log("email: ", email);
    console.log("password: ", password);
    
  
    functions.fnLoginUser(email, password)  // Llamar a la función de login
      .then(function(result) {
        res.json(result);  // Si la consulta es exitosa, enviar los resultados como JSON
      })
      .catch(function(err) {
        res.status(500).json({ error: 'Error al obtener los administradores' });  // Si ocurre un error, responder con mensaje de error
      });
  });

  // Ruta para actualizar el usuario
router.put('/user/registerUser', (req, res) => {
  const { name, email, password } = req.body;

  console.log("name: ", name);
  console.log("email: ", email);
  console.log("password: ", password);

  // Llamamos a la función que actualizará el usuario
  functions.fnRegisterUser(name, email, password)
    .then(result => {
      res.json(result);  // Enviar la respuesta al frontend
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al registrar los datos del usuario' });
    });
});
// Exportar el router
export default router;
