import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    'node_modules/@parcel/watcher@2.6.0': 'ALLOW',
    'node_modules/applicationinsights-native-metrics@0.0.11': 'ALLOW',
    'node_modules/cypress@15.21.1': 'ALLOW',
    'node_modules/esbuild@0.28.2': 'ALLOW',
    'node_modules/fsevents@2.3.3': 'ALLOW',
    'node_modules/protobufjs@7.6.6': 'ALLOW',
  },
})
