output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.main.id
}

output "restaurants_table_name" {
  value = aws_dynamodb_table.restaurants.name
}

output "orders_table_name" {
  value = aws_dynamodb_table.orders.name
}

output "restaurants_api_url" {
  value = "${aws_apigatewayv2_stage.restaurants.invoke_url}/restaurants"
}

output "orders_api_url" {
  value = "${aws_apigatewayv2_stage.orders.invoke_url}/orders"
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.frontend.domain_name
}
