import Logo from "@/components/shared/logo/Logo";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import authService from "@/services/authService";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      setPhoto(acceptedFiles[0]);
      setPhotoPreview(URL.createObjectURL(acceptedFiles[0]));
      setValue("photo", acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
  });

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let photoUrl = null;

      if (photo) {
        const formData = new FormData();
        formData.append("image", photo);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        photoUrl = result.data.url;
      }

      const response = await authService.register({
        username: data.name,
        email: data.email,
        photo: photoUrl, // Now sending the string URL
        password: data.password,
        role: "user",
      });

      authService.setAuthToken(response.token);
      login(response.token, response.user);

      toast({
        title: "Success",
        description: "Registration successful!",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setUploading(false);
    }
  };

  const password = watch("password");

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
          Create a New Account!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Photo
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-2 text-center flex gap-2 justify-center items-center ${
                isDragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Uploaded preview"
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <input {...getInputProps()} />
              {photo ? (
                <p className="text-sm text-gray-700 flex-1 overflow-hidden hover:cursor-pointer">
                  Selected File: {photo.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500 hover:cursor-pointer">
                  Drag & drop a photo here, or click to select
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must be at least 6 characters and contain letters and numbers",
                },
              })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type={seePassword ? "text" : "password"}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type={seePassword ? "text" : "password"}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Show Password Checkbox */}
          <div className="flex items-center mt-2">
            <Checkbox
              className="mr-2"
              checked={seePassword}
              onCheckedChange={(checked) => setSeePassword(checked)}
            />
            <label htmlFor="showPassword" className="text-xs text-gray-600">
              Show Password
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={uploading}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              {uploading ? "Uploading..." : "Register"}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/6 border-b dark:border-gray-600 md:w-1/3" />
          <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-2">
            Already have an account?
            <Link
              to="/login"
              className="text-xs text-gray-500 uppercase underline dark:text-gray-400 hover:underline"
            >
              Login
            </Link>
          </div>
          <span className="w-1/6 border-b dark:border-gray-600 md:w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default Register;
