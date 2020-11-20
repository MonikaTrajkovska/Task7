import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import '../components/CSS/AddProject.css'
import {
  getAuthorsQuery,
  addProjectMut, getProjectsQuery
} from "../queries/queries";
import { graphql } from "react-apollo";
import HandleFormHook from "../hooks/handleFormHook";

const AddProject = props => {

  const getFormData = () => {
    console.log(`${inputs}`);
    props.addProjectMut({
      variables: {
        name: inputs.name,
        description: inputs.description,
        hours: inputs.hours,
        authorId: inputs.author

      },
      refetchQueries: [{ query: getProjectsQuery }]
    });
  };

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );

  const getOwners = () => {
    var data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Author loading...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}

          </option>
        );
      });
    }
  };

  return (
    <>
      <div className="box-container2" >

        <form onSubmit={handleSubmit}>
          <div >
            <Link to="/list"><i class="fas fa-arrow-left"></i>   Back</Link>
            <h3>Add New Project</h3>
            <label className="text-field-input2">Project name</label>
            <input className="text-field2"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={inputs.name}
            ></input>
          </div>
          <div >
            <label className="text-field-input2">Project description</label>
            <input className="text-field2"
              type="text"
              name="description"
              onChange={handleInputChange}
              value={inputs.description}
            ></input>
          </div>
          <div >
            <label className="text-field-input2">Hours:</label>
            <input className="text-field2"
              type="time"
              name="hours"
              onChange={handleInputChange}
              value={inputs.hours}
            ></input>

          </div>
          <div >
            <label className="text-field-input2">Author of the project:</label>
            <select className="text-field"
              name="author"
              onChange={handleInputChange}
              value={inputs.author}
            >

              <option>Select author of the project</option>
              {getOwners(props)}
            </select>
          </div>

          <button className="primary-button2" >Add Project</button>


        </form>
      </div>
    </>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addProjectMut, { name: "addProjectMut" })
)(AddProject);






