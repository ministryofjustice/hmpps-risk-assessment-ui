import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
   allowlist: {
      "node_modules/@badeball/cypress-cucumber-preprocessor@23.2.1": "ALLOW",
      "node_modules/@parcel/watcher@2.5.1": "ALLOW",
      "node_modules/applicationinsights-native-metrics@0.0.11": "ALLOW",
      "node_modules/cypress@15.7.0": "ALLOW",
      "node_modules/esbuild@0.27.0": "ALLOW",
      "node_modules/fsevents@2.3.3": "ALLOW",
      "node_modules/tsx/node_modules/esbuild@0.25.12": "ALLOW",
      "node_modules/unrs-resolver@1.11.1": "ALLOW",
   },
})
