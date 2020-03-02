import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      full_name: '',
      user_id: '',
      email: '',
      birthday: ''
    }
    
  }

  componentDidMount() {  // initial load function
    axios.get('http://localhost:4000/users/edit/'+this.props.match.params.id)
    .then(response => {
        this.setState({ 
          full_name: response.data.full_name,
          user_id: response.data.user_id,
          email: response.data.email,
          birthday: response.data.birthday
        });
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
    })
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

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      full_name: this.state.full_name,
      user_id: this.state.user_id,
      email: this.state.email,
      birthday: this.state.birthday
    };
    axios.post('http://localhost:4000/users/update/'+this.props.match.params.id, obj)
        .then(res => {
          this.props.history.push('/index');
          console.log(res.data)
        });
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Full Name:</label>
                    <div className="col-sm-10">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.full_name}
                        onChange={this.onChangeFullName}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">UserID:</label>
                    <div className="col-sm-10">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.user_id}
                        onChange={this.onChangeUserID}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email Adress:</label>
                    <div className="col-sm-10">
                      <input 
                        type="email" 
                        className="form-control" 
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Your Birthday:</label>
                    <div className="col-sm-10">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.birthday}
                        onChange={this.onChangeBirthday}
                        />
                    </div>
                </div>
                <div className="row justify-content-md-center">
                      <input type="submit" 
                        value=" SAVE " 
                        className="btn btn-primary"/>
                      <button type="button" className="ml-3 btn btn-primary">
                        <Link to={'/index'} className="text-light">Back</Link>
                      </button>
                </div>
            </form>
        </div>
    )
  }
}