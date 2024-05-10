import React, { useEffect, useState } from 'react';
import './styles/App.css';
import EstadoCard from './components/EstadoCard';
import TareaCard from './components/TareaCard';

type Estado = {
  id: string;
  titulo: string;
};

type Tarea = {
  id: string;
  titulo: string;
  prioridad: string;
  id_estado: string;
};

const App = () => {

  //Estados
  const [estados, setEstados] = useState<Estado[]>([]);
  const [tareasPorEstado, setTareasPorEstado] = useState<{ [key: string]: Tarea[] }>({});
  const [showEstadoForm, setShowEstadoForm] = useState(false);
  const [showTareaForm, setShowTareaForm] = useState(false);
  const [currentEstadoId, setCurrentEstadoId] = useState<string | null>(null);

  //Fetch de estados
  const fetchEstados = async () => {
    const response = await fetch('http://localhost:3000/estados');
    const data = await response.json();
    setEstados(data);
  };

  //Fetch de tareas
  const fetchTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    const tareasPorEstadoTemp: { [key: string]: Tarea[] } = {};

    data.forEach((tarea: Tarea) => {
      if (!tareasPorEstadoTemp[tarea.id_estado]) {
        tareasPorEstadoTemp[tarea.id_estado] = [];
      }
      tareasPorEstadoTemp[tarea.id_estado].push(tarea);
    });

    setTareasPorEstado(tareasPorEstadoTemp);
  };

  //Enviar datos de estado
  const handleEstadoSubmit = async (estadoData: any) => {
    const response = await fetch('http://localhost:3000/estados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadoData),
    });
    const newEstado = await response.json();
    setEstados([...estados, newEstado]);
    setShowEstadoForm(false);
  };

  //Enviar datos de tarea
  const handleTareaSubmit = async (tareaData: any) => {
    tareaData.id_estado = currentEstadoId;
    const response = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tareaData),
    });
    const newTarea = await response.json();
    const newTareasPorEstado = { ...tareasPorEstado };
    if (!newTareasPorEstado[newTarea.id_estado]) {
      newTareasPorEstado[newTarea.id_estado] = [];
    }
    newTareasPorEstado[newTarea.id_estado].push(newTarea);
    setTareasPorEstado(newTareasPorEstado);
    setShowTareaForm(false);
  };

  useEffect(() => {
    fetchEstados();
    fetchTareas();
  }, []);

  return (
    <div>
      <h1>Tablero Kanban</h1>
      <h2 className='subtitulo'>Dani López</h2>
      <div style={{ display: 'flex', alignItems: 'center', }}>
        <table border={1}>
          <thead>
            <tr>
              {estados.map((estado) => (
                <th key={estado.id}>{estado.titulo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {estados.map((estado) => (
                <td key={estado.id}>
                  {tareasPorEstado[estado.id]?.map((tarea) => (
                    <div key={tarea.id}>{tarea.titulo}</div>
                  ))}
                  <button
                    key={estado.id}
                    onClick={() => {
                      setCurrentEstadoId(estado.id);
                      setShowTareaForm(true);
                    }}
                  >
                    Añadir Tarea
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <button className="btnAnadirEstado" onClick={() => setShowEstadoForm(true)}>Añadir Estado</button>
      </div>
      {showEstadoForm && <EstadoCard onSubmit={handleEstadoSubmit} />}
      {showTareaForm && <TareaCard onSubmit={handleTareaSubmit} />}
    </div>
  );

};

export default App;
