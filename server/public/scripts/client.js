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
    tasks.forEach(Task => {
        let checkbox = ''
        // check if task is done
        console.log(Task.completed)
        if (Task.completed){
            checkbox = `<td><input data-status="false" data-id=${Task.id} class="checkbox" type="checkbox" checked></td>`;
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
    const status = $(this).data("status")
    if (status = "true"){
        $.ajax({
            type: 'PUT',
            url: '/todos'
    });
}