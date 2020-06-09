export interface UserInterface{
    id?: string;
    name?: string;
    email?: string,
    password?: string;
    nickname?: string;
}

export interface IDonor {
    wus: number;
    wus_cert: string;
    name: string;
    prev_rank: number;
    total_users: number;
    rank: number;
    credit: number;
    credit_cert: string;
    team: number;
    id: number;
    active_50: number;
    active_7: number;
    path: string;
    last: string;
    teams: Array<ITeam>;
}

export interface ITeam{
    wus: number;
    credit_cert: string;
    name: string;
    rank: number;
    credit: number;
    team: number;
    wus_cert: string;
    donors: Array<IDonor>;
    total_teams: number;
    active_50: number;
    active_7: number;
    logo: string;
    fast_team_url: string;
    last: string;
    path: string;

}
export interface Comments{
    id: string;
    username: string;
    comment: string;
}