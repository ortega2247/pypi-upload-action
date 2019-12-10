/*
 * Copyright (C) 2019 Sebastian Weigand
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modifications copyright (C) 2019 Oscar Ortega
 */
import * as exec from '@actions/exec'

import {ConfigObject} from './load_config'

/**
 * Uploads package to PyPi.
 *
 * @param config Configuration of the action
 */
export const pypiUpload = async (config: ConfigObject): Promise<void> => {
  await installTwine()
  await uploadToPypi(config)
}

const installTwine = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('Installing twine')
  await exec.exec('python', ['-m', 'pip', 'install', 'twine'])
}

/**
 * Installs a the python version specified in inputs.
 *
 * @param config Configuration of the action
 */
const uploadToPypi = async (config: ConfigObject): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('Uploading to PyPi')
  const user = config.user
  const password = config.password
  const repositoryUrl = config.repositoryUrl
  const packagesDir = config.packagesDir
  await exec.exec('python', [
    '-m',
    'twine',
    'upload',
    '-u',
    user,
    '-p',
    password,
    '--repository-url',
    repositoryUrl,
    `${packagesDir}/*`
  ])
}
