import * as exec from '@actions/exec'

import { ConfigObject } from './load_config'

/**
 * Uploads package to PyPi.
 *
 * @param config Configuration of the action
 */
export const pypi_upload = async (config: ConfigObject): Promise<void> => {
  await install_twine()
  await upload_to_pypi(config)
}

const install_twine = async (): Promise<void> => {
    console.log('Installing twine')
    await exec.exec('python', ['-m', 'pip', 'install', 'twine'])
}

/**
 * Installs a the python version specified in inputs.
 *
 * @param config Configuration of the action
 */
const upload_to_pypi = async(config: ConfigObject): Promise<void> => {
    console.log('Uploading to PyPi')
    const user = config.user
    const password = config.password
    const repositoryUrl = config.repository_url
    const packagesDir = config.packages_dir
    await exec.exec('python', ['-m', 'twine', 'upload', '-u', user, '-p', password,
        '--repository-url', repositoryUrl, `${packagesDir}/*`])
}
