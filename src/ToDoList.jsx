import React, { useState } from 'react';

function ToDoList() {
  const [tareas, setTareas] = useState([
    { text: "Comer", completada: false },
    { text: "Ducharse", completada: false },
    { text: "Caminar al conejo", completada: false },
  ]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [editandoIndex, setEditandoIndex] = useState(null); 
  const [textoEditado, setTextoEditado] = useState(""); 
  const [mostrarTodas, setMostrarTodas] = useState(true); 

  function handleInputChange(event) {
    setNuevaTarea(event.target.value);
  }

  function añadirTarea() {
    if (nuevaTarea.trim() !== "") {
      setTareas((t) => [...t, { text: nuevaTarea, completada: false }]);
      setNuevaTarea("");
    }
  }

  function borrarTarea(index) {
    const tareasActualizadas = tareas.filter((_, i) => i !== index);
    setTareas(tareasActualizadas);
  }

  function toggleEdit(index) {
    if (editandoIndex === index) {
      if (textoEditado.trim() !== "") {
        const tareasActualizadas = [...tareas];
        tareasActualizadas[index].text = textoEditado; 
        setTareas(tareasActualizadas);
      }
      setEditandoIndex(null); 
    } else {
      setEditandoIndex(index);
      setTextoEditado(tareas[index].text); 
    }
  }

  function toggleTaskCompletion(index) {
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].completada = !tareasActualizadas[index].completada; 
    setTareas(tareasActualizadas);
  }

  function togglemostrarTodas() {
    setMostrarTodas((prev) => !prev); 
  }

  const filteredTareas = mostrarTodas
    ? tareas
    : tareas.filter((tarea) => !tarea.completada);

  return (
    <div className="lista-de-tareas">
      <div id="header">
        <h1>Lista de Tareas</h1>
        <button onClick={togglemostrarTodas}
        id='mostrarTareas'>
          {mostrarTodas ? "No mostrar completadas" : "Mostrar Todas"}
        </button>
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
        {filteredTareas.map((tarea, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleTaskCompletion(index)}
            />
            {editandoIndex === index ? (
              <input
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
              />
            ) : (
              <span
                className="texto"
                style={{
                  backgroundColor: tarea.completada ? "rgb(228, 228, 228)" : "none",
                }}
              >
                {tarea.text}
              </span>
            )}
            <button
              className="boton-editar-tarea"
              onClick={() => toggleEdit(index)}
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