import React from "react";
import { gql, useQuery } from "@apollo/client";

import Card from "./Card";

const STARSHIPS = gql`
  query GetAllStarships {
    allStarships {
      starships {
        id
        name
        starshipClass
        costInCredits
        passengers
        maxAtmospheringSpeed
        filmConnection {
          totalCount
        }
      }
    }
  }
`;

interface Starships {
  id: number;
  name: string;
  starshipClass: string;
  costInCredits: number;
  passengers: string;
  maxAtmospheringSpeed: number;
  filmConnection: {
    totalCount: number;
  };
}
interface StarshipsData {
  allStarships: {
    starships: Starships[];
  };
}

const Game = () => {
  const { loading, error, data } = useQuery<StarshipsData>(STARSHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const starship = data?.allStarships?.starships[0];

  return (
    <>
      {starship && (
        <Card
          title={starship.name}
          subtitle={`Starship Class: ${starship.starshipClass}`}
        />
      )}
      <pre></pre>
    </>
  );
};

export default Game;
