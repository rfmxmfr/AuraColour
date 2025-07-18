# Security Usage Guide

This guide explains how to use the security utilities to prevent XSS vulnerabilities in the AuraColour application.

## Dangerous JavaScript Patterns to Avoid

The following patterns can lead to XSS vulnerabilities:

1. **dangerouslySetInnerHTML** - Direct HTML insertion
2. **innerHTML/outerHTML** - DOM manipulation
3. **document.write** - Direct document writing
4. **eval() or new Function()** - Code execution
5. **URL parameters without validation** - Untrusted input

## Safe Alternatives

### 1. Instead of dangerouslySetInnerHTML

```jsx
// ❌ UNSAFE
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ SAFE
import { SafeHtml } from '../hooks/use-safe-html';

<SafeHtml html={userContent} />
```

### 2. Instead of innerHTML/outerHTML

```javascript
// ❌ UNSAFE
element.innerHTML = userContent;

// ✅ SAFE
import sanitizeHtml from 'sanitize-html';

element.innerHTML = sanitizeHtml(userContent);
```

### 3. Instead of document.write

```javascript
// ❌ UNSAFE
document.write(userContent);

// ✅ SAFE
import sanitizeHtml from 'sanitize-html';

document.body.insertAdjacentHTML('beforeend', sanitizeHtml(userContent));
```

### 4. Instead of eval() or new Function()

```javascript
// ❌ UNSAFE
eval(userContent);
new Function(userContent)();

// ✅ SAFE
// There is no safe way to use eval with user input
// Refactor to use proper data structures and functions
```

### 5. Safe URL Parameter Handling

```typescript
// ❌ UNSAFE
const searchParams = useSearchParams();
const id = searchParams.get('id');

// ✅ SAFE
import { useSanitizedSearchParams, validateUrlParams } from '../lib/security/url-sanitizer';
import { z } from 'zod';

const schema = z.object({
  id: z.string().uuid(),
});

const searchParams = useSanitizedSearchParams(useSearchParams());
const { data, errors } = validateUrlParams(searchParams, schema);

if (data) {
  // Safe to use data.id
}
```

## Using the SafeHtml Component

The `SafeHtml` component safely renders HTML content:

```jsx
import { SafeHtml } from '../hooks/use-safe-html';

function UserContent({ content }) {
  return (
    <SafeHtml 
      html={content} 
      className="user-content"
      tag="article"
    />
  );
}
```

## Form Input Validation

Use the sanitized Zod schemas for form validation:

```typescript
import { sanitizedString, sanitizedEmail } from '../lib/security/input-validation';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: sanitizedString().min(2),
  email: sanitizedEmail(),
  message: sanitizedString().min(10),
});
```

## API Response Sanitization

Sanitize API responses before using them:

```typescript
import { sanitizeObject } from '../lib/security/xss-protection';

async function fetchUserData() {
  const response = await fetch('/api/user');
  const data = await response.json();
  
  // Sanitize the entire response object
  const safeData = sanitizeObject(data);
  
  return safeData;
}
```

## Running the Security Scripts

1. Fix dangerous JavaScript patterns:
   ```bash
   ./fix-dangerous-patterns.sh
   ```

2. Fix XSS vulnerabilities:
   ```bash
   ./fix-xss.sh
   ```

3. Fix ESLint formatting issues:
   ```bash
   ./fix-eslint-formatting.sh
   ```

## Security Best Practices

1. **Never trust user input** - Always validate and sanitize
2. **Use JSX** - React automatically escapes values in JSX
3. **Avoid raw HTML** - Use components and props instead
4. **Validate URLs** - Especially for links and redirects
5. **Keep dependencies updated** - Run `npm audit` regularly