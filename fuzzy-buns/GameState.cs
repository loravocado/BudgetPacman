using System.Net;  
using System.Net.Sockets;  
using System.Text;  
using System.Threading; 

namespace fuzzy_buns
{
    class GameState
    {
        enum states
        {
            LOBBY = 0,
            DISPERSE = 1,
            RUNNING = 2,
            END = 3

        }
    }

    class Player
    {
        private int x;
        private int y;
        private Socket socket;

        public Player(Socket connection ) => this.socket = connection;

        public PlayerState

    }
}