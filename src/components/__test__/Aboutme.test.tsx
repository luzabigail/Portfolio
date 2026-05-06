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
// import { render, screen, fireEvent, act } from "@testing-library/react";
// import AboutMe from "../AboutmeLayerPrueba";
// import { useRouter } from "next/navigation";
// import { useTheme } from "@/components/theme-provider";

// jest.mock("next/image", () => ({
//   __esModule: true,
//   default: ({ fill, priority, sizes, ...props }: any) => {
//     // eslint-disable-next-line @next/next/no-img-element
//     return <img {...props} />;
//   },
// }));

// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
// }));

// jest.mock("@/components/theme-provider", () => ({
//   useTheme: jest.fn(),
// }));

// jest.mock("framer-motion", () => ({
//   motion: {
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   },
// }));

// describe("AboutMe", () => {
//   const pushMock = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.useFakeTimers();

//     (useRouter as jest.Mock).mockReturnValue({
//       push: pushMock,
//     });
//   });

//   afterEach(() => {
//     jest.runOnlyPendingTimers();
//     jest.useRealTimers();
//   });

//   it("no renderiza nada si resolvedTheme no existe", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: undefined,
//     });

//     const { container } = render(<AboutMe />);

//     expect(container.firstChild).toBeNull();
//   });

//   it("renderiza el título y el texto principal", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "light",
//     });

//     render(<AboutMe />);

//     expect(
//       screen.getByRole("heading", { name: /acerca de mí/i }),
//     ).toBeInTheDocument();

//     expect(screen.getByText(/soy desarrolladora web/i)).toBeInTheDocument();
//   });

//   it("muestra imágenes de tema claro con opacity-100", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "light",
//     });

//     render(<AboutMe />);

//     expect(screen.getByAltText("Farola clara izquierda")).toHaveClass(
//       "opacity-100",
//     );

//     expect(screen.getByAltText("Farola oscura izquierda")).toHaveClass(
//       "opacity-0",
//     );

//     expect(screen.getByAltText("Daylight window")).toHaveClass("opacity-100");
//     expect(screen.getByAltText("Window Night")).toHaveClass("opacity-0");
//   });

//   it("muestra imágenes de tema oscuro con opacity-100", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "dark",
//     });

//     render(<AboutMe />);

//     expect(screen.getByAltText("Farola clara izquierda")).toHaveClass(
//       "opacity-0",
//     );

//     expect(screen.getByAltText("Farola oscura izquierda")).toHaveClass(
//       "opacity-100",
//     );

//     expect(screen.getByAltText("Daylight window")).toHaveClass("opacity-0");
//     expect(screen.getByAltText("Window Night")).toHaveClass("opacity-100");
//   });

//   it("al hacer click activa zoom y navega a /projects después de 700ms", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "light",
//     });

//     render(<AboutMe />);

//     const button = screen.getByRole("button");

//     fireEvent.click(button);

//     expect(pushMock).not.toHaveBeenCalled();

//     act(() => {
//       jest.advanceTimersByTime(700);
//     });

//     expect(pushMock).toHaveBeenCalledWith("/projects");
//   });

//   it("ignora clicks repetidos mientras está haciendo zoom", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "light",
//     });

//     render(<AboutMe />);

//     const button = screen.getByRole("button");

//     fireEvent.click(button);
//     fireEvent.click(button);

//     act(() => {
//       jest.advanceTimersByTime(700);
//     });

//     expect(pushMock).toHaveBeenCalledTimes(1);
//     expect(pushMock).toHaveBeenCalledWith("/projects");
//   });
// });
