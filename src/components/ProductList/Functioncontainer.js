import React from 'react'
import {IconButton} from '@mui/material';
import filter from '../../images/filter.svg'
import sort from '../../images/sort.svg'
import { Grid } from '@mui/material'
import Sort from './Sort';
import Filter from './Filter';
function Functioncontainer({filterOptions,option,setOption,setFilterOptions,sortOptions,setSortOptions,price,priceRange,setPriceRange}) {
    const content=()=>{
        switch(option){
            case 'sort':
                return <Sort setOption={setOption} sortOptions={sortOptions} setSortOptions={setSortOptions}/>
            case 'filter':
                return <Filter setOption={setOption} filterOptions={filterOptions} setFilterOptions={setFilterOptions} price={price}
                setPriceRange={setPriceRange} priceRange={priceRange}/>
            default:
                const items=[{icon:filter,alt:'filter'},{icon:sort,alt:'sort'}]
                return (
                    <Grid item container justifyContent='space-around' alignItems='center'>
                        {items.map(item=>(
                            <Grid item key={item.alt}>
                                <IconButton onClick={()=>setOption(item.alt)}>
                                    <img src={item.icon} alt={item.alt} />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                )
        }
    }
  return (
    <Grid item container   style={{minHeight:'6rem',height:'auto',background:'#1e90ff',borderRadius:option!==null?'10px':'10px 10px 0px 0px'}}>
        {content()}
    </Grid>
  )
}

export default Functioncontainer