//collectUserInputs.jsx

//After this is saved it compiles and the updates are live

//Write components here. Components are just JSX functions.
//Like writing standard javascript. No real magic here.
//JSX is special because it's a combo of JavaScript and HTML
//Don't need to write them seperatly

import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import DISPLAY_USER_DATA from './displayUserData.js'

class COLLECT_USER_INPUTS extends React.Component {
  constructor(props) {
    super(props);
    //Probably have a state that has all user names
    //That + a field to determine number of users
    //Those states will build the UI
    this.state = {name1: ''}
    this.state = {name2: ''}
    this.state = {PlayersAsJSON: ''}
    //this.props.PlayersAsJSON = null
    this.state = {Users: []}
    this.state = {posts: []}
    //props.post.skills.Attack.level
    //this.state = {skills: []}
    

    //Wonder what these do?
    //Bind these functions to this component somehow?
    this.UpdateName = this.UpdateName.bind(this)
    this.postToAPI = this.postToAPI.bind(this)
    this.UpdateName2 = this.UpdateName2.bind(this)
  }

  UpdateNumberOfPlayers(event){

  }

  UpdateName(event) {
    this.setState({name1: event.target.value});
  }

  UpdateName2(event) {
    this.setState({name2: event.target.value});
  }

  postToAPI(event){
    axios.post('http://localhost:8080/post', {
  })
    .then((response) => {
      //console.log(response.data)
      //this.printPlayerDataToConsole(response)
      this.createTable(response)
    }, (error) => {
      //alert(error.message);
    });
  }

  //Build an HTML <table> variable in this.state
  //We're just building a giant string. \n should help a lot
  //Bailing with learning how to map this stuff right not
  //It's way too frusterating
  //I just want a dynamic end product
  //The problem I'm having with Map is that each element in the skill
    //array doesn't have an actual key in the JSON object
    //It has a 'name' attribute but that doesn't act as a key
    //It's array position is currently acting as the key
  createTable(axiosResponse){
    //const data = Object.values(axiosResponse.data)
    const data = axiosResponse.data
    console.log("data\n", data)
    console.log("data.player\n", data.stackofsmoat)
    console.log("data.player.skills\n", data.stackofsmoat.skills)
    console.log("data.player.skills[X]\n", data.stackofsmoat.skills[0].name, " ", data.stackofsmoat.skills[0].level, " ", data.stackofsmoat.skills[0].experience)
    //const foo = JSON.parse(data)
    var table  = "<table>"

    //Top row depends on number of users
    table += "<tr><th></th>"

    table += "<th>" + data.stackofsmoat.playerName + "</th>"
    table += "<th>" + data.stackofm3n.playerName + "</th>"

    table += "</tr>"

    //Build a table string

    //<ul></ul>

    table += "</table>"

    this.setState({
      table: table
    })
  }

  
//Component lifecycle. Pretty sure these are over-ridden here. Read up on this again once functionality is complete.
//Looking into this more will solve my answers of where to put what
//Reactjs component lifecycle

//Sounds like best practice is to load in API data here
  //Actuall doesn't make sense here because we need user data first
  //Makes sense if loading specific data from a database
//Fetch data and set it in this.setState

//All examples show calls to API here. Should try it
  componentDidMount() {  
    //console.log('Mounting State : calling method componentDidMount');
    //https://stackoverflow.com/questions/53325348/how-to-display-nested-array-data-in-json-in-reactjs
  }   
 
  shouldComponentUpdate() {  
    //console.log('Update  State : calling method shouldComponentUpdate');
    return true;
  }  

  componentDidUpdate() {  
    //console.log('Update  State : calling method componentDidUpdate')  
  }  
  componentWillUnmount() {  
    //console.log('UnMounting State : calling method componentWillUnmount');
  }  

//End component lifecycle.

  /**
   * I wanted this to be map based for future flexability but was having a hard time.
   * I've seen many examples in JavaScript but it made my head hurt.
   * Went a classic route first to have a working product
   * 
   * @param {Response returned by Axios from REST API} axiosResponse 
   */
   printPlayerDataToConsole(axiosResponse){
    console.log("BEGIN: printPlayerDataToConsole")
    //console.log("response.data\n", axiosResponse.data, "\nPrinting values of response.data")
    //console.log(Object.values(axiosResponse.data)) //This is what we want to loop through
    //I want to loop through each value's skill array
    //console.log("Attempting to print skills")
    const data = Object.values(axiosResponse.data)
    for( let i = 0; i < data.length; i++){
      console.log(data[i].playerName)
      for(let j = 0; j < data[i].skills.length; j++){
        console.log(data[i].skills[j].name, " ", data[i].skills[j].level, " ", data[i].skills[j].experience)
      }
    }
    console.log("END: printPlayerDataToConsole")
  }

  addFields(){
    
  }

  //onChange update number of fields displayed
  render(){
    return(
      <div className="PlayerInputForm">
        Number of Players:<input type="number" 
                            onInput = {(e) =>{
                              e.target.value = Math.max(1, parseInt(e.target.value) ).toString().slice(0,1)
                            }}
                            value={this.state.numberOfPlayers} 
                          />
        <br/>
        Name1: <input type="text" value={this.state.name1} onChange={this.UpdateName} /><br/>
        {this.addFields}
        
      </div>
    )
  }

  //react dynamically create input fields
  //https://stackoverflow.com/questions/36235923/how-can-i-create-input-text-fields-dynamically-in-react-js-jsx
//Arrange the data in HTML
/**
  render() {
    return (
      <div>  
        Number of Players:<input type="number" 
                          onInput = {(e) =>{
                            e.target.value = Math.max(1, parseInt(e.target.value) ).toString().slice(0,1)
                          }}
                          value={this.state.numberOfPlayers} onChange={this.UpdateNumberOfPlayers} /><br/>    
        Name1: <input type="text" value={this.state.name1} onChange={this.UpdateName} /><br/>
        Name2: <input type="text" value={this.state.name2} onChange={this.UpdateName2} /><br/>        
        <input type="button" value="Get Player Data" onClick={this.postToAPI}/>
        <h2>{this.state.errorMessage}</h2>
        <div>
          {this.state.table}
        </div>
      </div>
    )
  }
  */
}

export default COLLECT_USER_INPUTS;//Exports this class