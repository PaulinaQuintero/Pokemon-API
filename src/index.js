/**
 * Reto: API de Pokemon
 *
 * Estructura de los datos de entrenadores
 *  {
 *    "id": 1,
 *    "nombre": "Ash Ketchup",
 *    "region": "Kanto",
 *    "pokemon": [
 *      "Pikachu",
 *      "Charmander",
 *      "Squirtle"
 *    ]
 * }
 *
 *
 * 1. Obtener la lista de los NOMBRES y ID de los entrenadores
 *
 * 2. Obtener la info de un entrenador por su ID
 * 
 * 3. Obtener el listado de POKEMON de un entrenador (por ID)
 * 
 * 4. Crear un nuevo entrenador
 * 
 * 5. Agregar un pokemon a un entrenador
 */

 const express = require("express");
 const entrenadores = require("./entrenadores.json");
 
 const app = express();
 
 app.use(express.json());
 
 app.get("/", function (request, response) {
   response.end("API Entrenadores Pokemon");
 });

 app.get("/obtenerEntrenadores", function (request, response) {
     let totalEntrenadores = [];
     for(let i = 0; i < entrenadores.length; i++) {
         nombre = entrenadores[i].nombre;
         id = entrenadores[i].id;
         totalEntrenadores.push({id: id, nombre, nombre})
     }
     response.json(totalEntrenadores);
  });

  app.get("/obtenerEntrenador/:id", function (request, response) {
    const { id } = request.params;
    const result = entrenadores.filter(entrenador => String(entrenador.id) === id);
    response.json(result);

 });

 app.get("/obtenerPokemones/:id", function (request, response) {
    const { id } = request.params;
    const result = entrenadores.filter(entrenador => String(entrenador.id) === id);
    response.json(result[0].pokemon);
 });

 app.get("/agregarEntrenador", function (request, response) {
    const entrenador = request.body;
    let ultimoEntrenador = entrenadores[entrenadores.length - 1];
    entrenadores.push({ ...entrenador, id: ++ultimoEntrenador });
  
    response.end("Entrenador agregado con exito");
 });

 app.get("/agregarPokemon/entrenador/:id", function (request, response) {
    const { id } = request.params;
    const pokemon = request.body;
    const result = entrenadores.filter(entrenador => String(entrenador.id) === id);
    result.pokemon.push(pokemon.nombre)
  
    response.end(`Pokemon ${pokemon.nombre} agregado con exito al entrenador ${result.nombre}`);
 });

  app.listen(8080, function () {
    console.log("> Escuchando puerto 8080");
  });