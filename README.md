# GitHub Action to release a python package to PyPI
This action uploads [python distribution packages](https://packaging.python.org/tutorials/packaging-projects/)
located in the `dist/` directory to PyPI.

## Usage
Upload packages to PyPI
```yml
- name: Publish a Python distribution to PyPI
  uses: ortega2247/pypi-upload-action@master
  with:
    user: __token__
    password: ${{ secrets.pypi_password }}
```
To upload packages to TestPyPI
```yml
- name: Publish a Python distribution to PyPI
  uses: ortega2247/pypi-upload-action@master
  with:
    user: __token__
    password: ${{ secrets.test_pypi_password }}
    repository_url: https://test.pypi.org/legacy/
```
If python distribution packages are located in a directory other than dist
```yml
- name: Publish a Python distribution to PyPI
  uses: ortega2247/pypi-upload-action@master
  with:
    user: __token__
    password: ${{ secrets.test_pypi_password }}
    repository_url: https://test.pypi.org/legacy/
    packages_dir: my_directory
```
Limit releases to tagged pushes
```yml
- name: Publish a Python distribution to PyPI
  if: startsWith(github.ref, 'refs/tags/')
  uses: ortega2247/pypi-upload-action@master
  with:
    user: __token__
    password: ${{ secrets.test_pypi_password }}
    repository_url: https://test.pypi.org/legacy/
    packages_dir: my_directory
```

To use this action you need to get an [API token](https://pypi.org/help/#apitoken) 
from PyPI. Then, use this token to create a [GitHub secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
