import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8000, {cors: '*'})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server : Server;

  private logger: Logger = new Logger('AppGateway');
  private chans: string[] = [];

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, data: {author: string, chan: string, msg: string}): void {
    this.logger.log(data);
    this.server.to(data.chan).emit('msgToClient', data);
  }

  @SubscribeMessage('joinChan')
  handleJoinChan(client: Socket, chan: string) {
    this.logger.log(chan);
    client.join(chan);
    client.emit('joinedChan', chan);
  }

  @SubscribeMessage('leaveChan')
  handleLeaveChan(client: Socket, chan: string) {
    client.leave(chan);
    client.emit('leftChan', chan);
  }

  @SubscribeMessage('createChan')
  handleCreateChan(client: Socket, chan: string) {
    this.logger.log(chan);
    this.chans.push(chan);
    client.join(chan);
    client.emit('createdChan', chan);
  }

  @SubscribeMessage('getListOfChan')
  sendListOfChan(client: Socket) {
    client.emit('listOfChan', this.chans);
  }

  @SubscribeMessage('check')
  checking(client: Socket, data: Map<string, string[]>) {
    this.logger.log('check');
    this.logger.log(data);
  }
}
