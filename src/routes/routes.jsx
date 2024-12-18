import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import { Navigate, Route, Routes } from "react-router";

const DashboardManager = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return user.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardManager />} />
    </Routes>
  );
};
export default AppRoutes;
