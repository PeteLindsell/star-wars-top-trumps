import { gql } from "@apollo/client";

export const STARSHIPS = gql`
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
