import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    "node_modules/@grpc/proto-loader/node_modules/protobufjs@7.6.4": "FORBID",
    'node_modules/cypress@15.17.0': 'ALLOW',
    'node_modules/dtrace-provider@0.8.8': 'FORBID',
    'node_modules/fsevents@2.3.3': 'FORBID',
    'node_modules/esbuild@0.28.1': 'ALLOW',
    "node_modules/protobufjs@8.0.1": "FORBID"
  },
})
