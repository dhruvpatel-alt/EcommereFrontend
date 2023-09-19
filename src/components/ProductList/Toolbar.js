import React,{useState} from 'react'
import { Grid } from '@mui/material'
import Functioncontainer from './Functioncontainer'
import DescriptionContainer from './DescriptionContainer'
function Toolbar({filterOptions,name,description,layout,setLayout,setFilterOptions,sortOptions,setSortOptions,price,priceRange,setPriceRange}) {
  
const [option,setOption]=useState(null)
  return (
    <Grid item container direction='column'  style={{border:`5px solid #1e90ff`,borderRadius:25,width:'95%',height:'auto',marginBottom:'5rem'}}>
        <Functioncontainer filterOptions={filterOptions} option={option} setOption={setOption} setFilterOptions={setFilterOptions}
        sortOptions={sortOptions} setSortOptions={setSortOptions} price={price} setPriceRange={setPriceRange} priceRange={priceRange}/>
        {option===null && <DescriptionContainer name={name} layout={layout} setLayout={setLayout}
   description={description}/>}
    </Grid>
  )
}

export default Toolbar