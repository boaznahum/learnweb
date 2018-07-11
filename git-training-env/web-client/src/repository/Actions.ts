
// all const !!!
export enum RepoID {
     LOCAL1,
     LOCAL2,
     REMOTE
}

export enum ActionTypes {
    SET_ID = 'SET_ID',
    SET_CURRENT_REPO = 'SET_CURRENT_REPO'
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
export interface SetCurrentRepoAction {

    type:ActionTypes.SET_CURRENT_REPO
    payload: {
        currentRepo:RepoID;
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
export function setCurrentRepo(curRepo:RepoID){
    return {
        type:ActionTypes.SET_CURRENT_REPO,
        payload:{
            currentRepo:curRepo
        }
    }
}
