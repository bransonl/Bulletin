import {ConfigAction, ConfigActionType} from "./config.action";
import {Config, ConfigItem} from "../types/config";

type ConfigState = Config;

const config = (
  state: ConfigState = null,
  action: ConfigAction,
): ConfigState => {
  switch (action.type) {
    case ConfigActionType.SaveConfigs:
      return action.payload as Config;
    case ConfigActionType.SaveSingleConfig:
      return {...state, [action.configName]: action.payload} as Config;
    default:
      return state;
  }
};

export {ConfigState};
export default config;