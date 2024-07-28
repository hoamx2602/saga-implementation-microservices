import { Controller, Post } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  // @Post('/create-flights')
  // async createFlight() {
  //   await this.flightsService.createFlight();
  //   return {
  //     status: 'sent',
  //   };
  // }
}
