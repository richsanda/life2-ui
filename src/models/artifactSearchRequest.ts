export interface ArtifactSearchRequest {
    owner: string;
    after: string;
    before: string;
    from?: string[];
    to?: string[];
}
  