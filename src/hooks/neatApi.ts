import {
    NeatFile
} from "../models";
import CorrespondenceAPI from "./correspondenceApi";

interface ICorrespondenceAPI {
    getAuthorizationToken: () => Promise<string>;
    listNeatFolders: () => Promise<string[]>;
    readNeatFolder: (folder: string) => Promise<NeatFile[]>;
    readNeatFile: (folder: string, filename: string) => Promise<NeatFile>;
}

class NeatAPI {

    public static listNeatFolders = async () => {
        let response = await NeatAPI.request<string[]>(`neat`);
        return response;
    };

    public static readNeatFolder = async (folder: string) => {
        let response = await NeatAPI.request<NeatFile[]>(`neat/${folder}`);
        return response;
    };

    public static readNeatFile = async (folder: string, filename: string) => {
        let response = await NeatAPI.request<NeatFile>(`neat/${folder}/${filename}`);
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

export default NeatAPI;