import { gql } from "apollo-boost";

const getProjectsQuery = gql` 
    {
        projects{
            name
            description
            hours
            id
        }
    }`
const DELETE_PROJECT_QUERY = gql`
    mutation removeProject($id: String!) {
      removeProject(id:$id) {
     
       id
     
       
  
      }
    }
  `;



const addProjectMut = gql`
  mutation ($name: String!, $description: String!, $hours: String!, $authorId: ID!) {
        addProject(name: $name, description: $description, hours:$hours,authorId: $authorId, ) {
       
            name

                 hours
              id
          
    }
  }
`
const getAuthorsQuery = gql` 
    {
        authors{
            name
            
            id
        }
    }`

const query = gql`
    query ($id:ID){
        project(id:$id){
            id
            name
            hours
   
            description
            author{
                name
                age
                id
                projects{
                    name
                    id
                }
            }
        }
    }
    
    `
const UPDATE_PROJECT = gql`
    mutation updateProject( $id: String!, $name: String!, $description: String!,$hours: String!){
        updateProject( id: $id,  name: $name,  description: $description,  hours: $hours , ) {
             id
          name
          description
          hours
       
        } 
  }
`
const REMOVE_HOURS = gql`
    mutation removeHours( $id: String!,$hours: String!){
        removeHours( id: $id,  hours: $hours  ) {
             id
       
          hours
       
        } 
  }
`
export { getProjectsQuery, DELETE_PROJECT_QUERY, query, getAuthorsQuery, addProjectMut, UPDATE_PROJECT, REMOVE_HOURS };
