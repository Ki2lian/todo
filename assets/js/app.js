document.addEventListener("DOMContentLoaded", function() {
    const body = document.querySelector('body');
    const createTaskButton = document.querySelector('.create-task');
    const inputsTask = document.querySelectorAll('.form-task input');
    const rowFormTask = document.querySelector('.row-form-task');
    const addTaskButton = document.querySelector('.button-add');
    const closeAddTask = document.querySelector('.button-close');
    const importantBlock = document.querySelectorAll('label');
    var stopEvent = false;

    var tasks = [];
    if(localStorage.getItem('tasks') != null){
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach((el) => {
            createTask(el.title, el.place, el.hour, el.desc, el.important, el.statut, el.id);
        });
    }
    

    body.classList.remove('loading')

    addTaskButton.addEventListener('click', function(){
        body.classList.add('body-form-task');
        rowFormTask.classList.remove('d-none');
    });

    
    closeAddTask.addEventListener('click', function(){
        clearForm();
    });

    
    importantBlock.forEach(element => {
        element.addEventListener('click', function(){
            importantBlock.forEach(el => {
                el.classList.remove('active');
            });
            element.classList.add('active');
        });
    });

    
    var varEmpty = false;
    createTaskButton.addEventListener('click', () => {
        inputsTask.forEach((el) => {
            const value = el.value;
            if(value == "") varEmpty = true;
            if(el.getAttribute('name') == "title") title = value;
            if(el.getAttribute('name') == "place") place = value;
            if(el.getAttribute('name') == "hour") hour = value;
            if(el.getAttribute('name') == "desc") desc = value;
            if(el.getAttribute('name') == "important" && el.checked) important = value;
        });
        
        if(varEmpty){
            alert('Tous les champs sont obligatoires');
            varEmpty = false;
            return;
        }
        task = createTask(title, place, hour, desc, important, 1);
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        clearForm();
        
        
    });

    
    
    function clearForm(){
        inputsTask.forEach((el) => {
            if(el.getAttribute('name') != "important") el.value = "";
        });
        document.querySelector('#urgentNon').checked = true;
        document.querySelector('.important-block [for=urgentNon]').classList.add('active');
        document.querySelector('#urgentMoyen').checked = false;
        document.querySelector('.important-block [for=urgentMoyen]').classList.remove('active');
        document.querySelector('#urgentOui').checked = false;
        document.querySelector('.important-block [for=urgentOui]').classList.remove('active');
        body.classList.remove('body-form-task');
        rowFormTask.classList.add('d-none');
    }

    function createTask(title, place, hour, desc, important, statut, id = "non"){
        task = new Task(title, place, hour, desc, important, statut, id);
        task.createTemplate();
        clearForm();

        inputsTaskFinish = document.querySelectorAll('.tasks .task input');
        inputsTaskFinish.forEach((el) => {
            el.addEventListener('click', function(){
                if(!stopEvent){
                    finishTask(el);
                    stopEventDelete = true;
                    setTimeout(() => {
                        stopEvent = false;
                    }, 10);
                }
            });
        });

        deleteTaskButton = document.querySelectorAll('.tasks .task .fa-trash');
        deleteTaskButton.forEach((el) => {
            el.addEventListener('click', function(){
                if(!stopEvent){
                    stopEvent = true;
                    deleteTask(el);
                    setTimeout(() => {
                        stopEvent = false;
                    }, 1000);
                }
            });
        });
        return task;
    }

    function deleteTask(el){
        const parents = el.parentNode.parentNode.parentNode.parentNode;
        if(window.confirm('Voulez-vous vraiment supprimer ?')){
            parents.remove();
            tasks.forEach((task, idx, object) => {
                if(task.id == parents.getAttribute('data-task-id')) {
                    object.splice(idx, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            });

            if(document.querySelector('.tasks').childElementCount -1 == 0){
                document.querySelector('.task-none').classList.remove('d-none');
            }
        }
    }

    function finishTask(el){
        const parents = el.parentNode.parentNode.parentNode.parentNode;
        var statut = 0;
        if(el.checked){
            parents.classList.add('finish');
        }else{
            parents.classList.remove('finish');
            statut = 1;
        }

        tasks.forEach((task) => {
            if(task.id == parents.getAttribute('data-task-id')) {
                task.statut = statut;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        })
    }

});