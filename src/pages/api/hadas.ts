import { NextApiRequest, NextApiResponse } from "next";
import * as aws from 'aws-sdk'
import { HadaData } from "..";

const dynamodb = new aws.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: 'ap-northeast-1',
  signatureVersion: 'v4',
})

const TABLE_NAME = 'hada_test'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const results = await dynamodb
      .scan({
        TableName: TABLE_NAME,
        Limit: 10,
      })
      .promise()

  const hadas: HadaData[] = results.Items as HadaData[]

  res.status(200).json({
    hadas
  })
}

export default handler