
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

        private bool ghost;
    }
}