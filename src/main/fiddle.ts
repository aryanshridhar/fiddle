// TODO: Rename this class to make more sense
import { Installer, Runner as FiddleRunner, TestResult } from 'fiddle-core';
import { valid } from 'semver';

// Runner class deals with all sort of stuffs when managing fiddles - downloading, bisecting
export class Runner {
  private version: string;
  private installer: Installer;
  private runner: FiddleRunner;
  private _binaryPath: string;
  private _zippedPath: string;

  private constructor(
    version: string,
    installer: Installer,
    runner: FiddleRunner,
  ) {
    this.version = version;
    this.installer = installer;
    this.runner = runner;
  }

  public static async build(version: string): Promise<Runner> {
    if (valid(version) === null) {
      // TODO: If not a valid version, then fallback to any valid version
    }
    const installer = new Installer();
    const runner = await FiddleRunner.create({});

    return new Runner(version, installer, runner);
  }

  /**
   * Returns the downloaded zip file path
   */
  public async downloadVersion(): Promise<void> {
    this._zippedPath = await this.installer.ensureDownloaded(this.version);
  }

  /**
   * Removes the zip file from the disk
   */
  public async removeVersion(): Promise<void> {
    return await this.installer.remove(this.version);
  }

  /**
   * Extract the zip file if binary is present OR
   * download the binary and then unzip it
   */
  public async install(): Promise<void> {
    this._binaryPath = await this.installer.install(this.version);
  }

  public get binaryPath(): string {
    return this._binaryPath;
  }

  public get zippedPath(): string {
    return this._zippedPath;
  }

  public async run(fiddlePath: string): Promise<TestResult> {
    //TODO: Handle cases when the fiddle throws an error.
    const val = await this.runner.run(this.version, fiddlePath);
    return val;
  }
}
