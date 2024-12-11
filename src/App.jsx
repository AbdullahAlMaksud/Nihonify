import Footer from "./components/shared/footer/Footer";
import Navbar from "./components/shared/navbar/Navbar";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-240px)]">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
