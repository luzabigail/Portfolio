import { render, screen } from "@testing-library/react";
import HeaderImage from "../HeaderImage";
import { useTheme } from "@/components/theme-provider";

// Mock del Theme Provider
jest.mock("@/components/theme-provider", () => ({
  useTheme: jest.fn(),
}));

describe("HeaderImage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no renderiza nada si el tema no está resuelto (resolvedTheme es nulo)", () => {
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: undefined });

    const { container } = render(<HeaderImage />);

    // El contenedor debe estar vacío porque el componente retorna null
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza correctamente los textos principales", () => {
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "light" });

    render(<HeaderImage />);

    // Verificamos que el nombre y el rol estén en el documento
    expect(screen.getByText("Luz Bietti")).toBeInTheDocument();
    expect(screen.getByText("Web UI Developer")).toBeInTheDocument();
  });

  it("aplica la opacidad correcta a las imágenes cuando el tema es 'light'", () => {
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "light" });

    render(<HeaderImage />);

    // Obtenemos las imágenes por su atributo alt
    const lightImage = screen.getByAltText("Header image");
    const darkImage = screen.getByAltText("Header oscuro");

    // La imagen clara debe ser visible
    expect(lightImage).toHaveClass("opacity-100");
    // La imagen oscura debe estar oculta
    expect(darkImage).toHaveClass("opacity-0");
  });

  it("aplica la opacidad correcta a las imágenes cuando el tema es 'dark'", () => {
    (useTheme as jest.Mock).mockReturnValue({ resolvedTheme: "dark" });

    render(<HeaderImage />);

    const lightImage = screen.getByAltText("Header image");
    const darkImage = screen.getByAltText("Header oscuro");

    // La imagen clara debe estar oculta
    expect(lightImage).toHaveClass("opacity-0");
    // La imagen oscura debe ser visible
    expect(darkImage).toHaveClass("opacity-100");
  });
});

// import { render, screen } from "@testing-library/react";
// import HeaderImage from "../HeaderImage";
// import { useTheme } from "@/components/theme-provider";

// jest.mock("@/components/theme-provider", () => ({
//   useTheme: jest.fn(),
// }));

// jest.mock("next/image", () => ({
//   __esModule: true,
//   default: (props: any) => {
//     // eslint-disable-next-line @next/next/no-img-element
//     return <img {...props} />;
//   },
// }));

// describe("HeaderImage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("no renderiza nada si no hay resolvedTheme", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: undefined,
//     });

//     const { container } = render(<HeaderImage />);

//     expect(container.firstChild).toBeNull();
//   });

//   it("renderiza el título y subtítulo", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "light",
//     });

//     render(<HeaderImage />);

//     expect(
//       screen.getByRole("heading", { name: /luz bietti/i }),
//     ).toBeInTheDocument();

//     expect(screen.getByText(/web ui developer/i)).toBeInTheDocument();
//   });

//   it("usa la imagen clara cuando el tema es light", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "light",
//     });

//     render(<HeaderImage />);

//     expect(screen.getByAltText("Header image")).toHaveAttribute(
//       "src",
//       "/Header-Image.png",
//     );

//     expect(screen.getByAltText("Header image")).toHaveClass("opacity-100");
//     expect(screen.getByAltText("Header oscuro")).toHaveClass("opacity-0");
//   });

//   it("usa la imagen oscura cuando el tema es dark", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "dark",
//     });

//     render(<HeaderImage />);

//     expect(screen.getByAltText("Header image")).toHaveAttribute(
//       "src",
//       "/header-image-night-cambio.png",
//     );

//     expect(screen.getByAltText("Header image")).toHaveClass("opacity-0");
//     expect(screen.getByAltText("Header oscuro")).toHaveClass("opacity-100");
//   });

//   it("renderiza la sección sectionAboutMe", () => {
//     (useTheme as jest.Mock).mockReturnValue({
//       resolvedTheme: "light",
//     });

//     const { container } = render(<HeaderImage />);

//     expect(container.querySelector(".sectionAboutMe")).toBeInTheDocument();
//   });
// });
