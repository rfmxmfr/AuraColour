export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          AuraColor
        </h1>
        <p className="mt-4 text-xl">
          Professional color analysis and styling services
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}