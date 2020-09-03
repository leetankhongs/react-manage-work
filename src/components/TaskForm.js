import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Name: '',
            Status: true
        }
    }

    componentWillMount() {
        var taskEditing = this.props.task;
        if (taskEditing) {
            console.log("Vo")
            this.state = {
                ID: taskEditing.ID,
                Name: taskEditing.Name,
                Status: taskEditing.Status
            }
        }
    }


    componentWillReceiveProps(nextProps) {
        var taskEditing = nextProps.task;

        if (taskEditing) {
            this.state = {
                ID: taskEditing.ID,
                Name: taskEditing.Name,
                Status: taskEditing.Status
            }
        } else {
            this.state = {
                ID: '',
                Name: '',
                Status: true
            }
        }
    }
    onChangeValue = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (name === "Status") {
            value = target.value === "true" ? true : false;
        }

        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmitData(this.state);
        this.onCloseForm();
    }

    onCloseForm = () => {
        this.props.onExistForm();
    }

    resetForm = () => {
        this.setState({
            Name: '',
            Status: false
        })
        this.props.onExistForm();
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.ID === "" ? "Thêm Công Việc" : "Chỉnh sửa công việc"}  &nbsp;
                        <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}></span>
                    </h3>

                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text"
                                className="form-control"
                                name="Name"
                                onChange={this.onChangeValue}
                                value={this.state.Name}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control"
                            name="Status"
                            value={this.state.Status}
                            onChange={this.onChangeValue}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-right">
                            <button type="submit" className="btn btn-warning">{this.state.ID === "" ? "Thêm" : "Chỉnh sửa"}</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.resetForm}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default TaskForm;
