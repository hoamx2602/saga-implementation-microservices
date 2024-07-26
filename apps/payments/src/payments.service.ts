import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  @MessagePattern('process_payment')
  async processPayment(@Payload() message) {
    // Logic để xử lý payment
    console.log('Processing payment:', message.value);
    // Giả sử payment thành công và trả về kết quả
    return { status: 'success', paymentId: 'payment123' };
  }

  @MessagePattern('cancel_payment')
  async cancelPayment(@Payload() message) {
    // Logic để hủy payment
    console.log('Canceling payment:', message.value);
    return { status: 'success', paymentId: message.value.paymentId };
  }
}
