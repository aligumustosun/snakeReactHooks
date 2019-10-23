import React, { useState, useEffect, useRef } from 'react';
import Blank from './blank.png'
import Snake from './snake.png'
import Food  from './food.png'

const SnakeBoard = () => {


const width=10;
const height=10;    
let initialRows = [];
for(let i=0; i<height; i++) {
    initialRows.push([]);
    for(let k=0; k<width; k++) {
        initialRows[i].push('blank');
    }
}


const randomPosition = () => {
    const position = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height)};
    return position;    
}

const [rows, setRows] = useState(initialRows);
const [snake, setSnake] = useState([{x:0,y:0},{x:1,y:0}]);
const [direction, setDirection] = useState('right');
const [food, setFood] = useState(randomPosition);



const changeDirectionWithKeys = (e) => {
    var { keyCode } = e;
      switch(keyCode) {
        case 37:
                setDirection('left');
                break;
        case 38:
                setDirection('top');
                break;                   
        case 39:
              setDirection('right');
              break;
        case 40:
              setDirection('bottom');
              break;
        default:
            break;            
          }
    }
    
  document.addEventListener("keydown", changeDirectionWithKeys, false);

const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach(cell => {
     newRows[cell.x][cell.y]='snake';
    })
    newRows[food.x][food.y]='food';
    setRows(newRows);
}


const moveSnake = () => {
    const newSnake = [];
    switch(direction) {
        case 'right':
            newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%width})
            break;
        case 'left':
            newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width)%width})
            break;
        case 'top':
            newSnake.push({x: (snake[0].x - 1 + height)%height, y: snake[0].y})
            break;
        case 'bottom':
            newSnake.push({x: (snake[0].x + 1)%height, y: snake[0].y})
    }
        snake.forEach(cell=> {
            newSnake.push(cell);
        })    
    if(snake[0].x === food.x && snake[0].y === food.y) {
        setFood(randomPosition);
    }else {
        newSnake.pop();
    }
    setSnake(newSnake);
    displaySnake();
}


useInterval(moveSnake, 100);

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

const displayRows = rows.map(row => 
    <li>
        {row.map(e => {
            switch(e) {
                case 'blank':
                   return <img src={Blank}/>
                case 'snake':
                   return <img style={{opacity:"0"}} src={Snake}/>
                case 'food':
                    return <img src={Food}/>      
                      }
                 })
        }
    </li>
    );

return (
    <div >
        <ul style={{width:'500px', padding:'0px'}} class='img500'>
        { displayRows }
        </ul>
    </div>
)
}

export default SnakeBoard;
