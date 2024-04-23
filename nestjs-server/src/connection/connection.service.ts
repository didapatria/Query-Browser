import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectionConfig } from './connection.config';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(ConnectionConfig)
    private readonly connectionConfigRepository: Repository<ConnectionConfig>,
  ) {}

  async connectionConfig(
    request: Partial<ConnectionConfig>,
  ): Promise<ConnectionConfig> {
    try {
      const config = this.connectionConfigRepository.create(request);
      return await this.connectionConfigRepository.save(config);
    } catch (error) {
      console.error(
        'Error occurred while saving connection configuration:',
        error,
      );
      throw error;
    }
  }
}
