export default function AdminUsers() {
  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', colorSeason: 'Spring', joinDate: '2024-01-15' },
    { id: 2, name: 'Mike Chen', email: 'mike@example.com', colorSeason: 'Winter', joinDate: '2024-01-20' },
    { id: 3, name: 'Emma Davis', email: 'emma@example.com', colorSeason: 'Autumn', joinDate: '2024-02-01' },
    { id: 4, name: 'Alex Wilson', email: 'alex@example.com', colorSeason: 'Summer', joinDate: '2024-02-05' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color Season</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.colorSeason === 'Spring' ? 'bg-green-100 text-green-800' :
                    user.colorSeason === 'Summer' ? 'bg-blue-100 text-blue-800' :
                    user.colorSeason === 'Autumn' ? 'bg-orange-100 text-orange-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {user.colorSeason}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}