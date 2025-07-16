# AuraColour - New Packages Guide

This guide explains how to use the newly added packages in the AuraColour application.

## Installed Packages

We've added the following packages to enhance the application:

1. **@tanstack/react-query** - For efficient data fetching and caching
2. **@stripe/react-stripe-js** - For React components that integrate with Stripe
3. **@heroicons/react** - For high-quality SVG icons
4. **jotai** - For lightweight global state management
5. **react-dropzone** - For enhanced file upload functionality

## Quick Start

Visit the demo page to see all packages in action:

```
http://localhost:3000/demo
```

## Usage Guide

### React Query

React Query provides a powerful data fetching and caching layer:

```tsx
// Example: Fetching data with React Query
import { useQuery } from '@tanstack/react-query';

function ServicesComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('/api/services');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading services</div>;

  return (
    <div>
      {data.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
    </div>
  );
}
```

For mutations (POST, PUT, DELETE):

```tsx
import { useMutation } from '@tanstack/react-query';

function CreateServiceForm() {
  const mutation = useMutation({
    mutationFn: async (newService) => {
      const response = await fetch('/api/services', {
        method: 'POST',
        body: JSON.stringify(newService),
      });
      return response.json();
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ name: 'New Service', price: 9900 });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Create Service</button>
    </form>
  );
}
```

### Stripe React

For payment processing with Stripe:

```tsx
import { StripeProvider } from '@/app/providers';
import StripePaymentForm from '@/components/StripePaymentForm';

function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <StripePaymentForm 
        amount={7500} 
        serviceName="12-Season Color Analysis"
        onSuccess={(paymentId) => {
          console.log('Payment successful:', paymentId);
        }}
        onError={(error) => {
          console.error('Payment failed:', error);
        }}
      />
    </div>
  );
}
```

### Heroicons

For using SVG icons:

```tsx
import { 
  UserIcon, 
  PhotoIcon, 
  CreditCardIcon 
} from '@heroicons/react/24/outline';

function IconsDemo() {
  return (
    <div className="flex space-x-4">
      <UserIcon className="h-6 w-6 text-purple-600" />
      <PhotoIcon className="h-6 w-6 text-purple-600" />
      <CreditCardIcon className="h-6 w-6 text-purple-600" />
    </div>
  );
}
```

### Jotai

For global state management:

```tsx
// In lib/store.ts
import { atom } from 'jotai';

export const userAtom = atom({
  isAuthenticated: false,
  name: '',
  email: '',
});

// In your component
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/store';

function UserProfile() {
  const [user, setUser] = useAtom(userAtom);

  const login = () => {
    setUser({
      isAuthenticated: true,
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
  };

  return (
    <div>
      {user.isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={login}>Log in</button>
      )}
    </div>
  );
}
```

### React Dropzone

For file uploads:

```tsx
import DropzoneUpload from '@/components/DropzoneUpload';

function UploadPage() {
  return (
    <div>
      <h1>Upload Photos</h1>
      <DropzoneUpload 
        maxFiles={3}
        onUploadComplete={(urls) => {
          console.log('Uploaded files:', urls);
        }}
      />
    </div>
  );
}
```

## Integration Examples

### Complete Form with All Features

```tsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/store';
import DropzoneUpload from '@/components/DropzoneUpload';
import StripePaymentForm from '@/components/StripePaymentForm';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function CompleteForm() {
  const [step, setStep] = useState('upload');
  const [user] = useAtom(userAtom);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  
  const analysisMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/color-analysis', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });
  
  const handleUploadComplete = (urls) => {
    setUploadedUrls(urls);
    setStep('payment');
  };
  
  const handlePaymentSuccess = (paymentId) => {
    analysisMutation.mutate({
      imageUrl: uploadedUrls[0],
      userId: user.id,
      paymentId,
    });
    setStep('complete');
  };
  
  return (
    <div className="space-y-8">
      {step === 'upload' && (
        <div>
          <h2>Upload Your Photos</h2>
          <DropzoneUpload 
            maxFiles={3}
            onUploadComplete={handleUploadComplete}
          />
        </div>
      )}
      
      {step === 'payment' && (
        <div>
          <h2>Complete Payment</h2>
          <StripePaymentForm 
            amount={7500}
            serviceName="Color Analysis"
            onSuccess={handlePaymentSuccess}
          />
        </div>
      )}
      
      {step === 'complete' && (
        <div className="text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold mt-4">Analysis Complete!</h2>
          <p>Your results will be emailed to you shortly.</p>
        </div>
      )}
    </div>
  );
}
```

## Best Practices

1. **React Query**:
   - Use query keys that reflect the data being fetched
   - Implement proper error handling
   - Use the cache effectively with staleTime and cacheTime

2. **Stripe**:
   - Always handle payment on the server side
   - Use webhooks for reliable payment confirmation
   - Test thoroughly with Stripe test keys

3. **Jotai**:
   - Keep atoms focused on specific pieces of state
   - Use derived atoms for computed values
   - Consider atom persistence for important state

4. **React Dropzone**:
   - Validate file types and sizes
   - Provide clear feedback during upload
   - Handle errors gracefully

5. **Heroicons**:
   - Use consistent icon sizes
   - Apply appropriate colors via classes
   - Consider accessibility when using icons