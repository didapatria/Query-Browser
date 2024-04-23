export interface ConnectionInterface extends ConnectionState {
  message: string;
  name: string;
  status: boolean;
}

export interface ConnectionState {
  host?: string;
  username?: string;
  password?: string;
  database?: string;
}
