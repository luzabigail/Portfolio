import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import FloatingMenu from "../FloatingMenu";

jest.mock("../theme-toggle", () => {
  return function MockThemeToggle() {
    return <button data-testid="theme-toggle">Theme</button>;
  };
});

jest.mock("framer-motion", () => {
  // 1. Usamos Record<string, unknown> en lugar de 'any' para satisfacer a TypeScript
  const cleanProps = (props: Record<string, unknown>) => {
    const copy = { ...props };
    // 2. En lugar de extraer las variables y dejarlas sin usar (unused-vars),
    // simplemente las borramos del objeto copiado.
    delete copy.initial;
    delete copy.animate;
    delete copy.exit;
    delete copy.transition;
    return copy;
  };

  // 3. Quitamos el 'require' de React y el 'forwardRef' (tu componente no usa refs en el menú).
  // 4. Usamos funciones con nombre (ej: "function MockHeader") para arreglar el error "display-name".
  type MotionProps = { children?: React.ReactNode; [key: string]: unknown };

  return {
    motion: {
      header: function MockHeader({ children, ...props }: MotionProps) {
        return <header {...cleanProps(props)}>{children}</header>;
      },
      nav: function MockNav({ children, ...props }: MotionProps) {
        return <nav {...cleanProps(props)}>{children}</nav>;
      },
      div: function MockDiv({ children, ...props }: MotionProps) {
        return <div {...cleanProps(props)}>{children}</div>;
      },
    },
    AnimatePresence: function MockAnimatePresence({
      children,
    }: {
      children?: React.ReactNode;
    }) {
      return <>{children}</>;
    },
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
