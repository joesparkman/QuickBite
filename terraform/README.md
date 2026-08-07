# QuickBite — Terraform & GitHub Actions Setup Guide

## Prerequisites
- Terraform installed (`terraform -version`)
- AWS CLI installed and configured (`aws configure`)
- GitHub repo created

---

## Part 1 — Terraform Foundation

### 1. Create the terraform folder
```powershell
mkdir terraform
cd terraform
```

### 2. Create core files
- `main.tf` — AWS provider configuration
- `variables.tf` — input variables (region, app name)
- `outputs.tf` — values printed after apply (API URLs, Cognito IDs)

### 3. Create infrastructure files
- `dynamodb.tf` — `QuickBiteRestaurants` and `QuickBiteOrders` tables
- `cognito.tf` — User Pool and Client for authentication
- `lambda.tf` — two Lambda functions with IAM roles and policies
- `api_gateway.tf` — two HTTP APIs wired to the Lambdas
- `s3.tf` — CloudFront distribution for frontend hosting

### 4. Initialize and deploy
```powershell
terraform init      # downloads AWS provider
terraform plan      # preview changes
terraform apply     # deploy to AWS
```

---

## Part 2 — Importing Existing Resources

If resources already exist in AWS, import them instead of recreating:
```powershell
terraform import aws_dynamodb_table.restaurants QuickBiteRestaurants
terraform import aws_lambda_function.orders QuickBiteOrders
terraform import aws_apigatewayv2_api.orders <api-id>
terraform import aws_cloudfront_distribution.frontend <distribution-id>
```

After importing, run `terraform plan` — it should show `No changes`.

> Watch out for region mismatches — all resources must be in the same region as your provider.

---

## Part 3 — Remote State

By default Terraform stores state locally. Move it to S3 so it's safe and shareable.

### 1. Create the backend resources
```powershell
aws s3api create-bucket --bucket <your-name>-terraform-state --region us-east-2 --create-bucket-configuration LocationConstraint=us-east-2
aws s3api put-bucket-versioning --bucket <your-name>-terraform-state --versioning-configuration Status=Enabled
```

### 2. Add backend block to `main.tf`
```hcl
backend "s3" {
  bucket       = "<your-name>-terraform-state"
  key          = "quickbite/terraform.tfstate"
  region       = "us-east-2"
  use_lockfile = true
  encrypt      = true
}
```

### 3. Migrate local state to S3
```powershell
terraform init -migrate-state
```

---

## Part 4 — GitHub Actions

### 1. Initialize git and connect to GitHub
```powershell
git init
git remote add origin https://github.com/<username>/<repo>.git
```

### 2. Create the workflow file

`.github/workflows/terraform.yml` with three triggers:
- `pull_request` → runs `terraform plan` and posts output as a PR comment
- `push` to `main` → runs `terraform apply`
- `workflow_dispatch` → allows manual runs from the GitHub UI

### 3. Add AWS credentials as GitHub secrets

Go to `https://github.com/<username>/<repo>/settings/secrets/actions` and add:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### 4. Push and verify
```powershell
git add .
git commit -m "add terraform and github actions"
git push origin main
```

Verify at `https://github.com/<username>/<repo>/actions/workflows/terraform.yml`

---

## Daily Workflow Going Forward

```powershell
# Make infrastructure changes in .tf files, then:
terraform plan              # preview
terraform apply             # deploy manually

# Or push to GitHub and let Actions handle it automatically
git add terraform/
git commit -m "describe your change"
git push origin main
```
