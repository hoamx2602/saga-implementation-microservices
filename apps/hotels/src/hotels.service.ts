import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class HotelsService {
  @MessagePattern('book_hotel')
  async bookHotel(@Payload() message) {
    // Logic để book khách sạn
    console.log('Booking hotel:', message.value);
    // Giả sử booking thành công và trả về kết quả
    return { status: 'success', bookingId: 'hotel123' };
  }

  @MessagePattern('cancel_hotel')
  async cancelHotel(@Payload() message) {
    // Logic để hủy đặt phòng khách sạn
    console.log('Canceling hotel:', message.value);
    return { status: 'success', bookingId: message.value.bookingId };
  }
}
