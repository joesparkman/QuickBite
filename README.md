# QuickBite

A mobile-style food delivery web app built with React and AWS. Browse restaurants, add items to your cart, and place orders — all secured with Cognito authentication.

🔗 **Live:** [app.joesparkman.com/quickbite](https://app.joesparkman.com/quickbite)

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- AWS Amplify (auth)

**Backend**
- AWS Lambda (Python) — restaurant data
- AWS Lambda (Node.js) — orders
- API Gateway HTTP API
- DynamoDB

**Auth**
- AWS Cognito User Pool

**Infrastructure**
- Terraform
- S3 + CloudFront
- GitHub Actions CI/CD

---

## Project Structure

```
QuickBite/
├── quickbite-react/        # React frontend
│   ├── src/
│   │   ├── auth/           # Cognito + Amplify config
│   │   ├── components/     # BottomNav, RestaurantCard, SectionHeader
│   │   ├── data/           # API fetch functions
│   │   └── pages/          # Home, Search, Orders, Cart, Account, etc.
│   └── lambda/             # Restaurants Lambda (Python)
├── lambda-orders/          # Orders Lambda (Node.js)
├── terraform/              # All AWS infrastructure as code
└── .github/workflows/      # GitHub Actions CI/CD
```

---

## Pages

| Route | Description | Auth Required |
|---|---|---|
| `/` | Home — browse restaurants | No |
| `/search` | Search and filter | No |
| `/restaurant/:id` | Restaurant detail + menu | No |
| `/cart` | Cart and checkout | Yes |
| `/orders` | Order history | Yes |
| `/favorites` | Saved restaurants | Yes |
| `/account` | Account settings | Yes |
| `/login` | Login | No |
| `/signup` | Sign up | No |

---

## Local Development

```powershell
cd quickbite-react
npm install
npm run dev
```

Create a `.env` file in `quickbite-react/` using `.env.example` as a template:

```env
VITE_COGNITO_USER_POOL_ID=us-east-2_xxxxxxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_COGNITO_REGION=us-east-2
VITE_API_URL=https://<api-id>.execute-api.us-east-2.amazonaws.com/prod/restaurants
VITE_ORDERS_API_URL=https://<api-id>.execute-api.us-east-2.amazonaws.com/orders
```

---

## Deploying

**Build and upload frontend to S3:**
```powershell
cd quickbite-react
npm run build
aws s3 sync dist/ s3://www.joesparkman.com/quickbite/ --delete
aws cloudfront create-invalidation --distribution-id E3HHU0R4DHMA69 --paths "/quickbite/*"
```

**Deploy infrastructure changes:**
```powershell
cd terraform
terraform plan
terraform apply
```

Or push changes to `main` and GitHub Actions will apply automatically.

---

## Infrastructure

All AWS resources are managed with Terraform. See [terraform/README.md](terraform/README.md) for the full setup guide.

| Resource | Name |
|---|---|
| DynamoDB | QuickBiteRestaurants, QuickBiteOrders |
| Cognito | quickbite-user-pool |
| Lambda | QuickBiteRestaurants, QuickBiteOrders |
| API Gateway | QuickBiteRestaurantsAPI, QuickBiteOrdersAPI |
| CloudFront | d378laui85ajnz.cloudfront.net |
| State Bucket | joesparkman-terraform-state |
