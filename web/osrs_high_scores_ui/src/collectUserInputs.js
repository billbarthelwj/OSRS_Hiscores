import React, { useState } from 'react'
import axios from 'axios'
import './collectUserInputs.css'
import CircularProgress from '@mui/material/CircularProgress'

const App = () => {
  //I'm sure this can be a dynamic list somehow. Difficult to scale up otherwise. 
  const [playerOneUsername, setPlayerOneUsername] = useState([])
  const [playerTwoUsername, setPlayerTwoUsername] = useState([])
  const [playerThreeUsername, setPlayerThreeUsername] = useState([])
  const [playerFourUsername, setPlayerFourUsername] = useState([])
  const [playerFiveUsername, setPlayerFiveUsername] = useState([])
  const [playerSixUsername, setPlayerSixUsername] = useState([])
  const [playerSevenUsername, setPlayerSevenUsername] = useState([])
  const [playerEightUsername, setPlayerEightUsername] = useState([])
  const [playerNineUsername, setPlayerNineUsername] = useState([])

  const [playerInputFields, setPlayerInputFields] = useState([<li key={0}>Name{0}: <input type="text" value={playerOneUsername} onInput={e => setPlayerOneUsername(e.target.value)}/></li>, <li key={1}>Name{1}: <input type="text" value={playerTwoUsername} onInput={e => setPlayerTwoUsername(e.target.value)}/></li>])
  const [playerDataFromAPI, setPlayerDataFromAPI] = useState([])
  const [numberOfUsernames, setNumberOfUsernames] = useState([2])
  const [usernameErrors, setUsernameErrors] = useState([false, false, false, false, false, false, false, false, false])
  const errorMessage = <label style={{ color: 'red' }}>Player not found</label>

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    const numberOfUsernames = e.target.value
    setNumberOfUsernames(numberOfUsernames)

    let playerList = []
    for(let i = 0; i < numberOfUsernames; i++){
      playerList.push(<li key={i}></li>)
    }
    setPlayerInputFields(playerList)
  }

  function playerInputField(player){
    if(parseInt(player.key) === 0){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerOneUsername} onInput={e => setPlayerOneUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerOneUsername} onInput={e => setPlayerOneUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 1){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerTwoUsername} onInput={e => setPlayerTwoUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerTwoUsername} onInput={e => setPlayerTwoUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 2){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerThreeUsername} onInput={e => setPlayerThreeUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerThreeUsername} onInput={e => setPlayerThreeUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 3){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerFourUsername} onInput={e => setPlayerFourUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerFourUsername} onInput={e => setPlayerFourUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 4){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerFiveUsername} onInput={e => setPlayerFiveUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerFiveUsername} onInput={e => setPlayerFiveUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 5){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerSixUsername} onInput={e => setPlayerSixUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerSixUsername} onInput={e => setPlayerSixUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 6){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerSevenUsername} onInput={e => setPlayerSevenUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerSevenUsername} onInput={e => setPlayerSevenUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 7){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerEightUsername} onInput={e => setPlayerEightUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerEightUsername} onInput={e => setPlayerEightUsername(e.target.value)}/></li>
      }
    }else if(parseInt(player.key) === 8){
      if(usernameErrors[player.key] === true){
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerNineUsername} onInput={e => setPlayerNineUsername(e.target.value)}/> {errorMessage}</li>
      }else{
        return <li key={player.key}>Player {+player.key+1}: <input type="text" value={playerNineUsername} onInput={e => setPlayerNineUsername(e.target.value)}/></li>
      }
    }else{
      return "This broke lul"
    }
  }

  //Should be GET
  const postToAPI = e => {
    setIsLoading(true)
    axios.post('https://osrs-hiscores.herokuapp.com/post', {
      data : createListOfPlayerInputData()
    })
        .then((response) => {
          setIsLoading(false)
          const orderedResponseData = orderResponseData(response.data)
          removeUndefinedResults(orderedResponseData)
        }, (error) => {
          setIsLoading(false)
          alert(error.message);
        });
  }

  function createListOfPlayerInputData(){
    const playerInputData = []
    for(let i = 0; i < numberOfUsernames; i++){
      if(i === 0){
        playerInputData.push(playerOneUsername)
      }else if(i === 1){
        playerInputData.push(playerTwoUsername)
      }else if(i === 2){
        playerInputData.push(playerThreeUsername)
      }else if(i === 3){
        playerInputData.push(playerFourUsername)
      }else if(i === 4){
        playerInputData.push(playerFiveUsername)
      }else if(i === 5){
        playerInputData.push(playerSixUsername)
      }else if(i === 6){
        playerInputData.push(playerSevenUsername)
      }else if(i === 7){
        playerInputData.push(playerEightUsername)
      }else if(i === 8){
        playerInputData.push(playerNineUsername)
      }
    }
    return playerInputData
  }

  function orderResponseData(data){
    const orderedList = []
    for(let i = 0; i < numberOfUsernames; i++){
      if(i === 0){
        orderedList.push(findElementByUsername(data, playerOneUsername))
      }else if(i === 1){
        orderedList.push(findElementByUsername(data, playerTwoUsername))
      }else if(i === 2){
        orderedList.push(findElementByUsername(data, playerThreeUsername))
      }else if(i === 3){
        orderedList.push(findElementByUsername(data, playerFourUsername))
      }else if(i === 4){
        orderedList.push(findElementByUsername(data, playerFiveUsername))
      }else if(i === 5){
        orderedList.push(findElementByUsername(data, playerSixUsername))
      }else if(i === 6){
        orderedList.push(findElementByUsername(data, playerSevenUsername))
      }else if(i === 7){
        orderedList.push(findElementByUsername(data, playerEightUsername))
      }else if(i === 8){
        orderedList.push(findElementByUsername(data, playerNineUsername))
      }
    }
    return orderedList
  }

  function findElementByUsername(data, username){
    if(typeof username !== "string"){
      return data[username]
    }
    return data[formatUsername(username)]
  }

  function formatUsername(username){
    return username.trim().replaceAll(" ", "_")
  }

  function removeUndefinedResults(orderedResponseData){
    const validUsernames = []
    const errorMessages = []
    for(let i = 0; i < numberOfUsernames; i++){
      if(orderedResponseData[i] === undefined){
        errorMessages.push(true)
      }else{
        errorMessages.push(false)
        validUsernames.push(orderedResponseData[i])
      }
    }
    setPlayerDataFromAPI(validUsernames)
    setUsernameErrors(errorMessages)
  }

  function sortAlphabetically(array){
    return array.sort((a, b) => {
      let fa = a.name,
          fb = b.name;

      if(fa === "Overall" || fb === "Attack"){
        return -2
      }
      if (fa < fb && fa !== "Overall" && fb !== "Overall") {
        return -1;
      }
      if (fa > fb && fa !== "Overall" && fb !== "Overall") {
        return 1;
      }
      return 0;
    })
  }

  function isAPIIsBeingCalledText(){
    if (isLoading){
      return <label>Fetching stats</label>
    }
  }

  function isAPIIsBeingCalledGraphic(){
    if (isLoading){
      return <CircularProgress size={15}/>
    }
  }

  //TODO: Top half should be a form?
  return (
      <div>
        <div>
          Number of Players: <input type="number" min={1} max={9} value={numberOfUsernames} onChange={handleChange}/><br/><br/>
          <div>
            {
              playerInputFields.map(function(player)
              {
                return playerInputField(player)
              })
            }
          </div>
          <br/>
          <div><input type="button" value="Get Player Data" onClick={postToAPI}/> {isAPIIsBeingCalledText()} {isAPIIsBeingCalledGraphic()}</div>
          <br/>
        </div>
        <div className='row'>
          <br/>
          {
            playerDataFromAPI.map(function(player)
            {
              const playerSkills =  sortAlphabetically(Object.values(player.skills))
              return(
                  <table className='column'>
                    <thead>
                    <tr>
                      <th/><th>{player.playerName}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th>Skill</th>
                      <th>Level</th>
                      <th>Experience</th>
                    </tr>
                    {
                      playerSkills.map(function(skill){
                        return <tr><td>{skill.name}</td><td>{skill.level}</td><td>{skill.experience}</td></tr>
                      })
                    }
                    </tbody>
                  </table>
              )
            })
          }
        </div>
      </div>
  );
}

export default App