import {Action} from "redux";

import {Config, ConfigItem} from "../../types/config";

const enum ConfigActionType {
  FETCH_CONFIGS = "fetch_configs",
  SAVE_CONFIGS = "save_configs",
  FETCH_SINGLE_CONFIG = "fetch_single_config",
  SAVE_SINGLE_CONFIG = "save_single_config",
}

interface ConfigAction extends Action {
  type: ConfigActionType;
  configName?: string;
  payload?: string | Config | ConfigItem;
}

const fetchConfigs = (): ConfigAction => ({
  type: ConfigActionType.FETCH_CONFIGS,
});

const saveConfigs = (payload: Config): ConfigAction => ({
  type: ConfigActionType.SAVE_CONFIGS,
  payload,
});

const fetchSingleConfig = (configName: string): ConfigAction => ({
  type: ConfigActionType.FETCH_SINGLE_CONFIG,
  payload: configName,
});

const saveSingleConfig = (configName: string, payload: ConfigItem): ConfigAction => ({
  type: ConfigActionType.SAVE_SINGLE_CONFIG,
  configName,
  payload,
});

export {
  ConfigAction, ConfigActionType,
  fetchConfigs, saveConfigs, fetchSingleConfig, saveSingleConfig,
};
