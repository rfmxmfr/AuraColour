export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Appointments</h3>
          <p className="text-3xl font-bold text-green-600">56</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Color Analyses</h3>
          <p className="text-3xl font-bold text-purple-600">789</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span>New user registration</span>
            <span className="text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span>Color analysis completed</span>
            <span className="text-gray-500">4 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Appointment booked</span>
            <span className="text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}