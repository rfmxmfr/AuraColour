# Manual Review Guide for Security Issues

This guide provides instructions for manually reviewing and fixing files with potential security issues.

## 1. Handling eval() and new Function()

### Common Patterns and Safe Alternatives

| Unsafe Pattern | Safe Alternative |
|---------------|-----------------|
| `eval(userInput)` | Use `JSON.parse()` for JSON data |
| `eval("(" + jsonString + ")")` | Use `JSON.parse(jsonString)` |
| `new Function(userInput)()` | Use predefined functions with parameters |
| `eval("var " + name + " = " + value)` | Use object properties: `obj[name] = value` |

### Step-by-Step Review Process

1. **Identify the purpose** of the eval/Function call
   - Is it parsing JSON?
   - Is it dynamically executing code?
   - Is it accessing variables by name?

2. **Replace with appropriate alternative**
   - For JSON parsing: Use `safeJsonParse()` from `lib/security/safe-json.ts`
   - For dynamic property access: Use bracket notation `obj[propName]`
   - For template compilation: Use a template library or JSX

3. **Test thoroughly** after each replacement

### Example Fixes

```javascript
// ❌ UNSAFE: Parsing JSON with eval
const data = eval('(' + jsonString + ')');

// ✅ SAFE: Using JSON.parse
import { safeJsonParse } from '../lib/security/safe-json';
const data = safeJsonParse(jsonString);
```

```javascript
// ❌ UNSAFE: Dynamic function creation
const calculate = new Function('a', 'b', 'return a ' + op + ' b');

// ✅ SAFE: Using a switch statement
function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: throw new Error('Invalid operator');
  }
}
```

## 2. URL Parameter Validation

### Common Patterns and Safe Alternatives

| Unsafe Pattern | Safe Alternative |
|---------------|-----------------|
| `searchParams.get('id')` | `validateUrlParams(searchParams, schema)` |
| `new URLSearchParams(window.location.search)` | `sanitizeUrlParams(new URLSearchParams(...))` |
| `router.query.id` | Validate with Zod schema |

### Step-by-Step Review Process

1. **Identify all URL parameters** being used
   - Query parameters from `useSearchParams()`
   - Route parameters from `useParams()`
   - URL fragments or search strings

2. **Define validation schemas** for each parameter
   - Use Zod to define expected types and formats
   - Add constraints (min/max length, patterns, etc.)

3. **Apply validation** before using parameters
   - Use `validateUrlParams()` from `lib/security/url-sanitizer.ts`
   - Handle validation failures gracefully

4. **Sanitize output** when displaying parameters
   - Never insert parameters directly into HTML
   - Use React's automatic escaping in JSX

### Example Fixes

```javascript
// ❌ UNSAFE: Direct parameter usage
const searchParams = useSearchParams();
const id = searchParams.get('id');
const name = searchParams.get('name');

// ✅ SAFE: Validated parameters
import { z } from 'zod';
import { useSanitizedSearchParams, validateUrlParams } from '../lib/security/url-sanitizer';

const searchParamsSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
});

const rawParams = useSearchParams();
const sanitizedParams = useSanitizedSearchParams(rawParams);
const { data, errors } = validateUrlParams(sanitizedParams, searchParamsSchema);

if (data) {
  // Safe to use data.id and data.name
} else {
  // Handle invalid parameters
}
```

## Using the Manual Review Helper Script

The `fix-manual-review.sh` script helps you review and fix files with potential security issues:

```bash
./fix-manual-review.sh
```

This script:
1. Processes files listed in `eval-function-report.txt` and `url-params-report.txt`
2. Creates safer alternatives in the `manual-fixes` directory
3. Adds comments explaining the changes

After running the script:
1. Review each file in the `manual-fixes` directory
2. Test the changes to ensure functionality is preserved
3. Copy the fixed files back to their original locations

## Final Checklist

- [ ] All `eval()` calls replaced with safe alternatives
- [ ] All `new Function()` calls replaced with safe alternatives
- [ ] All URL parameters validated before use
- [ ] All user input sanitized before output
- [ ] Tests pass after all changes
- [ ] Application functionality preserved