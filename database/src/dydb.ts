import { 
  DynamoDBClient, 
  CreateTableCommand, 
  CreateTableCommandInput,DescribeTableCommand 
} from "@aws-sdk/client-dynamodb";

// Create a DynamoDB client
const client = new DynamoDBClient({
  region: "us-east-1", // Or process.env.AWS_REGION
});

export const dynamodbCreateTable = async (params: CreateTableCommandInput) => {
  try {
    const command = new CreateTableCommand(params);
    const result = await client.send(command);
    console.log("✅ Table created:", result.TableDescription?.TableName);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating table");
  }
};


// describe a table function

export const dynamodbDescribeTable = async (tableName: string) => {
    try{
        const table = await client.send(new DescribeTableCommand({ TableName: tableName }));
        console.log("✅ Table description:", table.Table);
        return table;
    }
    catch(err) {
    if (err instanceof Error) {
      console.error("❌ Error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while creating table");
  }

    
}
