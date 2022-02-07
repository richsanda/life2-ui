import { Email } from "./email";

export interface Artifact {
    types: string[],
    when: string,
    when2: string,
    title: string,
    image: string,
    description: string,
    key: string,
    relative_keys: string[]
    relative_key_index: number
    trove: string
    notes: string[]
    data ?: any
}
  