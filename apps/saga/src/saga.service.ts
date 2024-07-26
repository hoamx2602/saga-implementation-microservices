import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SagaService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    const requestPatterns = ['book_flight', 'book_hotel', 'process_payment'];
    requestPatterns.forEach((pattern) =>
      this.client.subscribeToResponseOf(pattern),
    );
    await this.client.connect();
  }

  async bookTrip(data) {
    try {
      const flightResult = await lastValueFrom(
        this.client.send('book_flight', data),
      );
      if (flightResult.status !== 'success')
        throw new Error('Flight booking failed');

      const hotelResult = await lastValueFrom(
        this.client.send('book_hotel', data),
      );
      if (hotelResult.status !== 'success')
        throw new Error('Hotel booking failed');

      const paymentResult = await lastValueFrom(
        this.client.send('process_payment', data),
      );
      if (paymentResult.status !== 'success')
        throw new Error('Payment processing failed');

      console.log('Booking trip successful');
    } catch (error) {
      console.error('Booking trip failed:', error.message);
      await this.rollback(data);
    }
  }

  private async rollback(data) {
    try {
      await lastValueFrom(this.client.send('cancel_flight', data));
      await lastValueFrom(this.client.send('cancel_hotel', data));
      await lastValueFrom(this.client.send('cancel_payment', data));
      console.log('Rollback successful');
    } catch (rollbackError) {
      console.error('Rollback failed:', rollbackError.message);
    }
  }
}
