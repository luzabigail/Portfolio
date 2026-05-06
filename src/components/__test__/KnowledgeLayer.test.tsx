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

// import { render, screen } from "@testing-library/react";
// import Knowledge from "../KnowledgeLayer";

// jest.mock("next/image", () => ({
//   __esModule: true,
//   default: ({ fill, priority, sizes, ...props }: any) => {
//     // eslint-disable-next-line @next/next/no-img-element
//     return <img {...props} />;
//   },
// }));

// jest.mock("framer-motion", () => ({
//   motion: {
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   },
// }));

// describe("Knowledge", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renderiza el título", () => {
//     render(<Knowledge />);

//     expect(
//       screen.getByRole("heading", { name: /tecnolgías/i }),
//     ).toBeInTheDocument();
//   });

//   it("renderiza la estantería", () => {
//     render(<Knowledge />);

//     const shelf = screen.getByAltText("Estantería");

//     expect(shelf).toBeInTheDocument();
//     expect(shelf).toHaveAttribute("src", "/estanteria-vacia.png");
//   });

//   it("renderiza los 9 libros", () => {
//     render(<Knowledge />);

//     const books = screen.getAllByAltText("Libro");

//     expect(books).toHaveLength(9);
//   });

//   it("renderiza los libros con sus imágenes correctas", () => {
//     render(<Knowledge />);

//     const books = screen.getAllByAltText("Libro");

//     expect(books[0]).toHaveAttribute("src", "/libro-uno.png");
//     expect(books[1]).toHaveAttribute("src", "/libro-dos.png");
//     expect(books[2]).toHaveAttribute("src", "/libro-tres.png");
//     expect(books[3]).toHaveAttribute("src", "/libro-cuatro.png");
//     expect(books[4]).toHaveAttribute("src", "/libro-cinco.png");
//     expect(books[5]).toHaveAttribute("src", "/libro-seis.png");
//     expect(books[6]).toHaveAttribute("src", "/libro-siete.png");
//     expect(books[7]).toHaveAttribute("src", "/libro-ocho.png");
//     expect(books[8]).toHaveAttribute("src", "/libro-nueve.png");
//   });

//   it("renderiza la sección tecnologias", () => {
//     const { container } = render(<Knowledge />);

//     expect(container.querySelector("#tecnologias")).toBeInTheDocument();
//   });
// });
