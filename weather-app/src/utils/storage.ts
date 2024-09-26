export const saveToLocalStorage = <T>(key: string, value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error guardando en localStorage', error);
    }
  };
  
  export const getFromLocalStorage = <T>(key: string): T | null => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error('Error obteniendo datos de localStorage', error);
      return null;
    }
  };
  
  export const removeFromLocalStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error eliminando de localStorage', error);
    }
  };
  