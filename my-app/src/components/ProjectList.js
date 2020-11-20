import React from "react";
import { graphql, useMutation, useQuery } from "react-apollo";
import { Link } from "react-router-dom";
import Notifications, { notify } from "react-notify-toast";
import { getProjectsQuery, DELETE_PROJECT_QUERY } from "../queries/queries";
import '../components/CSS/ProjectList.css'
import ProjectDetails from "./ProjectDetails";

const ProjectsList = props => {
  console.log(props);

  const [Id, setProject] = React.useState(0);
  const { loading, error, data } = useQuery(getProjectsQuery);
  const [removeProject] = useMutation(DELETE_PROJECT_QUERY, {
    refetchQueries: muatationResult => [{ query: getProjectsQuery }],
    update(
      cache,
      {
        data: { removeProject }
      }
    ) {

      const { projects } = cache.readQuery({ query: getProjectsQuery });
      const newProject = projects.filter(project => project.id !== removeProject.id);

      cache.writeQuery({
        query: getProjectsQuery,
        data: { projects: newProject }
      });
    }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;


  const displayProjects = () => {
    var data = props.data;
    if (data.loading) {
      return <div>Loading Projects...</div>;
    } else {
      return data.projects.map(project => {
        return (

          <tr key={project.id} onClick={e => setProject({ Id: project.id })}>
            <td><i class="fas fa-align-justify"></i></td>
            < td >  {project.name}</td>
            <td >{project.description}</td>
            <td>{project.hours}</td>

            <td>
              < span class="fas fa-trash-alt"
                onClick={e => {
                  e.preventDefault();
                  removeProject({ variables: { id: project.id } });
                  notify.show("Project was deleted successfully", "success");
                }} ></span ></td>



            <td>   <Link to={`project/${project.id}`}><span><i class="fas fa-edit"></i></span></Link></td>
          </tr>


        );

      });
    }
  };
  //function for sum total hours
  var dataa = data.projects.map(project => {
    return project.hours
  })
  console.log(dataa)
  const sumHours = [0, 0];
  for (let i = 0; i < dataa.length; i++) {
    const [hours, minutes] = dataa[i].split(':').map(s => parseInt(s, 10));

    // hours
    sumHours[0] += hours;

    // minutes
    if ((sumHours[i] + minutes) > 59) {
      const diff = sumHours[1] + minutes - 60;
      sumHours[0] += 1;
      // sumMinutes[1] = diff;
    } else {
      sumHours[1] += minutes;
    }
  }


  console.log(sumHours.join(':'));
  console.log(data.hours)
  return (

    <>
      <div className='main-div5'>
        <table>
          <thead>
            <tr >
              <th></th>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Project Hour</th>
              <th>Delete Project</th>
              <th>Edit Project</th>
            </tr>
          </thead>
          <tbody >{displayProjects()}</tbody>


          <p className='paragraph1'>Total hours: {sumHours.join(':')}</p>
        </table>
      </div>


      <ProjectDetails projectId={Id}></ProjectDetails>

    </>

  );
};

export default graphql(getProjectsQuery)(ProjectsList);
