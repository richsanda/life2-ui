import {
  ArtifactCountsRequest,
  ArtifactCountsResponse,
  ArtifactSearchRequest,
  ArtifactSearchResponse,
  ArtifactReadResponse
} from "../models";

interface ICorrespondenceAPI {
  getAuthorizationToken: () => Promise<string>;
  artifactCounts: (body: ArtifactCountsRequest) => Promise<ArtifactCountsResponse>;
  artifactSearch: (body: ArtifactSearchRequest) => Promise<ArtifactSearchResponse>;
  artifactRead: (trove: string, key: string) => Promise<ArtifactReadResponse>;
}

class CorrespondenceAPI {
  public static getAuthorizationToken = () => {
    /* let response = await axios.post<AuthResponse>('https://api.tsts.havail.sabre.com/v2/auth/token', 'grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic VmpFNldEQkVXRVV5VTBjNldEQTZXREE9OlJGaEZNbE5IV0RBPQ==',
                'Accept': '',
                'Content-Type': 'application/x-www-form-urlencoded',
                'ttl_seconds': '3600'
            },
        }) */
    return "cmljaDp5YWhkdWRlNDc0Nw==";
  }

  public static artifactCounts = async (body: ArtifactCountsRequest) => {
    let response = await CorrespondenceAPI.request<ArtifactCountsResponse, ArtifactCountsRequest>(
      "artifact/counts",
      "post",
      body
    );
    return response;
  };

  public static artifactSearch = async (body: ArtifactSearchRequest) => {
    let response = await CorrespondenceAPI.request<ArtifactSearchResponse, ArtifactSearchRequest>(
      "/artifacts",
      "post",
      body
    );
    return response;
  };

  public static artifactRead = async (trove: string, key: string) => {
    let response = await CorrespondenceAPI.request<ArtifactReadResponse>(`/artifact/rich.s/${trove}/${key}`);
    return response;
  };

  private static request = async <T, B = void>(
    url: string,
    method = "get",
    body: B | undefined = undefined,
    headers = {}
  ): Promise<T> => {
    const res = await fetch(url, {
      method: method.toUpperCase(),
      body: typeof body === "object" ? JSON.stringify(body) : undefined,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${sessionStorage.getItem("token")}`
      },
    });
    let data = await res.json();
    return data;
  };
}

export default CorrespondenceAPI;