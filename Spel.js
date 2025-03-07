
// Background scrolling speed
let move_speed = 3;
  

  
// Getting reference to the skidor element
let skidor = document.querySelector('.skidor');
  
// Getting skidor element properties
let skidor_props = skidor.getBoundingClientRect();
let background =
    document.querySelector('.background')
            .getBoundingClientRect();
  
// Getting reference to the score element
let score_val =
    document.querySelector('.score_val');
let message =
    document.querySelector('.message');
let score_title =
    document.querySelector('.score_title');
  
// Setting initial game state to start
let game_state = 'Start';
  
// Add an eventlistener for key presses
document.addEventListener('keydown', (e) => {
  
  // Start the game if enter key is pressed
  if (e.key == 'Enter' &&
      game_state != 'Play') {
    document.querySelectorAll('.pipe_sprite')
              .forEach((e) => {
      e.remove();
    });
    skidor.style.top = '40vh';
    game_state = 'Play';
    message.innerHTML = '';
    score_title.innerHTML = 'Score : ';
    score_val.innerHTML = '0';
    play();
  }
});
function play() {
  function move() {
    
    // Detect if game has ended
    if (game_state != 'Play') return;
    
    // Getting reference to all the pipe elements
    let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    pipe_sprite.forEach((element) => {
      
      let pipe_sprite_props = element.getBoundingClientRect();
      skidor_props = skidor.getBoundingClientRect();
      
      // Delete the pipes if they have moved out
      // of the screen hence saving memory
      if (pipe_sprite_props.top <= 0) {
        element.remove();
      } else {
        // Collision detection with skidor and pipes
        if (
 