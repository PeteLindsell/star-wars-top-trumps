import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { STARSHIPS } from "./../queries";
import Card from "./Card";
import Button from "./Button";
import Grid from "./Grid";
import Box from "./Box";

interface StarshipsData {
  allStarships: {
    starships: Starship[];
  };
}

interface Starship {
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

interface FlatStarship extends Omit<Starship, "filmConnection"> {
  filmsFeaturedIn: number;
}

type Category =
  | "costInCredits"
  | "passengers"
  | "maxAtmospheringSpeed"
  | "filmsFeaturedIn";

const Game = () => {
  const [playerDeck, setPlayerDeck] = useState<FlatStarship[]>([]);
  const [computerDeck, setComputerDeck] = useState<FlatStarship[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);
  const [score, setScore] = useState(0);
  const [outcome, setOutcome] = useState("");

  const { loading, error, data } = useQuery<StarshipsData>(STARSHIPS);

  useEffect(() => {
    // TODO improve shuffle algorithm
    if (data?.allStarships?.starships?.length) {
      const flattenedStarships = data.allStarships.starships.map(
        (item) =>
          ({
            ...item,
            filmsFeaturedIn: item.filmConnection.totalCount,
          } as unknown as FlatStarship)
      );
      const shuffledStarships = flattenedStarships.sort((a, b) =>
        Math.random() > 0.5 ? 1 : -1
      );
      // If we have an odd number remove one before splitting
      if (shuffledStarships.length % 2) {
        shuffledStarships.shift();
      }
      const half = shuffledStarships.length / 2;

      setPlayerDeck(shuffledStarships.splice(0, half));
      setComputerDeck(shuffledStarships.splice(-half));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">Sorry something went wrong</p>;

  const handelClick = (category: Category) => {
    setSelectedCategory(category);
    if (playerDeck[0][category] > computerDeck[0][category]) {
      setScore((score) => score + 1);
      setOutcome("You win");
    } else if (playerDeck[0][category] < computerDeck[0][category]) {
      setScore((score) => score - 1);
      setOutcome("You loose");
    } else {
      setOutcome("It was a draw");
    }
    setTimeout(() => {
      setPlayerDeck((playerDeck) => [...playerDeck.slice(1)]);
      setPlayerDeck((computerDeck) => [...computerDeck.slice(1)]);
      setOutcome("");
      setSelectedCategory(null);
    }, 2000);
  };

  return (
    <>
      <Grid>
        {playerDeck.length && (
          <Card
            title={playerDeck[0].name}
            subtitle={`Starship Class: ${playerDeck[0].starshipClass}`}
          >
            <Button onClick={() => handelClick("costInCredits")}>
              Max Atmosphering Speed: {playerDeck[0].maxAtmospheringSpeed}
            </Button>
            <Button onClick={() => handelClick("passengers")}>
              Cost in credits: {playerDeck[0].costInCredits}
            </Button>
            <Button onClick={() => handelClick("maxAtmospheringSpeed")}>
              Number of passengers: {playerDeck[0].passengers}
            </Button>
            <Button onClick={() => handelClick("filmsFeaturedIn")}>
              Films featured in: {playerDeck[0].filmsFeaturedIn}
            </Button>
          </Card>
        )}
        {selectedCategory ? (
          <Card
            title={computerDeck[0].name}
            subtitle={`Starship Class: ${computerDeck[0].starshipClass}`}
          >
            <Box highlighted={selectedCategory === "costInCredits"}>
              Max Atmosphering Speed: {computerDeck[0].maxAtmospheringSpeed}
            </Box>
            <Box highlighted={selectedCategory === "passengers"}>
              Cost in credits: {computerDeck[0].costInCredits}
            </Box>
            <Box highlighted={selectedCategory === "maxAtmospheringSpeed"}>
              Number of passengers: {computerDeck[0].passengers}
            </Box>
            <Box highlighted={selectedCategory === "filmsFeaturedIn"}>
              Films featured in: {computerDeck[0].filmsFeaturedIn}
            </Box>
          </Card>
        ) : (
          <Card title="?" subtitle=""></Card>
        )}
      </Grid>
      {<Box>Your score: {score}</Box>}
      {outcome && <Box role="alert">{outcome}</Box>}
    </>
  );
};

export default Game;
