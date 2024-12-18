import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import authService from '@/services/authService';
import Logo from "@/components/shared/logo/Logo";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, Navigate } from "react-router";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passwordSee, setPasswordSee] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data.email, data.password);
      authService.setAuthToken(response.token);
      login(response.token, response.user);

      toast({
        title: "Success",
        description: response.message || "Login Successfully",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Login failed",
      });
    }
  };

  if (user) return <Navigate to={"/"}></Navigate>;
  if (!user)
    return (
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80")',
          }}
        />
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <Logo />
          </div>
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                type="email"
                id="email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                type={passwordSee ? "text" : "password"}
                id="password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
              <div className="text-xs flex items-center gap-2 mt-2">
                <Checkbox
                  checked={passwordSee}
                  onCheckedChange={(checked) => setPasswordSee(checked)}
                />
                See Password
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600 md:w-1/3" />
            <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-2">
              New Here?
              <Link
                to="/register"
                className="text-xs text-gray-500 uppercase underline dark:text-gray-400 hover:underline"
              >
                Register
              </Link>
            </div>
            <span className="w-1/6 border-b dark:border-gray-600 md:w-1/3" />
          </div>
        </div>
      </div>
    );
};

export default Login;