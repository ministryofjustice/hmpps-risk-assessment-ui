import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    // Workaround for a bug in hmpps-npm-script-allowlist: it mis-reads this project's own
    // package-lock.json root entry (which has hasInstallScript=true because of our own
    // "postinstall" script) as a dependency named "" at our package.json version, producing
    // this bogus "@<version>" key. FORBID-ding it stops the tool crashing on `npm show @<version>`;
    // our actual local postinstall script still runs via the tool's separate local-scripts step.
    '@0.0.1': 'FORBID',
    'node_modules/@parcel/watcher@2.6.0': 'ALLOW',
    'node_modules/cypress@15.21.1': 'ALLOW',
    'node_modules/esbuild@0.28.2': 'ALLOW',
    'node_modules/fsevents@2.3.3': 'ALLOW',
    'node_modules/protobufjs@7.6.6': 'ALLOW',
  },
})
