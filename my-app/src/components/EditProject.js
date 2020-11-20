import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { notify } from "react-notify-toast";

import { UPDATE_PROJECT, query } from '../queries/queries'
import '../components/CSS/AddProject.css'



const EditProject = ({ match }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState("")


    const { loading, error, data } = useQuery(query, {
        variables: {
            id: match.params.id
        }
    });

    const [updateProject] = useMutation(UPDATE_PROJECT);

    if (loading) return <div>Fetching projects</div>;
    if (error) return <div>Error fetching projects</div>;
    const project = data;
    console.log(project)
    return (



        <div className="box-container" >

            <form

                onSubmit={e => {
                    e.preventDefault();
                    updateProject({
                        variables: {
                            id: project.project.id,
                            name: name ? name : project.project.name,
                            description: description ? description : project.project.description,
                            hours: hours ? hours : project.project.hours
                        }
                    });
                    console.log(project.project.id)
                    notify.show("Project was edited successfully", "success");
                }}

            >
                <div>
                    <Link to="/list"><i class="fas fa-arrow-left"></i>   Back</Link>
                    <h3>Edit Project</h3>
                    <label className="text-field-input2" >Project Name</label>
                    <div>
                        <input
                            className="text-field2"
                            type="text"
                            name="title"
                            placeholder="Project Name"
                            defaultValue={project.project.name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div >
                        <label className="text-field-input2">Project Description</label>
                        <input
                            className="text-field2"
                            type="text"
                            name="description"
                            placeholder="Project Description"
                            defaultValue={project.project.description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-field-input2">Hours</label>
                        <input
                            className="text-field2"
                            type="text"
                            name="hours"
                            placeholder="Hours"
                            defaultValue={project.project.hours}
                            onChange={e => setHours(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <div>


                        <button className="primary-button2">Submit</button>
                    </div>

                </div>
            </form>
        </div>


    );
};

export default EditProject;
