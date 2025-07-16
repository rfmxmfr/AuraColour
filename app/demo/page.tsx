"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { userAtom, colorAnalysisAtom } from "@/lib/store";
import DropzoneUpload from "@/components/DropzoneUpload";
import StripePaymentForm from "@/components/StripePaymentForm";
import { StripeProvider } from "@/app/providers";
import { 
  UserIcon, 
  PhotoIcon, 
  SwatchIcon, 
  CreditCardIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("dropzone");
  const [user, setUser] = useAtom(userAtom);
  const [analysis, setAnalysis] = useAtom(colorAnalysisAtom);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Example React Query hook
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      // This would normally fetch from your API
      return [
        { id: 1, name: "12-Season Color Analysis", price: 7500 },
        { id: 2, name: "Virtual Wardrobe Curation", price: 10000 },
        { id: 3, name: "Personal Shopping Service", price: 15000 },
      ];
    },
  });

  const handleLogin = () => {
    setUser({
      id: "demo-user",
      name,
      email,
      isAuthenticated: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          AuraColour Package Demo
        </h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center ${
                activeTab === "dropzone" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("dropzone")}
            >
              <PhotoIcon className="h-5 w-5 mr-2" />
              Dropzone Upload
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center ${
                activeTab === "stripe" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("stripe")}
            >
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Stripe Payment
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center ${
                activeTab === "jotai" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("jotai")}
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Jotai State
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center ${
                activeTab === "query" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("query")}
            >
              <SwatchIcon className="h-5 w-5 mr-2" />
              React Query
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === "dropzone" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
                <p className="text-gray-600 mb-4">
                  Enhanced file upload with react-dropzone
                </p>
                <DropzoneUpload maxFiles={3} />
              </div>
            )}
            
            {activeTab === "stripe" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Form</h2>
                <p className="text-gray-600 mb-4">
                  Stripe integration with @stripe/react-stripe-js
                </p>
                <StripePaymentForm 
                  amount={7500} 
                  serviceName="12-Season Color Analysis"
                  onSuccess={(id) => alert(`Payment successful! ID: ${id}`)}
                  onError={(error) => console.error(error)}
                />
              </div>
            )}
            
            {activeTab === "jotai" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Global State</h2>
                <p className="text-gray-600 mb-4">
                  State management with jotai
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">User State</h3>
                    {user.isAuthenticated ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span>Logged in as {user.name} ({user.email})</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <button
                          onClick={handleLogin}
                          className="px-4 py-2 bg-purple-600 text-white rounded"
                        >
                          Login
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Color Analysis State</h3>
                    {analysis ? (
                      <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                        {JSON.stringify(analysis, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-gray-500">No analysis results yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "query" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Data Fetching</h2>
                <p className="text-gray-600 mb-4">
                  Efficient data fetching with @tanstack/react-query
                </p>
                
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services?.map((service) => (
                      <div key={service.id} className="p-4 border rounded-md flex justify-between items-center">
                        <span className="font-medium">{service.name}</span>
                        <span className="text-purple-600 font-semibold">
                          £{(service.price / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}