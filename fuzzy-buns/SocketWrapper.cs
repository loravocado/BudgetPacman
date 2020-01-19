using System;
using System.Net.Sockets;

namespace fuzzy_buns
{
    public class SocketWrapper
    {
        public Socket ClientSocket;
        private NetworkStream _dataStream;
        
        public SocketWrapper(TcpClient toBeWrapped)
        {
            ClientSocket = toBeWrapped.Client;
            _dataStream = toBeWrapped.GetStream();
        }

        public string ReadStream()
        {
            byte[] bytes = new Byte[256];
            string data = null;

            var i = 0;

            while((i = _dataStream.Read(bytes, 0, bytes.Length))!=0) 
            {   
                data = System.Text.Encoding.ASCII.GetString(bytes, 0, i);
                Console.WriteLine("Received some data");

                return data;
            }

            return "";
        }

        public void WriteStream(String data)
        {
            byte[] msg = System.Text.Encoding.ASCII.GetBytes(data);

            _dataStream.Write(msg, 0, msg.Length);
            Console.WriteLine("Sent: {0}", data);            

        }
    }
}