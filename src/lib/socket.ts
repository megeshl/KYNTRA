import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export function getSocket(): Socket {
  if (!socketInstance) {
    socketInstance = io(typeof window !== 'undefined' ? window.location.origin : '', {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketInstance.on('connect', () => {
      console.log('[KYNTRA Socket] Connected:', socketInstance?.id);
    });

    socketInstance.on('disconnect', () => {
      console.log('[KYNTRA Socket] Disconnected');
    });
  }
  return socketInstance;
}
