export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Style & Fashion Admin</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, Admin</span>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}