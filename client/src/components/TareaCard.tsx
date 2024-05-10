import React from 'react';

interface TareaFormData {
  titulo: string;
  prioridad: string;
}

interface TareaCardProps {
  onSubmit: (data: TareaFormData) => void;
}

const TareaCard: React.FC<TareaCardProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tareaData: TareaFormData = {
      titulo: formData.get('titulo') as string,
      prioridad: formData.get('prioridad') as string,
    };
    onSubmit(tareaData);
  };

  return (
    <div>
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" />
        <br></br>
        <label>Seleccione la prioridad</label>
        <select name="prioridad">
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <br></br>
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
};

export default TareaCard;
