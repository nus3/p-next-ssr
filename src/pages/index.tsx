import { GetServerSideProps, NextPage } from 'next'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

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
  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()

  return { props: { data } }
}