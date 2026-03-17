export type CompetitionInfo = {
  id: number;
  competition_type: string;
  start_date: string;
  end_date: string;
  title: string;
  description: string;
  joinText: string;
};

export type CompetitionUser = {
  id: number;
  user_id: number;
  name: string;
  amount: number;
  position: string;
  color: string;
  price: number;
};

export type MyPlace = {
  id: number;
  user_id: number;
  position: string;
  amount: number;
};

export type Competition = {
  competition_info: CompetitionInfo;
  top_users: CompetitionUser[];
  my_place: MyPlace;
};

export type CompetitionHistoryItem = {
  competition_info: CompetitionInfo;
  my_place: {
    id: number;
    userId: number;
    competitionId: number;
    amount: number;
    finalOrder: number;
    registeredInCompetition: string;
  };
  top_three: CompetitionUser[];
};

export type UserCompetitionStats = {
  totalCompetitions: number;
  totalWon: number;
  bestPosition: number;
  topThreePositions: number;
};
