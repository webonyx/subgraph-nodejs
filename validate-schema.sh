#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

xh -A bearer -a "$SCHEMA_REGISTRY_TOKEN" https://schema-registry.team.us/schema/validate name=subgraph-atlas-app version=1.0 type_defs=@"${DIR}"/apps.graphql url=https://subgraph.team.us/atlas-app