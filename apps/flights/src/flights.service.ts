import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class FlightsService {
  constructor(
    @Inject('HOTELS_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
    this.kafkaClient.subscribeToResponseOf('book_flight');
    // Gửi thông điệp test
  }

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

  // @MessagePattern('test-topic')
  // async handleTest(@Payload() message) {
  //   // Logic để hủy vé máy bay
  //   console.log('Canceling flight:', message.value);
  //   return { status: 'success', bookingId: message.value.bookingId };
  // }

  // async sendMessage(topic: string, message: any) {
  //   this.kafkaClient.send(topic, message).subscribe((user) => {
  //     console.log(
  //       `Billing user with stripe ID ${user.stripeUserId} a price of...`,
  //     );
  //   });
  // }

  // async createFlight() {
  //   console.log('🟢====>1111111', 1111111);
  //   await this.sendMessage(
  //     'test-topic',
  //     JSON.stringify({
  //       key: 'value',
  //       value: [
  //         { key: 'key1', value: 'hello world', partition: 0 },
  //         { key: 'key2', value: 'hey hey!', partition: 1 },
  //       ],
  //     }),
  //   );
  // }
}
