# GitVigil

Welcome to **GitVigil** – a streak management tool designed for developers to track your coding progress and keep those streaks going strong! 💻🔥

This project is built with [Next.js](https://nextjs.org/) and bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gitvigil.git
cd gitvigil
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

You'll need to create a `.env` file in the root of your project and add the following environment variables. Follow the detailed instructions below to obtain each credential correctly:

```bash
# Authentication Secrets
AUTH_SECRET="your_auth_secret_here"
AUTH_GITHUB_ID="your_github_oauth_id"
AUTH_GITHUB_SECRET="your_github_oauth_secret"
GITHUB_TOKEN="your_github_token_here"

# Database URLs (Serverless PostgreSQL)
DATABASE_URL="postgres://username:password@hostname/database?sslmode=require"
POSTGRES_PRISMA_URL="postgres://username:password@hostname/database?pgbouncer=true&connect_timeout=15&sslmode=require"
POSTGRES_URL_NON_POOLING="postgres://username:password@hostname/database?sslmode=require"

# Encryption Keys (Must be in hex format)
ENCRYPTION_KEY="32-byte-hex-key-exactly-64-characters-long"
ENCRYPTION_IV="16-byte-hex-iv-exactly-32-characters-long"

# Redis Token and URL
REDIS_TOKEN="your_redis_token"
REDIS_URL="https://your-redis-instance.upstash.io"

# Resend Token
RESEND_TOKEN="your_resend_api_key"
```

#### Authentication Secrets

1. **AUTH_SECRET**:
   - Generate a secure random string: `openssl rand -base64 32`

2. **GitHub OAuth Credentials**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App with:
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy the Client ID (`AUTH_GITHUB_ID`) and Client Secret (`AUTH_GITHUB_SECRET`)

3. **GITHUB_TOKEN**:
   - Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
   - Generate a new token with `repo` and `user` scopes

#### Database Setup (Serverless PostgreSQL)

We recommend using [Neon](https://neon.tech) for serverless PostgreSQL:

1. Create a Neon account and project
2. From your project dashboard, get the connection strings
3. Use the pooled connection for `DATABASE_URL` and `POSTGRES_PRISMA_URL`
4. Use the direct connection for `POSTGRES_URL_NON_POOLING`
5. Make sure to include `sslmode=require` in your connection strings

#### Encryption Keys (Important!)

The encryption keys **must** be in hex format with specific lengths:

1. Generate proper encryption keys using this command:
   ```bash
   node -e "console.log('ENCRYPTION_KEY=\"' + Buffer.from(crypto.randomBytes(32)).toString('hex') + '\";'); console.log('ENCRYPTION_IV=\"' + Buffer.from(crypto.randomBytes(16)).toString('hex') + '\"');"
   ```
2. Copy the output directly to your `.env` file
3. The ENCRYPTION_KEY must be 64 characters (32 bytes) and ENCRYPTION_IV must be 32 characters (16 bytes)

#### Redis Setup

1. Create an account on [Upstash](https://upstash.com/)
2. Create a new Redis database
3. Copy the REST API token and endpoint URL to your `.env` file

#### Resend Setup

1. Create an account on [Resend](https://resend.com/)
2. Generate an API key from your dashboard
3. Copy the API key to your `.env` file

### 4. Set Up the Database

Before running the app, you need to set up the database tables:

```bash
npm run db:migrate
# or
yarn db:migrate
# or
pnpm db:migrate
```

This will create all the necessary tables in your PostgreSQL database for authentication and application data.

### 5. Run the Development Server

Once everything is set up, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 6. Deployment

To deploy this app, the easiest method is using [Vercel](https://vercel.com/). For detailed instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

---

## Learn More
- [Prisma Edge Documentation](https://www.prisma.io/docs/orm/prisma-client/deployment/edge) - Learn how to setup prisma in a edge environment
- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Vercel Deployment Guide](https://vercel.com/docs) – Learn how to deploy your Next.js app.

Enjoy using **GitVigil** to stay on top of your coding streaks! 🚀
