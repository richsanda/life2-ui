import React, { createContext } from "react";
import { 
    ArtifactCountsRequest, 
    ArtifactCountsResponse, 
    ArtifactSearchRequest, 
    ArtifactSearchResponse,
    Artifact
} from "../models";
import { artifactCounts, artifactSearch } from "../utils/requestTemplates.json";

const countsRequest: ArtifactCountsRequest = artifactCounts;
const searchRequest: ArtifactSearchRequest = artifactSearch;

const artifactContextState: ArtifactContextState = {
    countsRequest: countsRequest,
    countsResponse: [],
    searchRequest: searchRequest,
    searchResponse: [],
    maxBoxCount: 0,
    monthSelected: -1,
    from: [],
    to: []
  };
  
  type ArtifactContextState = {
    countsRequest: ArtifactCountsRequest;
    countsResponse: ArtifactCountsResponse[];
    searchRequest: ArtifactSearchRequest;
    searchResponse: ArtifactSearchResponse[];
    artifact?: Artifact;
    maxBoxCount: number;
    monthSelected: number;
    from: string[];
    to: string[];
  };
  
  type ArtifactContextProps = [ArtifactContextState, React.Dispatch<React.SetStateAction<ArtifactContextState>>];
  
  const defaultValue: ArtifactContextProps = [artifactContextState as ArtifactContextState, () => {}];
  
  const ArtifactContext = createContext<ArtifactContextProps>(defaultValue);
  
  export default ArtifactContext;
