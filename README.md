# paytm clone 
- Payment app that simulates p2p payments and recognises bank transfer from a simulated banking Api for webhooks. Server components for safe backend communication. Authentication built with NextAuth, google and credentials
- Turborepo for ui/database/config management throughout the monorepo, NextJs, server actions, Express, Postgres,webhooks, Recoil, tailwindcss,
- Mock Bank API to replicate banking api webhook handling, P2P transactions, merchant-app and user-app in NextJs including user and merchant dashboards and functionality

# Setup
## Env
```bash 
  touch packages/db/.env
  touch apps/merchant-app/.env
touch apps/user-app/.env
```
### env for packages/db
```.env
  DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"
```

### env for apps/merchant-app
```.env
  GOOGLE_CLIENT_ID=<YOUR_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<whatever>
```
### env for apps/user-app
```.env
  JWT_SECRET=test
NEXTAUTH_URL=http://localhost:3001
```

## DataBase Docker setup
```bash 
docker run -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
cd packages/db
npx prisma generate
npx prisma migrate dev --dev
npx prisma db push
npx prisma db seed
```

## run dev
```bash 
yarn install 
yarn dev
```
