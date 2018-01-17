import {ConfigAction, ConfigActionType} from "../actions/config.action";
import {Config, ConfigItem} from "../../types/config";

type ConfigState = Config;

const config = (state: ConfigState = null, action: ConfigAction): ConfigState => {
  switch (action.type) {
    case ConfigActionType.SAVE_CONFIGS:
      return action.payload as Config;
    case ConfigActionType.SAVE_SINGLE_CONFIG:
      return {...state, [action.configName]: action.payload} as Config;
    default:
      return state;
  }
};

export {ConfigState};
export default config;
