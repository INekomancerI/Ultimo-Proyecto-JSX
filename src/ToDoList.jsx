import React, { useState } from 'react';

function ToDoList() {
  const [tareas, setTareas] = useState(["Comer", "Ducharse", "Caminar al conejo"]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [editandoIndex, seteditandoIndex] = useState(null);
  const [textoEditado, settextoEditado] = useState("");

  function handleInputChange(event) {
    setNuevaTarea(event.target.value);
  }

  function añadirTarea() {
    if (nuevaTarea.trim() !== "") {
      setTareas((t) => [...t, nuevaTarea]);
      setNuevaTarea("");
    }
  }

  function borrarTarea(index) {
    const tareasActualizadas = tareas.filter((_, i) => i !== index);
    setTareas(tareasActualizadas);
  }

  function activarEdicion(index) {
    if (editandoIndex === index) {
      if (textoEditado.trim() !== "") {
        const tareasActualizadas = [...tareas];
        tareasActualizadas[index] = textoEditado;
        setTareas(tareasActualizadas);
      }
      seteditandoIndex(null);
    } else {

      seteditandoIndex(index);
      settextoEditado(tareas[index]);
    }
  }

  return (
    <div className="lista-de-tareas">
      <div id="header">
        <h1>Lista de Tareas</h1>
      </div>

      <div id="crea-tarea">
        <input
          type="text"
          placeholder="Escriba una tarea"
          value={nuevaTarea}
          onChange={handleInputChange}
        />
        <button className="boton-añadir-tarea" onClick={añadirTarea}>
          +
        </button>
      </div>

      <ol>
        {tareas.map((tarea, index) => (
          <li key={index}>
            <input type="checkbox" />
            {editandoIndex === index ? (
              <input
                type="text"
                value={textoEditado}
                onChange={(e) => settextoEditado(e.target.value)}
              />
            ) : (
              <span className="texto">{tarea}</span>
            )}
            <button
              className="boton-editar-tarea"
              onClick={() => activarEdicion(index)}
            >
              {editandoIndex === index ? "Guardar" : "Actualizar"} 
            </button>
            <button
              className="boton-borrar-tarea"
              onClick={() => borrarTarea(index)}
            >
              X
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;