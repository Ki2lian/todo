class Task {
    static idTask = 0
    constructor(title, place, hour, desc, important, statut, id){
        this.id = id
        if(id != "non") this.id = Task.idTask
        this.title = title;
        this.place = place;
        this.hour = hour;
        this.desc = desc;
        this.important = important;
        this.statut = statut;
        Task.idTask++
    }



    getId(){
        return this.id;
    }

    getTitle(){
        return this.title;
    }
    
    getPlace(){
        return this.place;
    }

    getHour(){
        return this.hour;
    }

    getDesc(){
        return this.desc;
    }

    getImportant(){
        return this.important;
    }

    getStatut(){
        return this.statut;
    }

    setTitle(title){
        this.title = title;
        return this;
    }
    
    setPlace(place){
        this.place = place;
        return this;
    }
    setHour(hour){
        this.hour = hour;
        return this;
    }
    setDesc(desc){
        this.desc = desc;
        return this;
    }
    setImportant(important){
        this.important = important;
        return this;
    }

    setStatut(statut){
        this.statut = statut;
        return this;
    }

    createTemplate(){
        const bodyTask = document.querySelector('.tasks');
        document.querySelector('.task-none').classList.add('d-none');
        const el = document.createElement('div');
        el.classList.add('card', 'mb-4', 'task');

        switch (this.important) {
            case "moyen":
                el.classList.add("bg-warning");
                break;
            case "oui":
                el.classList.add("bg-danger");
                break;
            default:
                break;
        }

        var inputChecked = "";
        if(!this.statut){
            inputChecked = "checked";
            el.classList.add('finish')
        }
        
        el.setAttribute('data-task-id', this.id);
        el.innerHTML = `
        <div class="card-body rounded">
            <div class="row">
                <div class="col-1">
                    <input ${inputChecked} type="checkbox" class="form-check-input"/>
                </div>
                <div class="col-10">
                    <div class="d-flex flex-column">
                        <h1 class="h3">${this.title}</h1>
                        <small class="text-muted">${this.hour} - ${this.place}</small>
                        <p class="mt-4">${this.desc}</p>
                    </div>

                </div>
                <div class="col-1">
                    <i class="fas fa-trash fa-xl text-muted"></i>
                </div>
            </div>
        </div>`;

        bodyTask.append(el)
        
    }
}