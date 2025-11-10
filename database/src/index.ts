import { Vender } from "./types/twitter";
import venders from "./data/venders";
import { dynamodbDeleteTable } from "./dydb";
import { dynamodbCreateRecord } from "./dydb";
const { dynamodbCreateTable } = require("./dydb");

const { dynamodbDescribeTable } = require("./dydb");

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


const init = async () => {  
    const venderTablename = "Vendors";


  const vendorstableParams = {
  TableName: venderTablename,
  KeySchema: [{ AttributeName: "twitterId", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "twitterId", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};


try {
const venderTable = await dynamodbDescribeTable(venderTablename);
if (!(venderTable instanceof Error)) {
    // Define table parameters
    await dynamodbDeleteTable(venderTablename);
    await delay(10000);

    await dynamodbCreateTable(vendorstableParams);
    await delay(10000);

}
}catch(err){
  await dynamodbCreateTable(vendorstableParams);
  await delay(10000);
}



for(const i in venders){

  const vender = venders[i];
 if (!vender) continue; 
  try {
    await dynamodbCreateRecord(venderTablename, vender);
  } catch (err) {
    console.log("Failed to create record for vender:", vender.name, err);
  }

}
};

init();