import Home from "@/components/pages/Home/Home";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
export default AppRoutes;
