# is-host-local

A lightweight utility to check if a hostname resolves to a local IP address.

## Installation

```bash
npm install is-host-local
```

## Usage

### TypeScript
```typescript
import isHostLocal from 'is-host-local';

async function checkHost() {
  const result = await isHostLocal('localhost');
  console.log(result); // true
  
  const result2 = await isHostLocal('google.com');
  console.log(result2); // false
}
```

### JavaScript
```javascript
const isHostLocal = require('is-host-local').default;

async function checkHost() {
  const result = await isHostLocal('localhost');
  console.log(result); // true
  
  const result2 = await isHostLocal('google.com');
  console.log(result2); // false
}
```

## Return Values

- `true`: The hostname resolves to a local IP address (127.0.0.1 or private IP ranges)
- `false`: The hostname resolves to a public IP address
- `null`: An error occurred while checking the hostname

## License

MIT
