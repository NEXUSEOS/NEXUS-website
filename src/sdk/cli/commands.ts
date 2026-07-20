/** NEXUS CLI command specification — implementation owner: nexus-sdk */

export interface CliCommand {
  name: string
  description: string
  owner: string
  pipelineStage?: string
  flags?: string[]
}

export const cliCommands: CliCommand[] = [
  {
    name: 'nexus init',
    description: 'Initialize a NEXUS project with behavior.json scaffold and directory layout.',
    owner: 'nexus-sdk',
    flags: ['--template', '--sdk-version'],
  },
  {
    name: 'nexus login',
    description: 'Authenticate with NEXUS cloud (API key or OAuth).',
    owner: 'nexus-sdk',
    flags: ['--api-key', '--org'],
  },
  {
    name: 'nexus create behavior',
    description: 'Create a new behavior package from template.',
    owner: 'nexus-sdk',
    pipelineStage: 'create',
    flags: ['--name', '--robot', '--output'],
  },
  {
    name: 'nexus validate',
    description: 'Validate behavior.json, directory layout, and dependencies.',
    owner: 'nexus-sdk',
    pipelineStage: 'validate',
    flags: ['--path', '--strict'],
  },
  {
    name: 'nexus simulate',
    description: 'Run behavior against Digital Twin simulation session.',
    owner: 'nexus-sdk',
    pipelineStage: 'simulate',
    flags: ['--profile', '--robot', '--timeout'],
  },
  {
    name: 'nexus package',
    description: 'Build distributable .nexus-behavior archive.',
    owner: 'nexus-sdk',
    flags: ['--path', '--output', '--sign'],
  },
  {
    name: 'nexus publish',
    description: 'Submit package to nexus-marketplace registry.',
    owner: 'nexus-sdk',
    pipelineStage: 'marketplace',
    flags: ['--channel', '--visibility'],
  },
  {
    name: 'nexus install',
    description: 'Install behavior on simulation target or robot (robot deferred).',
    owner: 'nexus-sdk',
    pipelineStage: 'robot_installation',
    flags: ['--target', '--version'],
  },
  {
    name: 'nexus update',
    description: 'Update installed behavior with semver compatibility check.',
    owner: 'nexus-sdk',
    pipelineStage: 'updates',
    flags: ['--target', '--version', '--rollback-on-fail'],
  },
]

export function getCliCommand(name: string): CliCommand | undefined {
  return cliCommands.find((cmd) => cmd.name === name)
}
