export const alphabetic=(data,direction)=>(
    data.sort((a,b)=>{
        const first =a.node.Name.toLowerCase()
        const second =b.node.Name.toLowerCase()
        const x=direction==='asc'?first:second
        const y=direction==='asc'?second:first
        if(x<y) return -1
        if(x>y) return 1
        return 0
    })
)
export const time=(data,direction)=>(
    data.sort((a,b)=>{
        const first =new Date(a.variant.createdAt)
        const second =new Date(b.variant.createdAt)
        const x=direction==='asc'?second:first
        const y=direction==='asc'?first:second
        if(x<y) return -1
        if(x>y) return 1
        return 0
    })
)
export const price=(data,direction)=>(
    data.sort((a,b)=>{
        const first =a.variant.Price
        const second =b.variant.Price
        const x=direction==='asc'?second:first
        const y=direction==='asc'?first:second
        if(x<y) return -1
        if(x>y) return 1
        return 0
    })
)