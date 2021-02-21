import React, { createContext } from "react";
import { ArtifactCountsRequest } from "../models/artifactCountsRequest";
import { artifactSearch } from "../utils/requestTemplates.json";

const countRequest: ArtifactCountsRequest = artifactSearch;

type ArtifactCountsContextProps = [ArtifactCountsRequest, React.Dispatch<React.SetStateAction<ArtifactCountsRequest>>];

const defaultValue: ArtifactCountsContextProps = [countRequest as ArtifactCountsRequest, () => {}];

const CorrespondenceSearchContext = createContext<ArtifactCountsContextProps>(defaultValue);

export default CorrespondenceSearchContext;
