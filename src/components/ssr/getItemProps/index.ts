import axios from 'axios'
import type { GetServerSideProps } from 'next'

export const getItemProps: GetServerSideProps = async (context) => {
  const itemId = context.params?.itemId
  const vendorName = context.params?.vendorName

  const {
    data: { item },
  } = await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_APP_API_URL}/item/${itemId}`,
  })

  if (!item) {
    return {
      notFound: true
    }
  }

  const lowerCasedName = item.user.name.toLowerCase()
  const vendorNamePath = lowerCasedName.replaceAll(' ', '-')
  
  if (vendorName !== vendorNamePath) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      item,
    },
  }
}
