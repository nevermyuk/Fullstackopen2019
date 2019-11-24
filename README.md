# Full Stack Open

- Going through the course to learn React.








# Functional Programming

- Less Logic

- Compose

- Re-usable code.

  

## Higher Order Function

- Function that take other functions as arguments.

## filter()

- Return  a new filtered array.
- Filter accepts one argument. ( Another Callback Function)
- Filter loop through each item in the array and for each item pass it into callback function.
- Expect Callback Function to Return true or false to tell if this item should be in array.
- Call back functions - functions that are send into other functions and host will call back to them.



```javascript
let dogs = animals.filter(animal => animal.species === 'Dog')
```



## map()

- Transform array of the same length
- Map accepts one argument. ( Another Callback Function)

- Callback function passed to each item in array.
- Expect Callback function to return a transformed object that it will put into new array.



```javascript
let name = animals.map(animal => animal.name + ' is a ' + animal.species)
```

## find()

- only returns first item.

## reduce()

- Multi-tool of list transformation
- Use to implement any list transformation if it is not pre-built.
- Expects an object
- First argument - starting point
- 2nd Argument - Iterated item
- Return value will be passed to the next iteration

```javascript
let totalAmount = orders.reduce(((sum,order)=> sum+order.amount),0)
```



## Handling Event Handlers

- **MUST always be a function or reference to a function.**
- 2 ways

or 

```javascript
<button onClick={() => setValue(0)}>button</button>
// When the component gets rendered, no function gets called and only the reference to the arrow function is set to the event handler.
```

or

```javascript
const handleClick = () => console.log('clicked the button')
//handleClick assigned to a reference to the function.

<button onClick={handleClick}>button</button>
// Reference passed here.

```





### Functions that return functions

- Allows parameters to be passed into event handlers.
-  Customized event handlers for greeting users can be made.

```javascript
const hello = (who) => () => {console.log('hello', who)} 
/*  
	const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }  
 */
  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}

/* - Why does a function call work in this case?
     The function call returns another function!*/
```



### Button that set component state

**1ST WAY**

```javascript
  const setToValue = (newValue) => () => {
    setValue(newValue)
  }
  
  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
```

**Alternative**

```javascript
  const setToValue = (newValue) => {         
    setValue(newValue)
  }
      //Only difference is where the arrow function is
  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
```

## Recursing on children

- React use keys to match children in original tree with subsequent tree.
- Help with efficiency.
- **Keys should be unique and permanent **
  -  Generate a unique *id* for every item and use it as *key* when rendering the list. 

## Search bar

```javascript
 const Search = () => {
    console.log(newFilter)
    const results = !newFilter ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 
    // !newFilter,when empty is True , Falsey when filled.
    // Because strings is falsey when 
      return (
        results.map((person => <p key = {person.name}>{person.name}   {person.number}</p>))
      )
  }
```



# Useful Resources !

[Fun Fun Functions](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84) - Functional Programming in JS

[Index as key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)

