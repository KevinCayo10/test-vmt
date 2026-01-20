import { BasesI } from "./shared.interface";

export interface MenuI extends BasesI {
  remoteEntry: string;
  exposedModule: string;
  displayName: string;
  routePath: string;
  ngModuleName: string;
}
