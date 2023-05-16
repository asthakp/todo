const form=document.getElementById('form')
const inputBox=document.getElementById('floating-input')
const addBtn=document.getElementById('addBtn')
const ul=document.getElementById('todo-list')
let todoId=''

let todos=[];
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const todo= {
        id: Date.now(),
        todoList:inputBox.value,
        isChecked:false
    }
    todos.push(todo)
    displayList()
   form.reset()
})

const displayList=()=>{
  ul.innerHTML=''
    todos.forEach((todo)=>{
      const li=document.createElement('li')
      li.classList.add('list-group-item','w-75','rounded' ,'d-flex', 'justify-content-between' ,'align-items-center')
      const leftDiv= document.createElement('div')
      const input=document.createElement('input')
      input.type='checkbox'
      input.classList.add('form-check-input','me-2')
      input.checked=todo.isChecked

      input.addEventListener('change',(e)=>{
        e.preventDefault()
        todo.isChecked=e.target.checked
        displayList()
      })

      const todoValue=document.createElement('span')
      todoValue.textContent=todo.todoList
      todoValue.style.textDecoration=todo.isChecked? 'line-through' : 'none'

      
      //
      const rightDiv=document.createElement('div')
      const edit=document.createElement('i')
      edit.classList.add('fa-solid','fa-pen-to-square','fa-xl','me-3')
      edit.setAttribute('data-bs-toggle','modal')
      edit.setAttribute('data-bs-target','#editModal')
      edit.addEventListener('click',(e)=>{
        e.preventDefault()
        document.getElementById('todo-edit').value=todo.todoList
        document.getElementById('todo-id').value=todo.id
        todoId = todo.id;
        //  localStorage.setItem("todoId", todo.id)
        //  sessionStorage.setItem("todoId", todo.id)

      })
      
      const del=document.createElement('i')
      del.classList.add('fa-solid','fa-trash','fa-xl')

      del.addEventListener('click',(e)=>{
        e.preventDefault()
        todos=todos.filter((del)=>{
          return del.id!==todo.id
        })
        displayList()
      })

      //
      rightDiv.append(edit)
      rightDiv.append(del)
      leftDiv.append(input)
      leftDiv.append(todoValue)
      li.append(leftDiv)
      li.append(rightDiv)
      ul.append(li)
    })  
}


const handleEdit=(e)=>{
e.preventDefault()
todos = todos.map((value) => {
  return value.id === todoId? {
     id: todoId,
    todoList: document.getElementById("todo-edit").value,
     isChecked: false
  } : value;
})
displayList();
document.getElementById('btn-close').click();

}
  
    

        
       
     
    
  

