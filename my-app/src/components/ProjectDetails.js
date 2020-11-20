import React from "react";
import { graphql } from "react-apollo";
import { query } from "../queries/queries";
import '../components/CSS/ProjectDetails.css'






const ProjectDetails = props => {

  console.log(props.projectId.Id);

  const getProjectDetails = () => {


    const { project } = props.data
    console.log(project);
    if (project) {
      return (

        <div id="pop-up" className="details">
          <div id="detail-container">
            <div id="detail-text">
              <h1>Name : {project.name}</h1>
              <div>
                <p >Description: {project.description}</p>
                <p>Hours: {project.hours}</p>
              </div>


              <p>Author : {project.author.name}</p>
              <p className="btn">All projects by {project.author.name} :</p>
              <ul>
                {project.author.projects.map(item => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
              <button className="delete-btn" id="cancel-btn" onClick={() => {

                window.location.reload();
              }}><i class="far fa-window-close"></i></button>


            </div >
          </div>
        </div>
      );
    } else {
      return <div>No Project Selected </div>;
    }
  };

  return <div>{getProjectDetails()}
  </div>;

};

export default graphql(query, {
  options: props => {
    return {
      variables: {
        id: props.projectId.Id
      }
    };
  }
})(ProjectDetails);
