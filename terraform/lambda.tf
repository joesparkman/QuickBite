data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

# --- Restaurants Lambda ---

resource "aws_iam_role" "restaurants_lambda" {
  name               = "quickbite-restaurants-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "restaurants_basic" {
  role       = aws_iam_role.restaurants_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "restaurants_dynamodb" {
  role       = aws_iam_role.restaurants_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess"
}

resource "aws_lambda_function" "restaurants" {
  function_name    = "QuickBiteRestaurants"
  role             = aws_iam_role.restaurants_lambda.arn
  runtime          = "python3.12"
  handler          = "lambda_function.lambda_handler"
  filename         = "../quickbite-react/lambda/lambda_function.zip"
  source_code_hash = filebase64sha256("../quickbite-react/lambda/lambda_function.zip")
}

# --- Orders Lambda ---

resource "aws_iam_role" "orders_lambda" {
  name               = "quickbite-orders-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "orders_basic" {
  role       = aws_iam_role.orders_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "orders_dynamodb" {
  role       = aws_iam_role.orders_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_lambda_function" "orders" {
  function_name    = "QuickBiteOrders"
  role             = aws_iam_role.orders_lambda.arn
  runtime          = "nodejs22.x"
  handler          = "index.handler"
  filename         = "../lambda-orders/orders-lambda.zip"
  source_code_hash = filebase64sha256("../lambda-orders/orders-lambda.zip")
}
