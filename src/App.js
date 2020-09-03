import React, { Component } from 'react';
import './App.css'
import TaskForm from './components/TaskForm'
import Controll from './components/Controll'
import TaskList from './components/TaskList'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            Filter: {
                Name: '',
                Status: -1
            },
            Keyword: '',
            Sort: 0
        };
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem("tasks")) {
            var tasks = JSON.parse(localStorage.getItem("tasks"))
            this.setState({
                tasks: tasks
            })
        }
    }

    UniqueID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    addTask = () => {
    
        if(this.state.taskEditing){
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            })
        }else{
            this.setState({
                isDisplayForm: !this.state.isDisplayForm
            })
        }
        
    }
    onExistForm = () => {
        this.setState({
            isDisplayForm: false,
            taskEditing: null
        })
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    onSubmitData = (data) => {
        var { tasks } = this.state;

        if (data.ID === "") {
            var task = {
                ID: this.UniqueID(),
                Name: data.Name,
                Status: data.Status
            }

            tasks.push(task);
        } else {
            var index = this.findTask(data.ID);

            if (index !== -1) {
                tasks[index] = data;
            }
        }

        this.setState({
            tasks: tasks
        })
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    changeStatus = (ID) => {
        var { tasks } = this.state;

        var index = this.findTask(ID);

        if (index !== -1) {
            tasks[index].Status = !tasks[index].Status;
            this.setState({
                tasks: tasks
            })

            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

    }

    deleteTask = (ID) => {
        var { tasks } = this.state;

        var index = this.findTask(ID);

        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            })

            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    findTask = (ID) => {
        var { tasks } = this.state;

        var index = -1;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].ID === ID) {
                index = i;
                break;
            }
        }

        return index;
    }

    updateItem = (ID) => {
        var { tasks } = this.state;

        var index = this.findTask(ID);

        if (index !== -1) {
            this.setState({
                taskEditing: tasks[index]
            })

            this.onShowForm();

            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    filterList = (filterName, filterStatus)=>{
        this.setState({
            Filter: {
                Name: filterName.toLowerCase(),
                Status: filterStatus
            }
        })

    }

    searchList = (txtSearch)=>{
        this.setState({
            Keyword: txtSearch
        })
    }

    sortBy = (type) =>{
        this.setState({
            Sort: type
        })
    }

    render() {
        var { tasks, isDisplayForm, Filter, Keyword, Sort } = this.state;

        var elmTaskForm = isDisplayForm === true ? <TaskForm onExistForm={this.onExistForm}
            onSubmitData={this.onSubmitData}
            task={this.state.taskEditing} /> : '';
        if(Filter){
            tasks = tasks.filter((task)=>{
                return task.Name.toLowerCase().indexOf(Filter.Name) !== -1;
            })
            console.log(tasks)
            tasks = tasks.filter((task)=>{
                if(Filter.Status == -1)
                {
                    return task;
                }
                else{
                    return task.Status === (Filter.Status == 1? true: false);
                }
            })
        }

        if(Keyword !== ""){
            tasks = tasks.filter((task)=>{
                return task.Name.toLowerCase().indexOf(Keyword) !== -1;
            })
        }

        if(Sort !== 0){
            tasks.sort((a,b)=>{
                if(a.Name.toLowerCase() > b.Name.toLowerCase()) return Sort;
                else if(a.Name.toLowerCase() < b.Name.toLowerCase()) return -Sort;
                else return 0;
            })
        }
        
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        {elmTaskForm}
                    </div>
                    <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button" className="btn btn-primary" onClick={this.addTask}>
                            <span className="fa fa-plus mr-5"></span>&nbsp;Thêm Công Việc
                        </button>&nbsp;
                        <div className="row mt-15">
                            <Controll searchList = {this.searchList} sortBy = {this.sortBy}/>
                        </div>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList taskList={tasks}
                                    changeStatus={this.changeStatus}
                                    deleteTask={this.deleteTask}
                                    updateItem={this.updateItem} 
                                    filterList={this.filterList}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
