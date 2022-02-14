import { NeatFile } from ".";

export interface Note {
    key?: string;
    trove: string;
    text: string;
    notes: string[];
    data?: any;
}