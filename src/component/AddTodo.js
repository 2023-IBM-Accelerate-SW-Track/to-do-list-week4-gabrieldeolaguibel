import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

class AddTodo extends Component {
    constructor() {
        super();
        this.state = {
            content: "",
            date: "",
            duedate: null,
            error: ""
        };
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value,
            date: Date()
        });
    };

    handleDateChange = (event) => {
        let date = null
        if (event != null) {
            date = new Date(event)
        }
        this.setState({
            duedate: date
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.content.trim()) {
            axios.post('http://localhost:3001/add/item', {
                jsonObject: {
                    ID: Math.floor(Math.random() * 1000),
                    Task: this.state.content,
                    Due_date: this.state.duedate
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("Item added successfully");
                        this.props.fetchTodoItems();
                        this.setState({
                            content: "",
                            date: "",
                            duedate: null,
                            error: ""
                        });
                    }
                })
                .catch(error => {
                    this.setState({ error: "An error occurred while adding the item." });
                });
        }
    };

    render() {
        return (
            <div>
                <TextField
                    label="Add New Item"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.content}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        id="new-item-date"
                        label="Due Date"
                        value={this.state.duedate}
                        onChange={this.handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button
                    style={{ marginLeft: "10px" }}
                    onClick={this.handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Add
                </Button>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default AddTodo;
