
# QuickBite

A full-stack mobile food delivery app built as a portfolio project. Users can browse restaurants, view menus, add items to a cart, authenticate via AWS Cognito, and place orders backed by a serverless AWS API.

Live demo: https://app.joesparkman.com/quickbite

---

## Stack

**Frontend**
- React 18
- React Router v6
- Vite 5
- Pure CSS (no component libraries)

**Backend / Cloud (AWS)**
- Cognito — user authentication (sign up, confirm, sign in, sign out)
- DynamoDB — restaurant and menu data
- Lambda — order processing
- API Gateway — REST API endpoints
- S3 — static site hosting
- CloudFront — CDN and distribution

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — categories, search bar, promo banner, popular and all restaurants |
| `/search` | Search all restaurants |
| `/restaurant/:id` | Restaurant detail, full menu, add to cart |
| `/cart` | Cart with subtotal, delivery fee, and total |
| `/order-confirmed` | Order confirmation screen |
| `/orders` | Order history (authenticated) |
| `/favorites` | Saved restaurants (authenticated) |
| `/account` | Account info and sign out (authenticated) |
| `/login` | Sign in |
| `/signup` | Create account + email confirmation |

---

## Local Setup

**1. Clone the repo and install dependencies:**
```bash
npm install
```

**2. Create a `.env` file** based on `.env.example`:
```bash
cp .env.example .env
```

Fill in your own values:
```
VITE_COGNITO_USER_POOL_ID=your_user_pool_id
VITE_COGNITO_CLIENT_ID=your_client_id
VITE_COGNITO_REGION=us-east-2
VITE_API_URL=https://your-api-id.execute-api.us-east-2.amazonaws.com/prod/restaurants
```

**3. Start the dev server:**
```bash
npm run dev
```

---

## Deploy

Build and sync to S3, then invalidate the CloudFront cache:

```bash
npm run build
aws s3 sync dist/ s3://your-bucket/quickbite/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/quickbite/*"
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_COGNITO_USER_POOL_ID` | AWS Cognito User Pool ID |
| `VITE_COGNITO_CLIENT_ID` | AWS Cognito App Client ID |
| `VITE_COGNITO_REGION` | AWS region (e.g. `us-east-2`) |
| `VITE_API_URL` | API Gateway endpoint for restaurant data |

Never commit your `.env` file — it is excluded via `.gitignore`.
