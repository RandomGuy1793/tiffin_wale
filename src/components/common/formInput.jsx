import React, { Component } from 'react';

class FormInput extends Component {
    state = {  } 
    render() { 
        const {type, value, name, onChange, error}=this.props
        return (
            <div className="form-group">
              <input
                name={name}
                type={type}
                value={value}
                className="form-control"
                placeholder={name}
                onChange={onChange}
              />
              {error ? <div className="alert alert-danger">{error}</div> : <h1></h1>}
            </div>
        );
    }
}
 
export default FormInput;