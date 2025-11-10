import { 
  DynamoDBClient, 
  CreateTableCommand, 
  CreateTableCommandInput,DescribeTableCommand, DeleteTableCommand, PutItemCommand
} from "@aws-sdk/client-dynamodb";

import { Vender } from "./types/twitter";
import { marshall } from "@aws-sdk/util-dynamodb";

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
        console.log(" Table description:", table.Table);
        return table;
    }
    catch(err) {
    if (err instanceof Error) {
      console.error("Error:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred while describing table");
  }

    
}

//deleteing a table function

export const dynamodbDeleteTable = async (tableName: string) => {
    try{
         const result = await client.send(new DeleteTableCommand({ TableName: tableName }));
        console.log(" Table deleted:", result);
        return result;

    }catch(err) {
    if (err instanceof Error) {
      console.error(" Error:", err.message);
      throw err;
    }
}};

// creating a record function
export const dynamodbCreateRecord = async (tableName: string, vender: Vender) => {
    try{
        const record = await client.send(new PutItemCommand({ TableName: tableName, Item: marshall(vender) }));
        console.log("record inserted ", record);
        return record;

    }catch(err) {
    if (err instanceof Error) {
      console.error(" Error:", err.message);
      throw err;
    }
}
};

