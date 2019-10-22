$(document).ready(function(){
    console.log('jQuery sourced.');
    getTasks();
    // event listeners
    $('#toDoList').on('click','.checkbox',changeStatus);
    $("#toDoList").on('click','#addTaskButton',addTask);
    $("#toDoList").on('click','.deleteButton',removeTask);
    // $('#todoForm').submit(addTask);
});

// gets to-dos from server (which comes from the database)
function getTasks(){
    console.log('getting tasks');
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function(response) {
        drawTasks(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
}

// draws tasks onto the DOM
function drawTasks(tasks){
    // clear table
    $('#toDoList').empty();
    // write table
    tasks.forEach(Task => {
        console.log(Task);
        // check if task is done
        console.log(Task.completed)
        if (Task.completed){
            $('#toDoList').append(`
            <tr class="highlight">
                <td><input data-status="true" data-id=${Task.id} class="checkbox" type="checkbox" checked></td>
                <td class="checkbox" data-status="true" data-id=${Task.id}>${Task.task}</td>
                <td><button class="deleteButton" data-id=${Task.id}>Remove</button></td>
            </tr>
            `);
        }
        else{
            $('#toDoList').append(`
            <tr class="highlight">
                <td><input data-status="false" data-id=${Task.id} class="checkbox" type="checkbox"></td>
                <td data-status="false" data-id=${Task.id} class="checkbox">${Task.task}</td>
                <td><button class="deleteButton" data-id=${Task.id}>Remove</button></td>                
            </tr>
            `);
        }
    });
    $('#toDoList').append(`
        <tr>
            <td><input type="checkbox" disabled></td>
            <td><input name="userIn" type="text" autocomplete="off" id="userIn" placeholder="add a task..."></td>
            <td><button type="submit" name="submitButton" id="addTaskButton">Submit</button>
            </td>
        </tr>
    `)
}

// change checkbox status and reflect those changes to database
function changeStatus(){
    console.log('changing status invoked');
    let status = $(this).data('status')
    console.log('status is:',status);
    console.log('changing status to:',!status);
    let id = $(this).data('id');
    $.ajax({
        type: 'PUT',
        url: `/todos/${id}`,
        data: {completed: !status}
    }).then(function(response){
        // rewrite to DOM
        getTasks();
    }).catch(function(error){
        console.log('error in PUT',error);
    });
}

// gets user input and sends to database then updates DOM
function addTask(e){
    e.preventDefault();
    console.log('add task invoked');
    // check for empty input
    if ( $.trim( $('#userIn').val() ) == '' ){
        alert('input is blank');
        return false;
    }
    // sent input to database
    $.ajax({
        type: 'POST',
        url: `/todos`,
        data: {
            task: $('#userIn').val(),
        }
    }).then(function(response){
        // rewrite to DOM
        $('#userIn').val('');
        getTasks();
    }).catch(function(error){
        console.log('error in POST',error);
    });
}

// removes task from database when called
function removeTask(){
    // confimation message on delete, return out of function if response is no
    if (!confirm("Are you sure you want to remove this task?")){
        return false;
    }
    deleteId = $(this).data("id");
    console.log("remove task clicked at id:",deleteId);
    $.ajax({
        type: 'DELETE',
        url: `/todos/${deleteId}`,
    }).then(function(response){
        // rewrite to DOM
        getTasks();
    }).catch(function(error){
        console.log('error in POST',error);
    });
}