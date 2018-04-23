interface PrivacyValuesConfig {
  values: {label: string, value: string}[];
}

type ConfigItem = PrivacyValuesConfig;

type Config = {[name: string]: ConfigItem};

interface WrappedConfig {
  config: Config;
}

export {Config, ConfigItem, PrivacyValuesConfig};
