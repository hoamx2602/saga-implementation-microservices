import { Controller } from '@nestjs/common';
import { HotelsService } from './hotels.service';

@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}
}
