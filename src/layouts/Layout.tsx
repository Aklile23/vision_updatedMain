import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AmbientFX from "../components/AmbientFX";

export default function Layout() {
  return (
    <>
      <AmbientFX />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
