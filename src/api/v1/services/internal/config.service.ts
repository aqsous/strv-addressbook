import { IConfig, ConfigModel } from '../../models/config.model';

export const get = async () => {
  const config = await ConfigModel.findOne({ deletedAt: { $exists: false } })
    .sort('-createdAt');
  if (config) {
    return config;
  }
  const newConfig = await ConfigModel.create({
    supportEmail: '',
  });
  return newConfig;
};

export const update = async (configData: IConfig) => {
  const oldConfig = await ConfigModel.findOne({ deletedAt: { $exists: false } })
    .sort('-createdAt');
  if (oldConfig) {
    const config = Object.assign(oldConfig, configData);
    await config.save();
    return config;
  }
  const newConfig = await ConfigModel.create(configData);
  return newConfig;
};
