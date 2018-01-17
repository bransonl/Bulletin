interface PrivacyValuesConfig {
  values: string[];
}

type ConfigItem = PrivacyValuesConfig;

type Config = {[name: string]: ConfigItem};

interface WrappedConfig {
  config: Config;
}

export {Config, ConfigItem, PrivacyValuesConfig};
