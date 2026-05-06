// 1. Añade 'act' al import de testing-library
import { render, screen, fireEvent, act } from "@testing-library/react";
import FloatingMenu from "../FloatingMenu";

jest.mock("../theme-toggle", () => {
  return function MockThemeToggle() {
    return <button data-testid="theme-toggle">Theme</button>;
  };
});

jest.mock("framer-motion", () => {
  const React = require("react");

  // Función de ayuda para evitar pasar props de framer-motion al DOM
  const cleanProps = (props: any) => {
    const { initial, animate, exit, transition, ...validDOMProps } = props;
    return validDOMProps;
  };

  return {
    motion: {
      header: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <header ref={ref} {...cleanProps(props)}>
          {children}
        </header>
      )),
      nav: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <nav ref={ref} {...cleanProps(props)}>
          {children}
        </nav>
      )),
      div: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <div ref={ref} {...cleanProps(props)}>
          {children}
        </div>
      )),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe("FloatingMenu Component", () => {
  // 2. Envuelve el código de resizeWindow en act()
  const resizeWindow = (width: number) => {
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: width,
      });
      window.dispatchEvent(new Event("resize"));
    });
  };

  // 3. Envuelve el código de scrollWindow en act()
  const scrollWindow = (scrollY: number) => {
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: scrollY,
      });
      window.dispatchEvent(new Event("scroll"));
    });
  };

  beforeEach(() => {
    resizeWindow(1200);
    scrollWindow(0);
    jest.clearAllMocks();
  });

  it("renderiza el menú completo en pantallas grandes sin scroll", () => {
    render(<FloatingMenu />);

    // Verificamos que los enlaces principales estén visibles directamente
    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Tecnologías")).toBeInTheDocument();

    // El botón del menú hamburguesa no debe estar
    expect(screen.queryByLabelText("Abrir menú")).not.toBeInTheDocument();
  });

  it("cambia al menú compacto al hacer scroll (más de 60px)", () => {
    render(<FloatingMenu />);

    // Hacemos scroll hacia abajo
    scrollWindow(100);

    // Los textos directos ya no deberían estar visibles (se ocultó el nav completo)
    expect(screen.queryByText("Proyectos")).not.toBeInTheDocument();

    // El botón del menú hamburguesa debe aparecer
    expect(screen.getByLabelText("Abrir menú")).toBeInTheDocument();
  });

  it("cambia al menú compacto en pantallas móviles (menos de 1024px)", () => {
    render(<FloatingMenu />);

    // Cambiamos el tamaño de la ventana a móvil
    resizeWindow(800);

    // Debe mostrarse el botón hamburguesa
    expect(screen.getByLabelText("Abrir menú")).toBeInTheDocument();
  });

  it("abre y cierra el menú desplegable en modo compacto al hacer click", () => {
    // Forzamos modo móvil
    resizeWindow(500);
    render(<FloatingMenu />);

    const menuButton = screen.getByLabelText("Abrir menú");

    // Inicialmente los enlaces no están visibles en el dropdown
    expect(screen.queryByText("Proyectos")).not.toBeInTheDocument();

    // Abrimos el menú
    fireEvent.click(menuButton);

    // Ahora los enlaces deben estar en el documento
    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();

    // Cerramos el menú
    fireEvent.click(menuButton);

    // Los enlaces vuelven a desaparecer
    expect(screen.queryByText("Proyectos")).not.toBeInTheDocument();
  });

  it("cierra el menú desplegable automáticamente al hacer click en un enlace", () => {
    resizeWindow(500);
    render(<FloatingMenu />);

    // Abrimos el menú
    const menuButton = screen.getByLabelText("Abrir menú");
    fireEvent.click(menuButton);

    // Hacemos click en un enlace del dropdown
    const projectLink = screen.getByText("Proyectos");
    fireEvent.click(projectLink);

    // El menú debe haberse cerrado (los enlaces ya no están)
    expect(screen.queryByText("Proyectos")).not.toBeInTheDocument();
  });
});
// import {
//   render,
//   screen,
//   fireEvent,
//   act,
//   waitFor,
// } from "@testing-library/react";
// import FloatingMenu from "../FloatingMenu";

// jest.mock("next/link", () => ({
//   __esModule: true,
//   default: ({ children, href, ...props }: any) => (
//     <a href={href} {...props}>
//       {children}
//     </a>
//   ),
// }));

// jest.mock("../theme-toggle", () => ({
//   __esModule: true,
//   default: () => <button>Theme Toggle</button>,
// }));

// jest.mock("framer-motion", () => ({
//   motion: {
//     header: ({ children, ...props }: any) => (
//       <header {...props}>{children}</header>
//     ),
//     nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   },
//   AnimatePresence: ({ children }: any) => <>{children}</>,
// }));

// jest.mock("lucide-react", () => ({
//   Menu: () => <span data-testid="menu-icon">Menu</span>,
//   X: () => <span data-testid="x-icon">X</span>,
// }));

// describe("FloatingMenu", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();

//     Object.defineProperty(window, "innerWidth", {
//       writable: true,
//       configurable: true,
//       value: 1200,
//     });

//     Object.defineProperty(window, "scrollY", {
//       writable: true,
//       configurable: true,
//       value: 0,
//     });
//   });

//   it("pasa a modo compacto al hacer scroll mayor a 60", async () => {
//     render(<FloatingMenu />);

//     act(() => {
//       Object.defineProperty(window, "scrollY", {
//         writable: true,
//         configurable: true,
//         value: 100,
//       });

//       window.dispatchEvent(new Event("scroll"));
//     });

//     await waitFor(() => {
//       expect(
//         screen.getByRole("button", { name: /abrir menú/i }),
//       ).toBeInTheDocument();
//     });
//   });

//   it("muestra botón de menú en mobile", () => {
//     window.innerWidth = 500;

//     render(<FloatingMenu />);

//     window.dispatchEvent(new Event("resize"));

//     expect(
//       screen.getByRole("button", { name: /abrir menú/i }),
//     ).toBeInTheDocument();

//     expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
//   });

//   it("abre el menú mobile al hacer click", () => {
//     window.innerWidth = 500;

//     render(<FloatingMenu />);

//     window.dispatchEvent(new Event("resize"));

//     const button = screen.getByRole("button", { name: /abrir menú/i });

//     fireEvent.click(button);

//     expect(screen.getByTestId("x-icon")).toBeInTheDocument();

//     expect(screen.getByRole("link", { name: "Proyectos" })).toBeInTheDocument();
//     expect(screen.getByRole("link", { name: "Contacto" })).toBeInTheDocument();
//     expect(
//       screen.getByRole("link", { name: "Tecnologías" }),
//     ).toBeInTheDocument();
//   });

//   it("cierra el menú mobile al hacer click en un link", () => {
//     window.innerWidth = 500;

//     render(<FloatingMenu />);

//     window.dispatchEvent(new Event("resize"));

//     fireEvent.click(screen.getByRole("button", { name: /abrir menú/i }));

//     fireEvent.click(screen.getByRole("link", { name: "Contacto" }));

//     expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
//   });

//   it("pasa a modo compacto al hacer scroll mayor a 60", () => {
//     render(<FloatingMenu />);

//     window.scrollY = 100;
//     window.dispatchEvent(new Event("scroll"));

//     expect(
//       screen.getByRole("button", { name: /abrir menú/i }),
//     ).toBeInTheDocument();
//   });
// });
