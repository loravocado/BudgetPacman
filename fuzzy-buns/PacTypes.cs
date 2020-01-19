using System.Net.Sockets;

namespace fuzzy_buns
{
    class Ghost : Player
    {
        public Ghost(Socket connection) : base(connection)
        {
            
        }
    }

    class Pacman : Player
    {
        public Pacman(Socket connection) : base(connection)
        {

        }
    }

    class Pellet
    {
        private bool collected;
        private int x;

        private int y;
    }
}