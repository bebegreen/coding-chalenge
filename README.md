# Coding Chalenge by Binyamin Green
    yarn install -> yarn start -> localhost:8000
or go to http://ec2-18-221-38-163.us-east-2.compute.amazonaws.com:8000/

At the solution I provided here I tried to put focus and keeping components as dumb as possible making performance and scalability boost, in addition to a "mobile-first" approach. 

Each component lives in her own scope and cares only about herself - making it easy to re-use. 
I kept the "single source of truth" at the main component (App) which is the closest common parent for all children that need the data. 


I think the next thing I would do is move all the data to a third party like redux or mobx. 
It would be more appropiate to keep at least some of the app's data their instead of overloading a component. 

Also, I would implement a chaching functionality for the data coming from the server. 

I used styled components for styling which I find a lot of joy in and it gives a clean look to components.  

----------------------------

One of the biggest codding chalenges I've ever had was to make an algorithem for a online realtime battleship game where the ships must be placed randomly on a board with out over-riding each other and leaving a space of at least one cell in between.

http://playbattleship.xyz/

here it is:  

       generateRandomPositions() {
        const shipsSizes =  [5, 4, 3, 3, 2];
        function randomNumber(max) {
            return Math.floor(Math.random() * max);
        }
        const horizontal = [];
        const x = [];
        const y = [];
        for (let i = 0; i < 5; ++i) {
            horizontal[i] = Math.random() < 0.5;
            if (horizontal[i]) {
                x[i] = randomNumber(10 - shipsSizes[i]);
                y[i] = randomNumber(10);
            }
            else {
                x[i] = randomNumber(10);
                y[i] = randomNumber(10 - shipsSizes[i]);
            }

        }
        return { horizontal, x, y, shipsSizes };
    }

    /**
     * array of ships and surrounding zones -   
     *  xxxxxx
     * x{ship}x
     *  xxxxxx
     * if not over lapping should sum up to 61 points; 
     */
    isOverLaping(x, y, horizontal, shipsSizes) {

        const arr = [];
        for (let i = 0; i < 5; ++i) {
            if (horizontal[i]) {
                this.addHorizontalShip(arr, i, x, y, shipsSizes);
            }
            else {
                this.addVerticalShip(arr, i, x, y, shipsSizes);
            }
        }
        // ships are overlapping if array has less than 61 unique values
        return _.uniq(arr).length < 61;

    }


