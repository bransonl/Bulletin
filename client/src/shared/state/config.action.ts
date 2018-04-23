import {Action} from "redux";

import {Config, ConfigItem} from "../types/config";

const enum ConfigActionType {
  FetchConfigs = "fetch_configs",
  SaveConfigs = "save_configs",
  FetchSingleConfig = "fetch_single_config",
  SaveSingleConfig = "save_single_config",
}

interface ConfigAction extends Action {
  type: ConfigActionType;
  configName?: string;
  payload?: string | Config | ConfigItem;
}

const fetchConfigs = (): ConfigAction => ({
  type: ConfigActionType.FetchConfigs,
});

const saveConfigs = (payload: Config): ConfigAction => ({
  type: ConfigActionType.SaveConfigs,
  payload,
});

const fetchSingleConfig = (configName: string): ConfigAction => ({
  type: ConfigActionType.FetchSingleConfig,
  payload: configName,
});

const saveSingleConfig = (configName: string, payload: ConfigItem):
ConfigAction => ({
  type: ConfigActionType.SaveSingleConfig,
  configName,
  payload,
});

export {
  ConfigAction, ConfigActionType,
  fetchConfigs, saveConfigs, fetchSingleConfig, saveSingleConfig,
};
