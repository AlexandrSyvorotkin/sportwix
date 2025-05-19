import { Middleware } from 'redux';
import { switchPageToStartPostition } from './tournament-slice/tournament-slice';
import { onSwitchActiveTeamTab } from './InterfaceSlice/InterfaceSlice';

export const tournamentMiddleware: Middleware = (store) => (next) => (action: any) => {
    if (action.type === switchPageToStartPostition.type) {
        store.dispatch(onSwitchActiveTeamTab('news'));
    }
    return next(action);
}; 