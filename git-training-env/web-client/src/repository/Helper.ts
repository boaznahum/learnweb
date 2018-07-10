import {RepoID} from "./Actions";

class Helper {

    public static serverRepoID(repoID:RepoID):string {
        switch (repoID) {
            case RepoID.LOCAL1:
                return "local1";
            case RepoID.LOCAL2:
                return "local2";
            case RepoID.REMOTE:
                return "remote";

            default:
                return "unknown;"
        }
    }

}

export default Helper;