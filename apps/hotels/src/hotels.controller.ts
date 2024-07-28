import { Controller, Post } from '@nestjs/common';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('/create-flights')
  async createFlight() {
    await this.hotelsService.createFlight();
    return {
      status: 'sent',
    };
  }
}
