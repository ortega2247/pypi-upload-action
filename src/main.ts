import * as core from '@actions/core'
import { loadConfig } from './load_config'
import { pypi_upload } from './conda_actions'

async function run(): Promise<void> {
  try {
    const config = loadConfig()
    await pypi_upload(config)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
