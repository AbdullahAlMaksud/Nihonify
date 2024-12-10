import Home from "./components/pages/Home/Home";
import Footer from "./components/shared/footer/Footer";
import Navbar from "./components/shared/navbar/Navbar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div>
      <h1 className="text-green-600 font-bold text-xl">Tailwind is Working!</h1>
      <Button>I'm a button</Button>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
