// 引入yaml解析模块
import * as yaml from 'js-yaml';
import {join} from 'path';
import {readFileSync} from 'fs';
import * as _ from 'lodash';

const YAML_CONFIG_COMMON_FILENAME = 'config.yaml';
const YAML_CONFIG_ENV_FILENAME = `config.${process.env.NODE_ENV || 'development'}.yaml`;
const filePath = join(__dirname, '../config', YAML_CONFIG_COMMON_FILENAME);
const envPath = join(__dirname, '../config', YAML_CONFIG_ENV_FILENAME);

const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

// 实际上，就是为了forRoot({})中load配置；forRoot({load:选项是一个函数})
export default () => {
    // 类比.env中，dotenv.config()
    // 使用lodash库，合并两个对象；相同key属性值，后面的覆盖前面的
    return _.merge(commonConfig, envConfig);
};
