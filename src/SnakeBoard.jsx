import React, { useState, useEffect, useRef } from 'react';
import Red from './red.png';
import White from './white.png';
import Yellow from './yellow.png';


const SnakeBoard = () => {
    
  const initialRows = [
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null]
  ];
  const  [rows, setRows] = useState( initialRows );
  const  [snakeCells, setSnakeCells] = useState([{x:0, y:0}]);
  const  [direction, setDirection] = useState('right');
  const  [food, setFood] = useState({x:0, y:0});
  
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

  const moveSnake = () => {
    const newSnakeCells = [];
      switch(direction) {
        case 'right':
            newSnakeCells.push({ x: snakeCells[0].x , y: (snakeCells[0].y + 1)%10 }); 
          break;
        case 'left':
            newSnakeCells.push({ x: (snakeCells[0].x+10)%10 , y: (snakeCells[0].y + 9)%10 });
            break;
        case 'bottom':
            newSnakeCells.push({ x: (snakeCells[0].x+1)%10  , y:(snakeCells[0].y)%10 });
            break;
        case 'top':
            newSnakeCells.push({ x: (snakeCells[0].x+9)%10  , y:(snakeCells[0].y)%10 });
            break;
        default: 
            break;  
      }
            snakeCells.forEach((cell,i) => {
              newSnakeCells.push({x: cell.x, y:cell.y});              
            });
            if(newSnakeCells.length>1)
            newSnakeCells.pop();
      if(newSnakeCells[0].x === food.x && newSnakeCells[0].y === food.y ) {
        console.log(food);
        console.log(newSnakeCells[0]);
        newSnakeCells.push(newSnakeCells[newSnakeCells.length - 1])
        putFood();
      }
      setSnakeCells(newSnakeCells);
  }

  const moveSnakeAndChangeRows = () => {
      moveSnake();
      const newRows = initialRows;
      console.log(snakeCells);
      snakeCells.forEach(cell => {
        newRows[cell.x][cell.y]='snakeCell';
      })
      if(food) newRows[food.x][food.y]='food';
      setRows(newRows);
  }
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

  const rowsView = rows.map(row =>  
    <li>
        {row.map((e) => 
            {switch(e) {
              case null:
                  return <img alt='blank' src={White} width='50' height='50'/>   
              case 'snakeCell':
                  return <img alt='snake' src={Red} width='50' height='50'/> 
              case 'food':
                  return <img alt='food'  src={Yellow} width='50' height='50'/> 
              default:
              break;     
            }}
        )}
    </li>
    );

    const putFood = () => {
        const x = Math.ceil(Math.random()*9);
        const y = Math.ceil(Math.random()*9);
        const newRows = rows;
        setFood({x, y});
        newRows[x][y] = 'food';
        setRows(newRows);     
    }  

    useInterval(() => {
      moveSnakeAndChangeRows();
    }, 100);

  return (
    <div>
     {rowsView}
    </div>
  );
}

export default SnakeBoard;