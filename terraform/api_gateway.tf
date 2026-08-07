# --- Restaurants API ---

resource "aws_apigatewayv2_api" "restaurants" {
  name          = "QuickBiteRestaurantsAPI"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "restaurants" {
  api_id                 = aws_apigatewayv2_api.restaurants.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.restaurants.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "restaurants_get" {
  api_id    = aws_apigatewayv2_api.restaurants.id
  route_key = "GET /restaurants"
  target    = "integrations/${aws_apigatewayv2_integration.restaurants.id}"
}

resource "aws_apigatewayv2_stage" "restaurants" {
  api_id      = aws_apigatewayv2_api.restaurants.id
  name        = "prod"
  auto_deploy = true
}

resource "aws_lambda_permission" "restaurants_apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.restaurants.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.restaurants.execution_arn}/*/*"
}

# --- Orders API (existing — imported) ---

resource "aws_apigatewayv2_api" "orders" {
  name          = "QuickBiteOrdersAPI"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://app.joesparkman.com"]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["authorization", "content-type"]
  }
}

resource "aws_apigatewayv2_integration" "orders" {
  api_id                 = aws_apigatewayv2_api.orders.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.orders.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "orders_post" {
  api_id    = aws_apigatewayv2_api.orders.id
  route_key = "POST /orders"
  target    = "integrations/${aws_apigatewayv2_integration.orders.id}"
}

resource "aws_apigatewayv2_route" "orders_get" {
  api_id    = aws_apigatewayv2_api.orders.id
  route_key = "GET /orders"
  target    = "integrations/${aws_apigatewayv2_integration.orders.id}"
}

resource "aws_apigatewayv2_stage" "orders" {
  api_id      = aws_apigatewayv2_api.orders.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "orders_apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.orders.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.orders.execution_arn}/*/*"
}
