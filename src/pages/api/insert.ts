import { NextApiRequest, NextApiResponse } from 'next'
import * as aws from 'aws-sdk'
import { v4 as uuid } from 'uuid'

const dynamodb = new aws.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: 'ap-northeast-1',
  signatureVersion: 'v4',
})

const TABLE_NAME = 'hada_test'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  // HACK: postメソッドの時だけputするようにしましょう
  await dynamodb
    .put({
      TableName: TABLE_NAME,
      Item: {
        id: uuid(),
        age: 30,
        likeFood: 'ハヤシライス',
        name: 'ほんとうのハダ',
      },
    })
    .promise()

  res.status(200)
}

export default handler
