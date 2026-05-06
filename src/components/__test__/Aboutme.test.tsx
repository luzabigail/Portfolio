import { render, screen, fireEvent } from "@testing-library/react";
import AboutMe from "../AboutmeLayerPrueba"; // Ajusta la ruta de importación según tu estructura
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

// 1. Mock de useRouter de Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// 2. Mock del Theme Provider
jest.mock("@/components/theme-provider", () => ({
  useTheme: jest.fn(),
}));

// 3. Mock de IntersectionObserver (necesario para el 'whileInView' de Framer Motion en Jest)
beforeAll(() => {
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

describe("AboutMe Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    jest.clearAllMocks();

    // Configuramos el router simulado
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("no renderiza nada si el tema no está resuelto (resolvedTheme es nulo)", () => {
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: undefined });

    const { container } = render(<AboutMe />);

    // El contenedor debe estar vacío porque el componente retorna null
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza correctamente cuando el tema está resuelto", () => {
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "light" });

    render(<AboutMe />);

    // Verificamos que el título principal esté en el documento
    expect(screen.getByText("Acerca de mí")).toBeInTheDocument();
    expect(screen.getByText(/Soy Desarrolladora Web/i)).toBeInTheDocument();
  });

  it("inicia la animación de zoom y navega a '/projects' al hacer click en el botón", () => {
    // Usamos temporizadores falsos de Jest para controlar el setTimeout de 700ms
    jest.useFakeTimers();
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "dark" });

    render(<AboutMe />);

    // Buscamos el botón (es el único elemento <button> en tu componente)
    const button = screen.getByRole("button");

    // Simulamos el click
    fireEvent.click(button);

    // Verificamos que push NO se haya llamado inmediatamente
    expect(mockPush).not.toHaveBeenCalled();

    // Avanzamos el tiempo 700 milisegundos
    jest.advanceTimersByTime(700);

    // Verificamos que ahora sí se haya llamado con la ruta correcta
    expect(mockPush).toHaveBeenCalledWith("/projects");

    // Restauramos los temporizadores reales
    jest.useRealTimers();
  });

  it("no vuelve a disparar el setTimeout si ya está haciendo zoom", () => {
    jest.useFakeTimers();
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "light" });

    render(<AboutMe />);

    const button = screen.getByRole("button");

    // Hacemos doble click rápidamente
    fireEvent.click(button);
    fireEvent.click(button);

    jest.advanceTimersByTime(700);

    // Como bloqueaste el segundo click con 'if (isZooming) return;',
    // la función push solo debería haberse llamado 1 vez.
    expect(mockPush).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
