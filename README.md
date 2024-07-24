# paytm clone 
- Payment app that simulates p2p payments and recognises bank transfer from a simulated banking Api for webhooks. Server components for safe backend communication. Authentication built with NextAuth, google and credentials
- Turborepo for ui/database/config management throughout the monorepo, NextJs, server actions, Express, Postgres,webhooks, Recoil, tailwindcss,
- Mock Bank API to replicate banking api webhook handling, P2P transactions, merchant-app and user-app in NextJs including user and merchant dashboards and functionality

<img width="1470" alt="Screenshot 2024-07-25 at 2 23 24 AM" src="https://github.com/user-attachments/assets/59165362-6243-4a2a-b049-63f65f493b63">
<img width="1470" alt="Screenshot 2024-07-25 at 2 24 43 AM" src="https://github.com/user-attachments/assets/a3031144-95a2-483c-af6b-cbd0624ed1ed">
<img width="1470" alt="Screenshot 2024-07-25 at 2 25 17 AM" src="https://github.com/user-attachments/assets/0d1e2ad4-2249-4f2e-aad5-7550e31aad2f">


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
### knowing the seed
it creates two users with 
| Number | Password |
|--------|----------|
| 123    | alice    |
| 1234   | bob      |


you can use these users to login and then try transferring money to each other using the number of the other user. 
The transferred money should reflect from one wallet to the other, The transaction is atomic and lossless. 
You can also mock a bank webhook api to add money into the wallet, go to the transfer page to do so.
add test money if you're low on funds for the home page

## run dev
```bash 
yarn install 
yarn dev
```
