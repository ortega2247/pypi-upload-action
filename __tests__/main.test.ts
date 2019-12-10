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
import { loadConfig } from '../src/load_config'
import * as core from '@actions/core'

const testEnvVars = {
  'INPUT_USER': '__token__',
  'INPUT_PASSWORD': 'abcdefg',
  'INPUT_REPOSITORY_URL': 'https://test.pypi.org/legacy/',
  'INPUT_PACKAGES_DIR': 'dist'
}

describe('Reading of the config', () => {
  beforeEach(() => {
    for (const key in testEnvVars) {
      process.env[key] = testEnvVars[key as keyof typeof testEnvVars]
    }

    process.stdout.write = jest.fn()
  })

  afterEach(() => {
    for (const key in testEnvVars) Reflect.deleteProperty(testEnvVars, key)
  })

  it('test config values', () => {
    const config = loadConfig()
    expect(config.user).toEqual('__token__')
    expect(config.password).toEqual('abcdefg')
    expect(config.repositoryUrl).toEqual('https://test.pypi.org/legacy/')
    expect(config.packagesDir).toEqual('dist')
  })
})