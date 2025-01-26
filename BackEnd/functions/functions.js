// functions/functions.js
import { MongoClient, ObjectId } from 'mongodb';  // Reemplazar require con import


var strUrl = "mongodb://localhost:27017/turing_ia";
const clientdb = new MongoClient(strUrl);
await clientdb.connect();
const db = clientdb.db('turing_ia');

async function connectDb() {
  try {
    await clientdb.connect();
    return clientdb.db('turing_ia');
  } catch (err) {
    console.error('Error de conexión a la base de datos:', err);
    throw err;  // Lanzar el error si la conexión falla
  }
}

export function fnGetAdmins() {
    return new Promise((resolve, reject) => {
      db.collection('administradores')
        .find()
        .toArray()
        .then((admins) => {
          console.log("Consulta correcta");
          resolve({intStatus: 1 ,jsnAnswer : admins}); // Resuelve la promesa con los administradores
        })
        .catch((err) => {
          console.error('Error al obtener los administradores:', err);
          reject(new Error('Error al obtener los administradores')); // Rechaza la promesa con un error
        });
    });
  }

  export function fnLoginAdmin(nombre, password) {
    return new Promise((resolve, reject) => {
      db.collection('administradores')
        .find({ nombre: nombre })
        .toArray()
        .then((admins) => {
          if (admins.length === 0) {
            // Si no se encuentra el correo
            resolve({ intStatus: 4, jsnAnswer: 'Usuario incorrecto' });
          } else {
            // Si se encuentra el correo, pero la contraseña es incorrecta
            const admin = admins[0];
            if (admin.password !== password) {
              resolve({ intStatus: 2, jsnAnswer: 'Contraseña incorrecta' });
            } else {
              // Si el correo y la contraseña son correctos
              resolve({ intStatus: 1, jsnAnswer: admin });
            }
          }
        })
        .catch((err) => {
          console.error('Error al obtener los administradores:', err);
          reject(new Error('Error al obtener los administradores'));
        });
    });
  }
  
  
  export function fnGetUsers() {
    return new Promise((resolve, reject) => {
      db.collection('usuarios') // Cambia 'usuarios' por el nombre real de tu colección
        .find()
        .toArray()
        .then((users) => {
          console.log("Consulta de usuarios correcta");
          resolve({intStatus: 1 ,jsnAnswer : users}); // Resuelve la promesa con los administradores
        })
        .catch((err) => {
          console.error('Error al obtener los usuarios:', err);
          reject(new Error('Error al obtener los usuarios')); // Rechaza la promesa con un error
        });
    });
  }

  export function fnLoginUser(email, password) {
    return new Promise((resolve, reject) => {
      db.collection('usuarios')
        .find({ email: email })
        .toArray()
        .then((users) => {
          if (users.length === 0) {
            // Si no se encuentra el correo
            resolve({ intStatus: 4, jsnAnswer: 'Usuario incorrecto' });
          } else {
            // Si se encuentra el correo, pero la contraseña es incorrecta
            const user = users[0];
            if (user.password !== password) {
              resolve({ intStatus: 2, jsnAnswer: 'Contraseña incorrecta' });
            } else {
              // Si el correo y la contraseña son correctos
              resolve({ intStatus: 1, jsnAnswer: user });
            }
          }
        })
        .catch((err) => {
          console.error('Error al obtener los usuarios:', err);
          reject(new Error('Error al obtener los usuarios'));
        });
    });
  }

  export function fnGetCategories() {
    return new Promise((resolve, reject) => {
      db.collection('categorias') // Cambia 'usuarios' por el nombre real de tu colección
        .find()
        .toArray()
        .then((categorias) => {
          console.log("Consulta de categorias correcta");
          resolve({intStatus: 1 ,jsnAnswer : categorias}); // Resuelve la promesa con los administradores
        })
        .catch((err) => {
          console.error('Error al obtener las categorias:', err);
          reject(new Error('Error al obtener las categorias')); // Rechaza la promesa con un error
        });
    });
  }

  export function fnRegisterUser(name, email, password) {
    return new Promise((resolve, reject) => {
      // Verificar si el correo ya existe en la base de datos
      db.collection('usuarios')
        .findOne({ email: email }) // Buscar el correo en la base de datos
        .then(existingUser => {
          if (existingUser) {
            // Si ya existe un usuario con ese correo
            resolve({ intStatus: 4, jsnAnswer: 'El correo electrónico ya está registrado' });
          } else {
            // Si el correo no existe, proceder a registrar el nuevo usuario
            db.collection('usuarios')
              .insertOne({
                name: name,
                email: email,
                password: password // Contraseña en texto plano (no recomendado en producción)
              })
              .then(result => {
                resolve({ intStatus: 1, jsnAnswer: "Usuario registrado correctamente"}); // Devolver usuario insertado
              })
              .catch(err => {
                console.error('Error al registrar el usuario:', err);
                reject(new Error('Error al registrar el usuario'));
              });
          }
        })
        .catch(err => {
          console.error('Error al verificar el correo:', err);
          reject(new Error('Error al verificar el correo electrónico'));
        });
    });
  }


  // Función para agregar una categoría
export function fnAddCategory(name, description) {
  return new Promise((resolve, reject) => {
    console.log("Entre a la funcion");
    console.log("name, description: ", name, description);
    
    
    

    db.collection('categorias').insertOne({ name : name, description :description})
      .then(result => {
        resolve({ intStatus: 1, jsnAnswer: 'Categoría agregada con éxito' });
      })
      .catch(err => {
        console.error('Error al agregar la categoría:', err);
        reject({ intStatus: 500, jsnAnswer: 'Error al agregar la categoría' });
      });
  });
}

// Función para editar una categoría
export function fnUpdateCategory(categoryId, name, description) {
  return new Promise((resolve, reject) => {
    if (!name || !description) {
      return reject({ intStatus: 400, jsnAnswer: 'Nombre y descripción son requeridos' });
    }

    db.collection('categorias').findOneAndUpdate(
      { _id: ObjectId(categoryId) },
      { $set: { name, description } },
      { returnDocument: 'after' }
    )
      .then(result => {
        if (result.value) {
          resolve({ intStatus: 1, jsnAnswer: 'Categoría actualizada con éxito' });
        } else {
          reject({ intStatus: 404, jsnAnswer: 'Categoría no encontrada' });
        }
      })
      .catch(err => {
        console.error('Error al actualizar la categoría:', err);
        reject({ intStatus: 500, jsnAnswer: 'Error al actualizar la categoría' });
      });
  });
}

// Función para eliminar una categoría
export function fnDeleteCategory(categoryId) {
  return new Promise((resolve, reject) => {
    try {
      console.log("ENTRE A fnDeleteCategory");
      console.log("categoryId: ", categoryId);
      
      // Asegúrate de convertir categoryId a ObjectId
      const categoryObjectId = new ObjectId(categoryId);

      db.collection('categorias').deleteOne({ _id: categoryObjectId })
        .then(result => {
          if (result.deletedCount > 0) {
            resolve({ intStatus: 1, jsnAnswer: 'Categoría eliminada con éxito' });
          } else {
            resolve({ intStatus: 404, jsnAnswer: 'Categoría no encontrada' });
          }
        })
        .catch(err => {
          console.error('Error al eliminar la categoría:', err);
          reject({ intStatus: 500, jsnAnswer: 'Error al eliminar la categoría' });
        });
    } catch (error) {
      console.error('Error en fnDeleteCategory:', error);
      reject({ intStatus: 500, jsnAnswer: 'Error al procesar el ID de la categoría' });
    }
  });
}

  
  
