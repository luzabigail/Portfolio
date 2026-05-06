import { render, screen } from "@testing-library/react";
import Knowledge from "../KnowledgeLayer";

// Mock de IntersectionObserver necesario para el 'whileInView' de Framer Motion
beforeAll(() => {
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

describe("Knowledge Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el título principal 'Tecnologías'", () => {
    render(<Knowledge />);

    const titulo = screen.getByRole("heading", {
      name: /tecnologías/i,
      level: 1,
    });
    expect(titulo).toBeInTheDocument();
  });

  it("renderiza la imagen principal de la estantería", () => {
    render(<Knowledge />);

    // Buscamos la estantería por su atributo 'alt'
    const estanteria = screen.getByAltText("Estantería");

    expect(estanteria).toBeInTheDocument();
    // Podemos verificar que sea un elemento <img>
    expect(estanteria.tagName.toLowerCase()).toBe("img");
  });

  it("renderiza exactamente 9 imágenes de libros", () => {
    render(<Knowledge />);

    // Como todos los libros tienen el mismo alt ("Libro"), usamos getAllByAltText
    // Esto devolverá un array con todos los nodos que coincidan
    const libros = screen.getAllByAltText("Libro");

    // Verificamos que coincida con la longitud de tu array `books`
    expect(libros).toHaveLength(9);
  });
});
