import gql from "graphql-tag";
const GET_DETAILS=gql`
query getDetails($id:ID!){
  products(filters: {id: { eq: $id}}){
    data{
      attributes{
	variants{
          data{
            attributes{
              qty
            }
          }
        }
      }	
      
    }  
  }
}
`
export default GET_DETAILS
