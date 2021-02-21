import React, { createContext } from "react";
import { 
    ArtifactCountsRequest, 
    ArtifactCountsResponse, 
    ArtifactSearchRequest, 
    ArtifactSearchResponse 
} from "../models";
import { artifactCounts, artifactSearch } from "../utils/requestTemplates.json";

const countsRequest: ArtifactCountsRequest = artifactCounts;
const searchRequest: ArtifactSearchRequest = artifactSearch;

const artifactContextState: ArtifactContextState = {
    countsRequest: countsRequest,
    searchRequest: searchRequest
  };
  
  type ArtifactContextState = {
    countsRequest: ArtifactCountsRequest;
    countsResponse?: ArtifactCountsResponse;
    searchRequest: ArtifactSearchRequest;
    searchResponse?: ArtifactSearchResponse;
  };
  
  type ArtifactContextProps = [ArtifactContextState, React.Dispatch<React.SetStateAction<ArtifactContextState>>];
  
  const defaultValue: ArtifactContextProps = [artifactContextState as ArtifactContextState, () => {}];
  
  const ArtifactContext = createContext<ArtifactContextProps>(defaultValue);
  
  export default ArtifactContext;
