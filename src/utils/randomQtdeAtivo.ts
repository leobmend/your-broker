const MAX = 150;

const randomQtdeAtivo = (): number => (
  Math.floor(Math.random() * MAX + 1)
);

export default randomQtdeAtivo;
