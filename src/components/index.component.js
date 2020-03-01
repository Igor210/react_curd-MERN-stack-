import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {users: []};
    }
    componentDidMount(){
      const config = {
        mode: "no-cors",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
      axios.get('http://localhost:4000/users', config)
        .then(response => {
          this.setState({ users: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.users.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <button type="button" className="btn btn-primary">
              <Link to={'/create'} className="text-light">Add User</Link>
          </button>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>User ID</th>
                <th>Email Adress</th>
                <th>User Birthday</th>
                <th width="20%" colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }