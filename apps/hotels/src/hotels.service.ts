import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class HotelsService {
  constructor(
    @Inject('FLIGHTS_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  // async onModuleInit() {
  //   await this.kafkaClient.connect();
  //   this.kafkaClient.subscribeToResponseOf('book_flight.reply');
  // }

  async onModuleInit() {
    await this.kafkaClient.connect();
    this.kafkaClient.subscribeToResponseOf('book_flight');
    // Gửi thông điệp test
  }

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

  createFlight() {
    console.log('🟢====>11111', 11111);
    this.kafkaClient.emit('book_flight', { value: '1111' });
    return {
      message: 'OK',
    };
  }
}
