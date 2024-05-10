import React from 'react';

interface EstadoFormData {
  titulo: string;
}

interface EstadoCardProps {
  onSubmit: (data: EstadoFormData) => void;
}

const EstadoCard: React.FC<EstadoCardProps> = ({ onSubmit }) => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const estadoData: EstadoFormData = {
      titulo: formData.get('titulo') as string,
    };
    onSubmit(estadoData);
  };

  return (
    <div>
      <h2>Crear Nuevo Estado</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" />
        <br></br>
        <button type="submit">Crear Estado</button>
      </form>
    </div>
  );
};

export default EstadoCard;
