import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommened from './Recommened'
import News from './News'
import BulkImportBooks from './BulkImportBooks'

const Home = () => {
  return (
    <>
        <Banner/>
        <BulkImportBooks/>
        <TopSellers/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home