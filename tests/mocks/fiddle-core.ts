import { Installer } from '@aryanshridhar/fiddle-core';
import { VersionState } from '../../src/interfaces';
import { ChildProcessMock } from './child-process';

export class InstallerMock extends Installer {
  public state = () => VersionState.ready;
}

export class FiddleRunnerMock {
  public child = new ChildProcessMock();
  public spawn = (): ChildProcessMock => {
    return this.child;
  };
}
