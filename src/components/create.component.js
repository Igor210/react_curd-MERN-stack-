import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ValidationForm,TextInput } from 'react-bootstrap4-form-validation';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullName = this.onChangeFullName.bind(this); // handle Full Name value when changing value.
    this.onChangeUserID = this.onChangeUserID.bind(this); // handle userID value when changing value.
    this.onChangeEmail = this.onChangeEmail.bind(this); // handle email value
    this.onChangeBirthday = this.onChangeBirthday.bind(this); // handle birthday value
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      users:[],
      full_name: '',
      user_id: '',
      email: '',
      birthday: '',
    }
  }
  componentDidMount(){  // initall function.
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

  onChangeFullName(e) {
    this.setState({
      full_name: e.target.value
    });
  }
  onChangeUserID(e) {
    this.setState({
      user_id: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangeBirthday(e) {
    this.setState({
      birthday: e.target.value
    })
  }

  onSubmit(e) {   // When click save, sending request on the server.
    e.preventDefault();
    const obj = {
      full_name: this.state.full_name,
      user_id: this.state.user_id,
      email: this.state.email,
      birthday: this.state.birthday
    };
    axios.post('http://localhost:4000/users/add', obj)  // adding user in server
        .then(res => {
          this.props.history.push('/index');
          console.log(res.data)
        });
    
    this.setState({
      full_name: '',
      user_id: '',
      email: '',
      birthday: ''
    })
  }
  chkUnique(val) {   // User Id unique checking function
    let users = this.state.users;
    let idchk = true;
    users.map(function(object, i){
      if(users[i].user_id == val){
        idchk = false;
      }
    })
    return idchk;
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <ValidationForm onSubmit={this.onSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Full Name:</label>
                    <div className="col-sm-10">
                      <TextInput  
                        type="text" 
                        name = "full_name"
                        className="form-control" 
                        value={this.state.full_name}
                        onChange={this.onChangeFullName}
                        required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">UserID:</label>
                    <div className="col-sm-10">
                      <TextInput 
                        type="text" 
                        name = "user_id"
                        className="form-control" 
                        validator={(value) => this.chkUnique(value) }
                        value={this.state.user_id}
                        onChange={this.onChangeUserID}
                        minLength="4"
                        errorMessage={{validator: "Your ID is not unique. Please input again."}}
                        required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email Adress:</label>
                    <div className="col-sm-10">
                      <TextInput 
                        type="email" 
                        name = "email"
                        className="form-control"
                        errorMessage={{validator:"Please enter a valid email"}} 
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Your Birthday:</label>
                    <div className="col-sm-10">
                      <TextInput 
                        type="text" 
                        name = "birthday"
                        className="form-control" 
                        value={this.state.birthday}
                        onChange={this.onChangeBirthday}
                        required
                        />
                    </div>
                </div>
                <div className="row col justify-content-md-center">
                    <input type="submit" 
                      value="Add User" 
                      className="btn btn-primary"/>
                    <button type="button" className="ml-3 btn btn-primary">
                      <Link to={'/index'} className="text-light">Back</Link>
                    </button>
                </div>
            </ValidationForm>
        </div>
    )
  }
}