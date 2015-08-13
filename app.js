'use strict';

/*
 * Starts the game on instantiation, creating Target instances as required
 * along with handling click events to remove them and detecting when the game
 * has been lost.
 */

class Game {
  constructor () {
    addEventListener('click', this.clickHandler.bind(this));
    this.main();
  }

  // Handle all click events by removing any targets clicked on.
  clickHandler () {
    if (event.target.className === 'target') {
      event.target.remove();
    }
  }

  // Create a Target instance and append to the body.
  addTarget () {
    document.querySelector('body').appendChild(new Target().element);
  }

  // Main game loop, initiated on class instantiation and called recursively
  // always when possible. Responsible for adding targets to the game.
  main () {
    this.then = this.then || 0;
    this.delta = this.delta || 1000;
    const now = new Date().getTime();
    if (now - this.then > this.delta) {
      this.then = now;
      this.delta -= 20;
      this.addTarget();
    }
    if (document.querySelector('.target[not-hit]')) {
      return alert('Game over!');
    }
    requestAnimationFrame(this.main.bind(this));
  }
}


/*
 * A class to contain a target element. Handles the creation, positioning and
 * pulsing of the target on instantiation, along with marking it as not hit
 * after it has faded out.
 */

class Target {
  constructor () {
    // Create target element and expose it.
    const element = this.element = document.createElement('div');
    element.className = 'target';

    // Position element so that it is in full view.
    element.style.left = this.getRandomInt(25, innerWidth - 25) + 'px';
    element.style.top = this.getRandomInt(25, innerHeight - 25) + 'px';

    // Fade in immediately.
    setTimeout(() => {
      element.setAttribute('pulsing', '');
    }, 1);

    // Fade out after two seconds.
    setTimeout(() => {
      element.removeAttribute('pulsing');

      // Mark target as not hit after another two seconds.
      setTimeout(() => {
        element.setAttribute('not-hit', '');
      }, 2000);
    }, 2000);
  }

  // Return an integer within the inclusive range of min and max.
  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


/*
 * Initialize the game when page is ready.
 */

(() => {
  new Game();
})();
