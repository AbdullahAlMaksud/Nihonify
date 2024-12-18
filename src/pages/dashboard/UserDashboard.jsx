import { useAuth } from "@/contexts/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <img
            src={user.photo}
            alt={user.username}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
