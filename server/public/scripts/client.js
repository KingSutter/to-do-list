$(document).ready(function(){
    console.log('jQuery sourced.');
    getTasks();
    // event listeners
    $('#toDoList').on('click','.checkbox',changeStatus);
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
        let checkbox = ''
        // check if task is done
        console.log(Task.completed)
        if (Task.completed){
            checkbox = `<td><input data-status="true" data-id=${Task.id} class="checkbox" type="checkbox" checked></td>`;
        }
        else{
            checkbox = `<td><input data-status="false" data-id=${Task.id} class="checkbox" type="checkbox"></td>`;
        }
        // add row to DOM
        $('#toDoList').append(`
            <tr>
                ${checkbox}
                <td>${Task.task}</td>
            </tr>
        `)
    });
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