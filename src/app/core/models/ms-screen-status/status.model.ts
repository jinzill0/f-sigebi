export interface IStatus {
  statusFinal: string;
}

export interface IStatusXScreen {
  statusfinal: string;
  action: string;
}

export interface IDynamicStatusXScreen {
  screen: string;
  status: string;
  action?: string;
  process?: string;
}
