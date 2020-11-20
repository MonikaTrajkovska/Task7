
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";
import EditProject from './components/EditProject'
import ProjectDetails from "./components/ProjectDetails";
import './components/CSS/Navbar.css'


function App() {
  return (
    <Router>

      <Switch>
        <div>
          <nav
            className="navbar App-header"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link to="/list" className="navbar-item">
                All Projects
            </Link>


              <Link to="/newproject" className="navbar-item">
                New Project
            </Link>


            </div>
          </nav>





          <Route exact path="/list" component={ProjectList} />
          <Route exact path="/newproject" component={AddProject} />
          <Route exact path="/project/:id" component={EditProject} />
          <Route exact path="/detail/:id" component={ProjectDetails} />

        </div>

      </Switch >


    </Router >
  );
}

export default App;
