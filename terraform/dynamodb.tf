resource "aws_dynamodb_table" "restaurants" {
  name         = "QuickBiteRestaurants"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "orders" {
  name         = "QuickBiteOrders"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "orderId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "orderId"
    type = "S"
  }
}
