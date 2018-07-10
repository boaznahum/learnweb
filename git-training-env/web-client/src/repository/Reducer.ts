import {Action} from "redux";
import {ActionTypes, isRepositoryAction, RepoID, SetImageIDAction} from "./Actions";

export interface IRepositoryProps {
    name: string;
    repoID: RepoID;

    // will be passed automatically because the way we use connect
    // https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    // https://github.com/jaysoo/todomvc-redux-react-typescript/blob/master/client/main/components/App.tsx


}



export interface IRepositoryState {
    image: string;
    imageRefreshID: string;
}

export type  RepositoriesState = IRepositoryState[];



const initial: IRepositoryState = {
    image: "",
    imageRefreshID: ""
};

export const repositoriesInitial:RepositoriesState = [initial, initial, initial];

/**
 * Only the state of this reducer is passed here !!!
 * How does it know ? becuase in supply the name of the state in combineReducers
 * @param state
 * @param action
 */
function repositoryReducer(state: IRepositoryState = initial, action: Action) : IRepositoryState {

    switch (action.type) {

        case ActionTypes.SET_ID:

            const myAction:SetImageIDAction = action as SetImageIDAction;

            return {...state, imageRefreshID: myAction.payload.newID}


    }

    return state;

}

export function repositoriesReducer(state:RepositoriesState = repositoriesInitial  , action: Action) {

    if ( isRepositoryAction(action)) {

        let repoState:IRepositoryState = state[action.repoID];

        repoState = repositoryReducer(repoState, action);

        state = [ ... state  ];

        state[action.repoID] = repoState;

        return state;

    } else {
        return state;
    }

}
