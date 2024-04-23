import { Body, Controller, Post } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import {
  ConnectionInterface,
  ConnectionState,
} from './interfaces/connection.interface';

@Controller('/api')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post('/connect')
  async connectionConfig(
    @Body()
    request: ConnectionState,
  ): Promise<ConnectionInterface> {
    try {
      await this.connectionService.connectionConfig(request);
      return {
        host: request.host,
        username: request.username,
        password: request.password,
        database: request.database,
        message: 'Connection Successful!!',
        name: 'Connected',
        status: true,
      };
    } catch (error) {
      return {
        message: 'Connection Failed!!',
        name: 'Not Connected',
        status: false,
      };
    }
  }
}
