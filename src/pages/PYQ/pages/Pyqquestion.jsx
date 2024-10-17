import React, { useState } from 'react'
import SearchPYQ from '../component/SearchPYQ'
import Layout from '../../../components/layout/Layout'
import ShowPyq from '../component/ShowPyq'
import PyqCard from '../component/PyqCard'
import PyqPage from '../../../Dashboard/Pages/PyqPage'

const Pyqquestion = () => {

  const [findedPyq,setFindedPyq] = useState('')
  
  return (
    <Layout>
      <SearchPYQ setFindedPyq={setFindedPyq} />
     <PyqPage/>
    </Layout>
  )
}

export default Pyqquestion