import { AccountStats } from "./AccountStats";

export interface Account {
    name: string;
    email: string;
    age?: string;
    profession?: string;
    stats?: AccountStats
}
