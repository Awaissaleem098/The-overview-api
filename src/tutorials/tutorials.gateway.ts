import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Feedback } from './tutorial.model';

@WebSocketGateway({
  cors: {
    origin: /http:\/\/localhost:(\d{4}|\d{5})/,
  },
})
export class FeedbackGatewayService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  async broadcastNewFeedback(feedback: Feedback) {
    this.server.emit('newFeedback', feedback);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('A client has connected');
  }

  handleDisconnect(client: any): any {
    console.log('A client has disconnected');
  }
}
