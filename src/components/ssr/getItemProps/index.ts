import axios from 'axios'
import type { GetServerSideProps } from 'next'

export const getItemProps: GetServerSideProps = async (context) => {
  const itemId = context.params?.itemId

  const {
    data: { item },
  } = await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item/${itemId}`,
  })

  return {
    props: {
      item,
    },
  }
}
