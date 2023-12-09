import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function Root() {
  return (
    <div className="container-fluid" id="root-container">
      <Navigation />
      <div id="body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
