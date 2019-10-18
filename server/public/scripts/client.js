$(document).ready(function(){
    console.log('jQuery sourced.');
    getTasks();
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
        $('#toDoList').append(`
            <tr>
                <td>${Task.completed}</td>
                <td>${Task.task}</td>
            </tr>
        `)
    });
}