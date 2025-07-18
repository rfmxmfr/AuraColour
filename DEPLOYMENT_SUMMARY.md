# AuraColour Deployment Options

This document provides a summary of the available deployment options for the AuraColour application.

## Quick Start Commands

### Option 1: Standard Local Deployment
```bash
# Setup
./setup-local.sh

# Start
./start-local.sh
```

### Option 2: Docker Deployment
```bash
# Setup and start
./start-docker.sh
```

### Testing Setup
```bash
node test-setup.js
```

## Deployment Options Comparison

| Feature | Standard Deployment | Docker Deployment |
|---------|---------------------|-------------------|
| **Ease of setup** | Simple script | Requires Docker |
| **Isolation** | Shared environment | Containerized |
| **Performance** | Native speed | Slight overhead |
| **Dependencies** | Installed on host | Contained in Docker |
| **Portability** | Environment-dependent | Consistent across systems |

## Access URLs

- **Frontend**: http://localhost:3000
- **Supabase Studio**: http://localhost:54323
- **API Endpoint**: http://localhost:3000/api/

## Required Services

1. **Supabase** - Database and authentication
2. **Next.js** - Frontend and API
3. **Stripe** - Payment processing
4. **OpenAI** - AI color analysis
5. **Resend** - Email notifications

## Environment Setup

Ensure your `.env.local` file is properly configured with all required API keys and service URLs.

## Additional Resources

- [Local Development Guide](./LOCAL_DEVELOPMENT.md) - Detailed guide for local development
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Comprehensive deployment instructions
- [README](./README.md) - Project overview and features