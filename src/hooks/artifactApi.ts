import {
  Artifact, NeatFile, Note, Person,
  ArtifactCountsRequest, ArtifactCountsResponse,
  ArtifactSearchRequest, ArtifactSearchResponse, Trove
} from "../models";

class ArtifactAPI {

  public static artifactCounts = async (body: ArtifactCountsRequest) => {
    let response = await ArtifactAPI.request<ArtifactCountsResponse[], ArtifactCountsRequest>(
      "artifacts/counts",
      "post",
      body
    );
    return response;
  };

  public static artifactSearch = async (body: ArtifactSearchRequest) => {
    let response = await ArtifactAPI.request<ArtifactSearchResponse[], ArtifactSearchRequest>(
      "/artifacts",
      "post",
      body
    );
    return response;
  };

  public static artifactRead = async (trove: string, key: string, relatives: boolean) => {
    let response = await ArtifactAPI.request<Artifact>(`/artifact/rich.s/${trove}/${key}?relatives=${relatives}`);
    return response;
  };

  public static listNeatFolders = async () => {
    let response = await ArtifactAPI.request<string[]>(`neat`);
    return response;
  };

  public static readNeatFolder = async (folder: string) => {
    let response = await ArtifactAPI.request<NeatFile[]>(`neat/${folder}`);
    return response;
  };

  public static readNeatFile = async (folder: string, filename: string) => {
    let response = await ArtifactAPI.request<NeatFile>(`neat/${folder}/${filename}`);
    return response;
  };

  public static readNote = async (folder: string, filename: string) => {
    let response = await ArtifactAPI.request<Note | undefined>(`note/${folder}/${filename}`);
    return response;
  };

  public static updateNote = async (trove: string, filename: string, body: Note) => {
    let response = await ArtifactAPI.request<Note, Note>(
      `note/${trove}/${filename}`,
      "post",
      body
    );
    return response;
  };

  public static persons = async () => {
    let response = await ArtifactAPI.request<Person[]>(`persons`);
    return response;
  };

  public static troves = async () => {
    let response = await ArtifactAPI.request<Trove[]>(`troves`);
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
    let text = await res.text();
    return text.length > 0 ? JSON.parse(text) : null;
  };
}

export default ArtifactAPI;