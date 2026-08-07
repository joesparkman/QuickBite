import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));
const TABLE = "QuickBiteOrders";

const getUserId = (event) =>
  event.requestContext?.authorizer?.jwt?.claims?.sub ||
  event.requestContext?.authorizer?.claims?.sub ||
  null;

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const userId = getUserId(event);

  if (!userId) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  if (method === "POST") {
    const body = JSON.parse(event.body || "{}");
    const order = {
      userId,
      orderId: randomUUID(),
      createdAt: new Date().toISOString(),
      restaurant: body.restaurant || "",
      items: body.items || [],
      total: body.total || 0,
      status: "placed",
    };

    await client.send(new PutCommand({ TableName: TABLE, Item: order }));
    return { statusCode: 200, body: JSON.stringify(order) };
  }

  if (method === "GET") {
    const result = await client.send(
      new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: "userId = :uid",
        ExpressionAttributeValues: { ":uid": userId },
        ScanIndexForward: false,
      })
    );

    return { statusCode: 200, body: JSON.stringify(result.Items || []) };
  }

  return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
};