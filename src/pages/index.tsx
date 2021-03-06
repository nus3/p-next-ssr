import { GetServerSideProps, NextPage } from 'next'
import * as aws from 'aws-sdk'

const dynamodb = new aws.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: 'ap-northeast-1',
  signatureVersion: 'v4',
})

const TABLE_NAME = 'hada_test'

export type HadaData = {
  id: string
  age: number
  likeFood: string
  name: string
}

const getHello = () => fetch('http://localhost:3000/api/hello')

interface IndexPageProps {
  data: {
    message: string
    hada: HadaData
    hadas: HadaData[]
  }
}

const IndexPage: NextPage<IndexPageProps> = ({ data }) => {
  const handleInsertHada = async () => {
    await fetch('/api/insert')
  }

  const handleGetHada = async () => {
    const res = await fetch('/api/hadas')
    const resJson = await res.json()
    console.log({ resJson })
  }

  return (
    <div>
      <h1>{data.message}</h1>
      {data.hadas.map((hada) => (
        <div key={hada.id} style={{ display: 'flex', gap: '10px' }}>
          <p>Id: {hada.id}</p>
          <p>Name: {hada.name}</p>
          <p>Age: {hada.age}</p>
          <p>LikeFood: {hada.likeFood}</p>
        </div>
      ))}
      <button type="button" onClick={handleInsertHada}>
        insert
      </button>
      <button type="button" onClick={handleGetHada}>
        get
      </button>
    </div>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps<IndexPageProps> =
  async () => {
    const res = await getHello()
    const data = await res.json()

    const result = await dynamodb
      .get({
        TableName: TABLE_NAME,
        Key: {
          id: '1',
        },
      })
      .promise()

    const hada: HadaData = result?.Item as HadaData

    const results = await dynamodb
      .scan({
        TableName: TABLE_NAME,
        Limit: 10,
      })
      .promise()

    const hadas: HadaData[] = results.Items as HadaData[]

    return {
      props: {
        data: {
          message: data.message,
          hada,
          hadas,
        },
      },
    }
  }
