import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import FloatingMenu from "../FloatingMenu";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("../theme-toggle", () => ({
  __esModule: true,
  default: () => <button>Theme Toggle</button>,
}));

jest.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock("lucide-react", () => ({
  Menu: () => <span data-testid="menu-icon">Menu</span>,
  X: () => <span data-testid="x-icon">X</span>,
}));

describe("FloatingMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    });

    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it("pasa a modo compacto al hacer scroll mayor a 60", async () => {
    render(<FloatingMenu />);

    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 100,
      });

      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /abrir menú/i }),
      ).toBeInTheDocument();
    });
  });

  it("muestra botón de menú en mobile", () => {
    window.innerWidth = 500;

    render(<FloatingMenu />);

    window.dispatchEvent(new Event("resize"));

    expect(
      screen.getByRole("button", { name: /abrir menú/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });

  it("abre el menú mobile al hacer click", () => {
    window.innerWidth = 500;

    render(<FloatingMenu />);

    window.dispatchEvent(new Event("resize"));

    const button = screen.getByRole("button", { name: /abrir menú/i });

    fireEvent.click(button);

    expect(screen.getByTestId("x-icon")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Proyectos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contacto" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Tecnologías" }),
    ).toBeInTheDocument();
  });

  it("cierra el menú mobile al hacer click en un link", () => {
    window.innerWidth = 500;

    render(<FloatingMenu />);

    window.dispatchEvent(new Event("resize"));

    fireEvent.click(screen.getByRole("button", { name: /abrir menú/i }));

    fireEvent.click(screen.getByRole("link", { name: "Contacto" }));

    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });

  it("pasa a modo compacto al hacer scroll mayor a 60", () => {
    render(<FloatingMenu />);

    window.scrollY = 100;
    window.dispatchEvent(new Event("scroll"));

    expect(
      screen.getByRole("button", { name: /abrir menú/i }),
    ).toBeInTheDocument();
  });
});
