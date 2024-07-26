import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class FlightsService {
  @MessagePattern('book_flight')
  async bookFlight(@Payload() message) {
    // Logic để book vé máy bay
    console.log('Booking flight:', message.value);
    // Giả sử booking thành công và trả về kết quả
    return { status: 'success', bookingId: 'flight123' };
  }

  @MessagePattern('cancel_flight')
  async cancelFlight(@Payload() message) {
    // Logic để hủy vé máy bay
    console.log('Canceling flight:', message.value);
    return { status: 'success', bookingId: message.value.bookingId };
  }
}
