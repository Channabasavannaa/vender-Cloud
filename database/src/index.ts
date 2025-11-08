

//const { dynamodbCreateTable } = require("./dydb");

const { dynamodbDescribeTable } = require("./dydb");


const init = async () => {  

await dynamodbDescribeTable("Vendors");
const vendorstableParams = {
  TableName: "Vendors",
  KeySchema: [{ AttributeName: "twitterId", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "twitterId", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

//dynamodbCreateTable(vendorstableParams);

}

init();