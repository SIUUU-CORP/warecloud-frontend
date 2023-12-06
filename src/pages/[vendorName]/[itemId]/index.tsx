import React from 'react'
import { DetailItemModule } from '@modules'
import type { GetServerSideProps, NextPage } from 'next'
import { getItemProps } from '@ssr'
import { DetailItemModuleProps } from 'src/components/modules/DetailItemModule/interface'

const DetailItem: NextPage<DetailItemModuleProps> = ({ item }) => <DetailItemModule item={item} />

export default DetailItem

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await getItemProps(context)
}