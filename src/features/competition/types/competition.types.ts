export type CompetitionInfo = {
  id: number;
  competitionType: string;
  startDate: number; // unix seconds
  endDate: number; // unix seconds
  title: string;
  description: string;
  joinText: string;
};

export type CompetitionUser = {
  userId: number;
  name: string;
  amount: number;
  position: number;
  color: string;
  price: number;
};

export type MyPlace = {
  userId: number;
  position: number | null;
  amount: number;
  finalOrder: number;
};

export type Competition = {
  competitionInfo: CompetitionInfo;
  topUsers: CompetitionUser[];
  myPlace: MyPlace | null;
  hasEnded: boolean;
};

export type CompetitionHistoryItem = {
  competitionInfo: CompetitionInfo;
  myPlace: MyPlace | null;
  topThree: CompetitionUser[];
  hasEnded: boolean;
};

export type UserCompetitionStats = {
  totalCompetitions: number;
  totalWon: number;
  bestPosition: number;
  topThreeCount: number;
};
