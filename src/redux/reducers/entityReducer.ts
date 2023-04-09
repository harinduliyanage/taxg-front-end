import {
	SAVE_INDUSTRIES
} from "../../actions/types";
import { Entity } from "../../interfaces/reducers/Entity";

const _state: Entity = {
	industries : {}
};

const MasterData = (state = _state, action: any) => {
	switch (action.type) {
		case SAVE_INDUSTRIES:
			return {
				...state,
				industries : action.payload
			};

		default:
			return state;
	}
};

export default MasterData;
