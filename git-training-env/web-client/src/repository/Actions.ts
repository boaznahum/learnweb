
// all const !!!
export enum RepoID {
     LOCAL1,
     LOCAL2,
     REMOTE
}

export enum ActionTypes {
    SET_ID = 'SET_ID'
}

export interface RepositoryAction {
    type:ActionTypes.SET_ID,
    repoID:RepoID
}

export function isRepositoryAction(object: any): object is RepositoryAction {
    return 'repoID' in object;
}

export interface SetImageIDAction extends RepositoryAction {


    payload: {
        newID:string;
    }

}


export function setImageID(repoID:RepoID, imageID:string) : SetImageIDAction {
    return {
        type:ActionTypes.SET_ID,
        repoID,
        payload:{
            newID:imageID
        }
    }
}

