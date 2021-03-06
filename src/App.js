import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link to={'/'} className="navbar-brand">User Management</Link>
          </nav>
          <Switch>
              {/* start Router define */}
              <Route exact path='/' component={ Index } />   {/* initially you go this page */}
              <Route path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
              {/* end Router define */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
