export interface UserInterface{
    id?: string;
    name?: string;
    email?: string,
    password?: string;
    nickname?: string;
}

export interface IDonor {
    wus: number;
    name: string;
    prev_rank: number;
    rank: number;
    credit: number;
    team: number;
    id: number;
}

export interface ITeam{
    wus: number;
    credit_cert: string;
    name: string;
    rank: number;
    credit: number;
    team: number;
    wus_cert: string;
}