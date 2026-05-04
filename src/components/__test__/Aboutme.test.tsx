import { render, screen, fireEvent, act } from "@testing-library/react";
import AboutMe from "../AboutmeLayerPrueba";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, sizes, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/theme-provider", () => ({
  useTheme: jest.fn(),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("AboutMe", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("no renderiza nada si resolvedTheme no existe", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: undefined,
    });

    const { container } = render(<AboutMe />);

    expect(container.firstChild).toBeNull();
  });

  it("renderiza el título y el texto principal", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
    });

    render(<AboutMe />);

    expect(
      screen.getByRole("heading", { name: /acerca de mí/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/soy desarrolladora web/i)).toBeInTheDocument();
  });

  it("muestra imágenes de tema claro con opacity-100", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
    });

    render(<AboutMe />);

    expect(screen.getByAltText("Farola clara izquierda")).toHaveClass(
      "opacity-100",
    );

    expect(screen.getByAltText("Farola oscura izquierda")).toHaveClass(
      "opacity-0",
    );

    expect(screen.getByAltText("Daylight window")).toHaveClass("opacity-100");
    expect(screen.getByAltText("Window Night")).toHaveClass("opacity-0");
  });

  it("muestra imágenes de tema oscuro con opacity-100", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "dark",
    });

    render(<AboutMe />);

    expect(screen.getByAltText("Farola clara izquierda")).toHaveClass(
      "opacity-0",
    );

    expect(screen.getByAltText("Farola oscura izquierda")).toHaveClass(
      "opacity-100",
    );

    expect(screen.getByAltText("Daylight window")).toHaveClass("opacity-0");
    expect(screen.getByAltText("Window Night")).toHaveClass("opacity-100");
  });

  it("al hacer click activa zoom y navega a /projects después de 700ms", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
    });

    render(<AboutMe />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(pushMock).toHaveBeenCalledWith("/projects");
  });

  it("ignora clicks repetidos mientras está haciendo zoom", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
    });

    render(<AboutMe />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/projects");
  });
});
