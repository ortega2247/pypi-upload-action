import * as core from '@actions/core'
import {loadConfig} from './load_config'
import {pypiUpload} from './conda_actions'

async function run(): Promise<void> {
  try {
    const config = loadConfig()
    await pypiUpload(config)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
