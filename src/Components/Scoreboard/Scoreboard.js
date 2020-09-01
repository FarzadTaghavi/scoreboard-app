import React, { useState } from "react";
import Player from "../Player/Player";
import "./Scoreboard.scss";
import AddPlayerForm from "../AddPlayerForm";

function compare_score(player_a, player_b) {
  return player_b.score - player_a.score;
}

function compare_name(player_a, player_b) {
  return player_a.name.localeCompare(player_b.name);
}

export default function Scoreboard() {
  const [sort_by, set_sort_by] = useState("score"); // either "score" or "name"
  const [players, set_players] = useState([
    { id: 1, name: "Violeta", score: 11 },
    { id: 2, name: "Eszter", score: 14 },
    { id: 3, name: "Jeroen v2", score: 4 },
    { id: 4, name: "Lisa", score: 42 },
  ]);

  const players_score_sorted =
    // first "copy" the array
    [...players];
  // then sort it with the `compare_score` callback function
  players.sort(compare_score);

  const players_name_sorted =
    // first "copy" the array
    [...players];
  // then sort it with the `compare_score` callback function
  players.sort(compare_name);

  const change_sorting = (event) => {
    set_sort_by(event.target.value);
  };

  let sortedPlayers = "";

  if (sort_by === "score") {
    sortedPlayers = [...players].sort(compare_score);
  } else {
    sortedPlayers = [...players].sort(compare_name);
  }

  const incrementScore = (id) => {
    const new_players_array = players.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          score: player.score + 1,
        };
      } else {
        return player;
      }
    });
    set_players(new_players_array);
  };

  const resetScore = () => {
    const new_players_array = players.map((player) => {
      if (players) {
        return {
          ...player,
          score: player.score - player.score,
        };
      } else {
        return player;
      }
    });
    set_players(new_players_array);
  };

  const randomizeScore = () => {
    const new_players_array = players.map((player) => {
      if (players) {
        return {
          ...player,
          score: Math.round(Math.random() * 100),
        };
      } else {
        return player;
      }
    });
    set_players(new_players_array);
  };

  const addPlayer = (name) => {
    console.log("Let's add a new player with the name:", name);
    const new_player = { id: players.length + 1, name: name, score: 0 };
    console.log("this is the new player", new_player);
    const new_player_added_arr = [...players, new_player];
    console.log(new_player_added_arr);
    set_players(new_player_added_arr);
    /* TODO */
  };

  return (
    <div className="Scoreboard">
      <h1>Scoreboard</h1>
      <p>
        Sort order:{" "}
        <select onChange={change_sorting} value={sort_by}>
          <option value="score">Sort by score</option>
          <option value="name">Sort by name</option>
        </select>
        <button onClick={resetScore}>Reset</button>
        <button onClick={randomizeScore}>Randomize Score</button>
      </p>
      <p>Player's scores:</p>
      {sortedPlayers.map((player) => (
        <div>
          <ul>
            <Player
              id={player.id}
              name={player.name}
              score={player.score}
              incrementScore={incrementScore}
            />
          </ul>
        </div>
      ))}
      <AddPlayerForm addPlayer={addPlayer} />
    </div>
  );
}
