import { Controller } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}
}
