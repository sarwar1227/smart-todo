import React, { useState ,useEffect} from 'react';
import todo from '../images/todo.svg';

//Get Data From Local Storage
const getLocalItems = () => {
    const list = localStorage.getItem('todo_list');
    
    if(list){
        return JSON.parse(localStorage.getItem('todo_list'));
    }
    else
      return [];
}

const Todo = () => {
    
    const [inputData,setInputData] = useState('');
    const [items,setItems] = useState(getLocalItems([]));
    const [toggleSubmit,setToggleSubmit] = useState(true);
    const [isEditItem,setIsEditItem]=useState(null);

    const addItem = () => {
            if(!inputData){
                alert("Please Fill The Form First");
            }else if(inputData && !toggleSubmit){
                   setItems(
                       items.map((item)=>{
                         if(item.id === isEditItem)
                           return{...item,name:inputData}
                         return item;  
                       }));
                   setToggleSubmit(true);
                   setInputData('');
            }else{
                const allInputData = { id : new Date().getTime().toString(), name : inputData};
                setItems([...items,allInputData]);
                setInputData('');  
            }
    }
    
    const editItem = (id) =>{
        let newEditItem = items.find((item)=>{
               return item.id === id;
        });
        setToggleSubmit(false);
        
        setInputData(newEditItem.name);
        
        setIsEditItem(id);
    }
    
    // Add Data To Local Storage
    useEffect(() => {
       localStorage.setItem("todo_list",JSON.stringify(items));
    },[items])

    const deleteItem = (index) =>{
          const updatedItems=items.filter((item)=>{
               return item.id!==index;
          })
          setItems(updatedItems);
    }
    
    const removeAll = () =>{
        setItems([]);
    }

    return (
        <>
          <div className="main-div">
            <div className="child-div">
               
               <figure>
                   <img src={todo} alt="todoLogo"/>
                   <figcaption>Add Your List Here ✌️ </figcaption>
               </figure>
               
               <div className="addItems">
                   <input type="text" placeholder= "✍️ Add Items" 
                       value={inputData} 
                       onChange={(e)=>setInputData(e.target.value)}
                    />
                   {
                       toggleSubmit
                        ?<i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
                        :<i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                   }
               </div>

               <div className="showItems">
                       {
                           items.map((item)=>{
                               return(
                                <div className="eachItem" key={item.id}>
                                    <h3>{item.name}</h3>
                                   <div className="todo-btn">
                                      <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>editItem(item.id)}></i>
                                      <i className="fas fa-trash-alt add-btn" title="Delete Item" onClick={()=>deleteItem(item.id)}></i>  
                                   </div>
                                </div>
                                );
                           })
                       } 
               </div>

               <div className="showItems">
                   <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
               </div>

            </div>
          </div>  
        </>
    )
}

export default Todo;
