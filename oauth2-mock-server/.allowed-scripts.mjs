import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    "node_modules/unrs-resolver@1.12.2": "FORBID",
    'node_modules/fsevents@2.3.3': 'FORBID',
  },
})
