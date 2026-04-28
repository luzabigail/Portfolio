import AboutMe from "@/components/AboutmeLayerPrueba";
import Headerimage from "@/components/HeaderImage";
import FooterLayout from "@/components/Footer";
import FloatingMenu from "@/components/FloatingMenu";
import ContactLayer from "./contact/page";
import Knowledge from "@/components/KnowledgeLayer";

export default function Home() {
  return (
    <>
      <FloatingMenu></FloatingMenu>
      <Headerimage></Headerimage>
      <AboutMe></AboutMe>
      <Knowledge></Knowledge>
      <ContactLayer></ContactLayer>
      <FooterLayout></FooterLayout>
    </>
  );
}
