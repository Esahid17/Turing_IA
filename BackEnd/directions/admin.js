// directions/admin.js
import express from 'express';
import * as functions from '../functions/functions.js';

const router = express.Router(); 

// Rutas
router.get('/admin/getAdmin', (req, res) => {
  functions.fnGetAdmins()  // Llamar a la función
    .then(function(result) {
      res.json(result);  // Enviar los resultados como JSON
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Error al obtener los administradores' });
    });
});

router.post('/admin/loginAdmin', (req, res) => {
    const { nombre, password } = req.body;  // Obtener el email y la contraseña desde el cuerpo de la solicitud
    console.log("nombre: ", nombre);
    console.log("password: ", password);
    
  
    functions.fnLoginAdmin(nombre, password)  // Llamar a la función de login
      .then(function(result) {
        res.json(result);  // Si la consulta es exitosa, enviar los resultados como JSON
      })
      .catch(function(err) {
        res.status(500).json({ error: 'Error al obtener los administradores' });  // Si ocurre un error, responder con mensaje de error
      });
  });
  

  // Ruta para agregar categoría
router.put('/admin/addCategory', (req, res) => {
  const { name, description } = req.body;

  console.log("name en direction: ", name);
  console.log("description: ", description);

  functions.fnAddCategory(name, description)
    .then(result => {
      res.json(result); // Responde con el resultado
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al agregar la categoría' }); // Maneja el error
    });
});

// Ruta para editar categoría
router.put('/admin/updateCategory/:id', (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  console.log("categoryId: ", categoryId);
  console.log("name: ", name);
  console.log("description: ", description);

  functions.fnUpdateCategory(categoryId, name, description)
    .then(result => {
      res.json(result); // Responde con el resultado
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al actualizar la categoría' }); // Maneja el error
    });
});

// Ruta para eliminar categoría
router.delete('/admin/deleteCategory/:id', (req, res) => {
  const categoryId = req.params.id;

  console.log("categoryId: ", categoryId);

  functions.fnDeleteCategory(categoryId)
    .then(result => {
      res.json(result); // Responde con el resultado
    })
    .catch(err => {
      res.status(500).json({ error: 'Error al eliminar la categoría' }); // Maneja el error
    });
});
  

// Exportar el router
export default router;
