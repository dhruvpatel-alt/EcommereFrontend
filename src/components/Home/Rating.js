import React from 'react'
import  fullStar from '../../images/full-star.svg'
import halfStar from '../../images/half-star.svg'
import emptyStar from '../../images/empty-star.svg'

function Rating({number,height,width}) {
    const diff=5-Math.ceil(number);
  return (
    <>
    {[...Array(Math.floor(number))].map((e,i)=>(
        <img src={fullStar} alt='full star' key={i} style={{height:height||'2rem',width:width||'2rem'}}/>
    ))}
    {number%1!==0?
        <img src={halfStar} alt='half star'  style={{height:height||'2rem',width:width||'2rem'}}/>:null
    }
    {[...Array(diff)].map((e,i)=>(
        <img src={emptyStar} alt='empty star' key={`${i}-empty`} style={{height:height||'2rem',width:width||'2rem'}}/>

    ))}
    </>
  )
}

export default Rating