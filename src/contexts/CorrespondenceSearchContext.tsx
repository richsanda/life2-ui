import React, { createContext } from "react";
import { SearchRequest } from "../models/searchRequest";
import { w } from "../utils/requestTemplates.json";

const searchRequest: SearchRequest = w;

type SearchQueryContextProps = [SearchRequest, React.Dispatch<React.SetStateAction<SearchRequest>>];

const defaultValue: SearchQueryContextProps = [searchRequest as SearchRequest, () => {}];

const CorrespondenceSearchContext = createContext<SearchQueryContextProps>(defaultValue);

export default CorrespondenceSearchContext;
