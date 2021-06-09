import { GetServerSideProps, NextPage } from 'next'

const getHello = () => fetch('http://localhost:3000/api/hello')

interface IndexPageProps {
  data: {
    message: string
  }
}

const IndexPage: NextPage<IndexPageProps> = ({data}) => {
  console.log({data});
  return <h1>{data.message}</h1>
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getHello()
  const data = await res.json()

  return { props: { data } }
}