import { animate, style, transition, state, trigger, group, keyframes } from '@angular/animations';

const clickedStateTrigger = trigger('clickedState', [
  state('default', style({
    backgroundColor: 'orange',
    width: '150px',
    height: '150px'
  })),
  state('clicked', style({
    backgroundColor: 'blue',
    width: '300px',
    height: '50px'
  })),
  state('mousedown', style({
    backgroundColor: 'lime',
    width: '150px',
    height: '150px',
    border: '2px solid blue'
  })),
  transition('default => clicked', animate(
    '0.3s 0.5s ease-in'
  )),
  transition('clicked => default', animate(
    '0.5s 0.3s ease-in'
  )),
  transition('mousedown <=> clicked', animate(
    '1s 0.5s linear'
  ))
]);

const setNumberStateTrigger = trigger('numberState', [
  state('notSelected', style({
    color: 'grey',
    paddingLeft: '5px',
    paddingRight: '5px',
    border: '1px solid black'
  })),
  state('selected', style({
    color: 'red',
    backgroundColor: 'yellow',
    paddingLeft: '5px',
    paddingRight: '5px',
    border: '1px solid lime'
  })),
  transition('notSelected => selected', [
    style({
      border: '2px solid black',
      padding: '4px'
    }),
    animate(400, style({
      backgroundColor: 'red',
      padding: '6px'
    })),
    animate(700)
  ])
]);

const setBubbleStateTrigger = trigger('bubbleState', [
  state('default', style({
    height: '50px',
    width: '50px',
    backgroundColor: 'lime',
    borderRadius: '50%',
    margin: '0 5px',
    float: 'left',
    display: 'inline-block'
  })),
  state('selected', style({
    height: '50px',
    width: '50px',
    backgroundColor: 'yellow',
    borderRadius: '50%',
    border: '2px solid red',
    margin: '0 5px',
    float: 'left',
    display: 'inline-block'
  })),
  transition('default => selected', [
    style({
      border: '2px solid black',
      transform: 'scale(1.0)'
    }),
    animate(400, style({
      backgroundColor: 'red',
      border: '4px solid blue',
      transform: 'scale(1.2)'
    })),
    animate(700)
  ])
]);

const showTextStateTrigger = trigger('showText', [
  // void - when el is not in the DOM at start/end
  // * wild card -> any state
  // can replace 'void => *' with ':enter'
  // can replace '* => void' with ':leave'
  transition('void => *', [
    style({
      opacity: 0
    }),
    animate(1000, style({
      opacity: 1
    }))
  ]),
  transition('* => void', [
    style({
      opacity: 1
    }),
    animate(500, style({
      opacity: 0
    }))
  ])
]);

const showListStateTrigger = trigger('showList', [
  transition(':enter', [
    style({
      opacity: 0,
      backgroundColor: 'white'
    }),
    group([
      animate(1000, style({
        opacity: 0.7
      })),
      animate(5000, keyframes([
        style({
          backgroundColor: 'white',
          offset: 0
        }),
        style({
          backgroundColor: 'lime',
          offset: 0.8
        }),
        style({
          backgroundColor: 'blue',
          offset: 1
        }),
      ]))
    ]),
    animate(300, style({
      backgroundColor: 'lightblue',
      opacity: 1
    }))
  ]),
  transition(':leave', [
    style({
      opacity: 1
    }),
    animate(500, style({
      opacity: 0
    }))
  ])
]);

const animateStateTrigger = trigger('animateState', [
  transition('* => *', [
    animate(500, style({
      width: 0
    })),
    animate(600, style({
      width: '*'
    }))
  ])
]);

export {
  clickedStateTrigger,
  setNumberStateTrigger,
  setBubbleStateTrigger,
  showTextStateTrigger,
  animateStateTrigger,
  showListStateTrigger
};
