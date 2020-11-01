# geojson-lint-action

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
        uses: chris48s/geojson-lint-action@master
        with:
          github-token: '${{ secrets.GITHUB_TOKEN }}'
```
