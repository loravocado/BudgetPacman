using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace fuzzy_buns
{
    public class Server
    {
        private List<SocketWrapper> _newSockets = new List<SocketWrapper>();
        private Thread TCPThread;
        TcpListener listener;
        
        volatile bool StopThread = false;
        
        List<SocketWrapper> NewSockets
        {
            get
            {
                lock (_newSockets)
                {
                    List<SocketWrapper> output = new List<SocketWrapper>(_newSockets);
                    _newSockets.Clear();
                    return output;
                }   
            }
        }

        public Server()
        {
            listener = new TcpListener(IPAddress.Any, 25565);
        }

        public void Start()
        {
            TCPThread = new Thread(ConnectionHandler);

            listener.Start();
            TCPThread.Start();
        }

        public void Stop()
        {
            StopThread = true;
        }

        void ConnectionHandler()
        {
            while (!StopThread)
            {
                var _client = new SocketWrapper(listener.AcceptTcpClient());
                lock (_newSockets)
                {
                    _newSockets.Add(_client);
                }
            }
        }
    }
}