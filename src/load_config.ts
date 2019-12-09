import * as core from '@actions/core'

export interface ConfigObject {
  user: string
  password: string
  repository_url: string
  packages_dir: string
}

/**
 * Read the values of the inputs and operating system.
 */
export const loadConfig = (): ConfigObject => {
  const user = core.getInput('user')
  const password = core.getInput('password')
  const repository_url = core.getInput('repository_url')
  const packages_dir = core.getInput('packages_dir')
  return {
    user,
    password,
    repository_url,
    packages_dir,
  }
}