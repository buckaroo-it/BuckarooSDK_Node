import { IConfig, ICredentials } from './Utils/Types'
import dotenv from 'dotenv'
import path from "path";
dotenv.config({ path: path.resolve(__dirname, '../.env') })

let _credentials: ICredentials

let _config: IConfig


let defaultSetup = () => {
    let credentials = (credentials) =>  {
        _credentials = {
            websiteKey: credentials?.websiteKey || _credentials?.websiteKey || process.env.BPE_WEBSITE_KEY || 'KEY',
            secretKey: credentials?.secretKey || _credentials?.secretKey || process.env.BPE_SECRET_KEY || 'SECRET'
        }
    }
    let config = (config) => {
        _config = {
            mode: config?.mode || _config?.mode || process.env.BPE_MODE === 'live' ? "live" : 'test',
            currency: config?.currency || _config?.currency || process.env.BPE_CURRENCY_CODE || 'EUR',
            returnURL: config?.returnURL || _config?.returnURL || process.env.BPE_RETURN_URL || '',
            returnURLCancel: config?.returnURLCancel || _config?.returnURLCancel || process.env.BPE_RETURN_URL_CANCEL || '',
            pushURL: config?.pushURL || _config?.pushURL || process.env.BPE_PUSH_URL || ''
        }
    }
    return {
        credentials,
        config
    }
}

export const initializeBuckarooClient = (credentials?: ICredentials, config?: IConfig) => {
    defaultSetup().credentials(credentials)
    defaultSetup().config(config)
    return {
        _credentials,
        _config,
    }
}

export const buckarooClient = () => {
    const getCredentials = (): ICredentials => {
        return _credentials
    }
    const getConfig = (): IConfig => {
        return _config
    }

    return {
        getCredentials,
        getConfig,
    }
}