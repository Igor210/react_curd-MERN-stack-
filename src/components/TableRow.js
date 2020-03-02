import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);
  }
  delete() {  // deleting user using user id
      axios.get('http://localhost:4000/users/delete/'+this.props.obj._id)
          .then(res=>{
            window.location.reload();
            console.log('Deleted')
          })
          .catch(err => console.log(err))
  }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.full_name}
          </td>
          <td>
            {this.props.obj.user_id}
          </td>
          <td>
            {this.props.obj.email}
          </td>
          <td>
            {this.props.obj.birthday}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link> {/* going to edit page */}
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">
              Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;