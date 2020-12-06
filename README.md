# geojson-lint-action

![Run tests](https://github.com/chris48s/geojson-lint-action/workflows/Run%20tests/badge.svg?branch=main)

Run [@mapbox/geojsonhint](https://www.npmjs.com/package/@mapbox/geojsonhint) on geojson files in pull requests

```yaml
name: Geojson Lint
on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Lint
        uses: chris48s/geojson-lint-action@0.1.0
        with:
          github-token: '${{ secrets.GITHUB_TOKEN }}'
```
