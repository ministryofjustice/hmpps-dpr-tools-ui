import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    'node_modules/fsevents@2.3.3': 'FORBID',
    'node_modules/esbuild@0.25.3': 'ALLOW'
  },
})
