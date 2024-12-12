import Logo from "@/components/shared/logo/Logo";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router";
// import { Link } from "react-router-dom";

const Register = () => {
  const [passwordSee, setPasswordSee] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      setPhoto(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (photo) formData.append("photo", photo);

    // Log form data to console
    console.log("Form data:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

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

        <hr className="mt-6 border-b-1 border-gray-300 dark:border-gray-700" />

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Name
            </label>
            <input
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
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

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Email Address
            </label>
            <input
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Password
            </label>
            <input
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type={passwordSee ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-xs flex items-center gap-2 mt-2">
              <Checkbox onClick={() => setPasswordSee(!passwordSee)} />
              See Password
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Register
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
