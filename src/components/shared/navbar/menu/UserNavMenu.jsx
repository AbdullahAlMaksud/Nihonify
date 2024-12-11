import { NavLink } from "react-router";

const UserNavMenu = ({ isMobile }) => {
  return (
    <ul className={isMobile ? "flex flex-col gap-4" : "flex"}>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "border px-4 py-1.5 shadow-inner rounded-sm border-primary"
              : "px-4 py-1.5 rounded-sm border border-transparent hover:border-gray-400 duration-500 ease-in-out"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/lessons"}
          className={({ isActive }) =>
            isActive
              ? "border px-4 py-1.5 shadow-inner rounded-sm border-primary"
              : "px-4 py-1.5 rounded-sm border border-transparent hover:border-gray-400 duration-500 ease-in-out"
          }
        >
          Lessons
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/tutorials"}
          className={({ isActive }) =>
            isActive
              ? "border px-4 py-1.5 shadow-inner rounded-sm border-primary"
              : "px-4 py-1.5 rounded-sm border border-transparent hover:border-gray-400 duration-500 ease-in-out"
          }
        >
          Tutorial
        </NavLink>
      </li>
    </ul>
  );
};

export default UserNavMenu;
