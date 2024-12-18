import Footer from "./components/shared/footer/Footer";
import Navbar from "./components/shared/navbar/Navbar";
import AppRoutes from "./routes/routes";

import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <div className="min-h-[calc(100vh-216px)] md:min-h-[calc(100vh-144px)]">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
