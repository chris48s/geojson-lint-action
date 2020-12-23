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
        uses: chris48s/geojson-lint-action@0.2.0
        with:
          github-token: '${{ secrets.GITHUB_TOKEN }}' # required

          # geojsonhint config: https://www.npmjs.com/package/@mapbox/geojsonhint#api
          no-duplicate-members: 'false'  # optional, default=true
          precision-warning: 'true'  # optional, default=false
```
