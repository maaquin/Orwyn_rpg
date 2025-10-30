import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  // Inicializa el estado con el tamaño de la ventana actual, si está disponible
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Función que se llamará al cambiar el tamaño de la ventana
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Agregar el listener del evento 'resize'
    window.addEventListener('resize', handleResize);

    // Llamar la función una vez al inicio para establecer el tamaño inicial
    handleResize();

    // Limpiar el listener al desmontar el componente para evitar fugas de memoria
    return () => window.removeEventListener('resize', handleResize);
  }, []); // El array vacío asegura que el efecto solo se ejecute al montar y desmontar

  return windowSize;
};