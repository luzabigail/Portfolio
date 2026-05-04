import { render, screen } from "@testing-library/react";
import HeaderImage from "../HeaderImage";
import { useTheme } from "@/components/theme-provider";

jest.mock("@/components/theme-provider", () => ({
  useTheme: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("HeaderImage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no renderiza nada si no hay resolvedTheme", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: undefined,
    });

    const { container } = render(<HeaderImage />);

    expect(container.firstChild).toBeNull();
  });

  it("renderiza el título y subtítulo", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
    });

    render(<HeaderImage />);

    expect(
      screen.getByRole("heading", { name: /luz bietti/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/web ui developer/i)).toBeInTheDocument();
  });

  it("usa la imagen clara cuando el tema es light", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
    });

    render(<HeaderImage />);

    expect(screen.getByAltText("Header image")).toHaveAttribute(
      "src",
      "/Header-Image.png",
    );

    expect(screen.getByAltText("Header image")).toHaveClass("opacity-100");
    expect(screen.getByAltText("Header oscuro")).toHaveClass("opacity-0");
  });

  it("usa la imagen oscura cuando el tema es dark", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "dark",
    });

    render(<HeaderImage />);

    expect(screen.getByAltText("Header image")).toHaveAttribute(
      "src",
      "/header-image-night-cambio.png",
    );

    expect(screen.getByAltText("Header image")).toHaveClass("opacity-0");
    expect(screen.getByAltText("Header oscuro")).toHaveClass("opacity-100");
  });

  it("renderiza la sección sectionAboutMe", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
    });

    const { container } = render(<HeaderImage />);

    expect(container.querySelector(".sectionAboutMe")).toBeInTheDocument();
  });
});
