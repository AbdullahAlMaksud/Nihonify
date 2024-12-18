import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <img 
            src={user.photo} 
            alt={user.username} 
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="text-gray-600">Admin: {user.username}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        </div>
        {/* Add admin-specific features here */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Admin Controls</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-3 bg-blue-500 text-white rounded">Manage Users</button>
            <button className="p-3 bg-green-500 text-white rounded">View Analytics</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
