var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}

// YOUR CODE HERE
var teamNames = [];
var teams = [];

var createTeamNames =  function() {
  for(var i = 0; i < gameInfo().length; i++){
    if (teamNames.indexOf(gameInfo()[i].home_team) == -1) {
      teamNames.push(gameInfo()[i].home_team);
    }
    if (teamNames.indexOf(gameInfo()[i].away_team) == -1) {
      teamNames.push(gameInfo()[i].away_team);
    }
  }
  return teamNames;
}

function createTeam(name,wins,losses,rank){
  var rankScore = wins - losses
  var team = {name: name,
              rank: null,
              wins: wins,
              losses: losses,
              score: rankScore
  }
  return team
}

function loadTeams(){
  for(var i = 0; i < teamNames.length; i++){
    teams.push(createTeam(teamNames[i],findWins(teamNames[i]),findLosses(teamNames[i])))
  }
  for(var i = 0; i < teamNames.length; i++){
    teams[i].rank = Rankings(teams[i].name)
  }
  return teams;
}

function findWins(teamName) {
  var wins = 0;
  for (var i = 0; i < gameInfo().length; i++) {
    if (gameInfo()[i].home_team == teamName) {
      if (gameInfo()[i].home_score > gameInfo()[i].away_score) {
        wins++;
      }
    }
    if (gameInfo()[i].away_team == teamName) {
      if (gameInfo()[i].away_score > gameInfo()[i].home_score) {
        wins++;
      }
    }
  }
  return wins;
}

function findLosses(teamName) {
  var losses = 0;
  for (var i = 0; i < gameInfo().length; i++) {
    if (gameInfo()[i].home_team == teamName) {
      if (gameInfo()[i].home_score < gameInfo()[i].away_score) {
        losses++;
      }
    }
    if (gameInfo()[i].away_team == teamName) {
      if (gameInfo()[i].away_score < gameInfo()[i].home_score) {
        losses++;
      }
    }
  }
  return losses;
}

function Rankings(teamName) {
  var ranking = teams.length;
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].name == teamName) {
      var index = i
    }
  }
  for (var i = 0; i < teams.length; i++) {
    if (teams[index].score > teams[i].score) {
      ranking--
    }
  }
  return ranking
}

function output(){
  output = "--------------------------------------------------\n| Name      Rank      Total Wins    Total Losses |\n"
  for(var i = 0; i < teamNames.length; i++){
    line = "| " + teams[i].name
    while (line.length < 12){
      line += " "
    }
    output += line + teams[i].rank + "         " + teams[i].wins + "             " + teams[i].losses + "            |\n"
  }
  output += "--------------------------------------------------"
  return output
}

createTeamNames(teamNames);
loadTeams();
console.log(output())
