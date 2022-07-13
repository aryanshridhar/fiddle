import { shallow } from 'enzyme';
import * as React from 'react';

import { Runner } from '../../../src/renderer/components/commands-runner';
import { ipcRendererManager } from '../../../src/renderer/ipc';

import { StateMock } from '../../mocks/mocks';

jest.mock('../../../src/renderer/file-manager');
jest.mock('../../../src/renderer/npm');
jest.mock('child_process');
jest.mock('fs-extra');

describe('Runner component', () => {
  let store: StateMock;

  beforeEach(() => {
    ({ state: store } = (window as any).ElectronFiddle.app);
    ipcRendererManager.removeAllListeners();
  });

  describe('renders', () => {
    function expectSnapshotToMatch() {
      const wrapper = shallow(<Runner appState={store as any} />);
      expect(wrapper).toMatchSnapshot();
    }

    it('idle', () => {
      store.currentElectronVersion.state = 'installed';
      expectSnapshotToMatch();
    });

    it('running', () => {
      store.currentElectronVersion.state = 'installed';
      store.isRunning = true;
      expectSnapshotToMatch();
    });

    it('installing modules', () => {
      store.currentElectronVersion.state = 'installed';
      store.isInstallingModules = true;
      expectSnapshotToMatch();
    });

    it('VersionState.downloading', () => {
      store.currentElectronVersion.state = 'downloading';
      store.currentElectronVersion.downloadProgress = 50;
      expectSnapshotToMatch();
    });

    it('VersionState.unzipping', () => {
      store.currentElectronVersion.state = 'installing';
      expectSnapshotToMatch();
    });

    it('VersionState.ready', () => {
      store.currentElectronVersion.state = 'installed';
      expectSnapshotToMatch();
    });

    it('VersionState.unknown', () => {
      store.currentElectronVersion.state = 'missing';
      expectSnapshotToMatch();
    });
  });
});
