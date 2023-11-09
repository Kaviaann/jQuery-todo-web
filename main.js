// Declare Variable
let input = $('input#input');
let createBtn = $('button#createBtn');
let delBtn = $('button#deleteBtn');
let listUl = $('ul.list-ul');
let doneDOM = $('span#finish');
let timeDOM = $('span#time');
let themeDOM = $('button#theme');
let darkIcon = '<ion-icon name="moon-outline"></ion-icon>';
let lightIcon = '<ion-icon name="sunny-outline"></ion-icon>';
let done = 0;
let theme = getTheme();

// Vanila Javascript
setInterval(() => {
    let d = new Date();
    timeDOM.text(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
}, 500);


// jQuery
$(function () {
    doneDOM.text(done);

    createBtn.on('click', () => {
        getInput();
    });

    delBtn.on('click', () => {
        delAll();
    })


    // Render LocalStorage
    // renderTheme();


    // Change Theme
    themeDOM.on('click', () => {
        
        if(theme == 'true'){
            themeDOM.html(lightIcon);
            theme = 'false';
            localStorage.setItem('theme', theme);
    
            // $('*').css({'color' : 'var(--light-font-black)'})
            $('body').attr('id', 'light')
            $('.main').attr('id', 'light');
        }
    
        else{
            themeDOM.html(darkIcon);
            theme = 'true';
            localStorage.setItem('theme', theme);
    
            // $('*').css({'color' : 'var(--dark-font-white)'})
            $('body').attr('id', 'dark')
            $('.main').attr('id', 'dark');
        } 
    })
});


// Function
function getInput() {
    let result = input.val().trim();

    if(result != ''){
        input.val('');
    
        let addElement = `
        <li class="list-li">
            <p class="content">${result}</p>
            <div class="btn">
                <button id="del-btn">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
                <button id="done-btn">
                    <ion-icon name="checkmark-outline"></ion-icon>
                </button>
            </div>
        </li>`;
    
        // Masukkan elemen
        listUl.append(addElement);
    
        // Del Btn
        const delBtn = listUl.find('button#del-btn');
        delBtn.on('click', function () {
            removeList(this);
        });

        // Done Btn
        const doneBtn = listUl.find('button#done-btn');
        doneBtn.on('click', function() {
            finishList(this);
        })
    }
}

// RemoveList
function removeList(e) {
    const listItem = $(e).closest("li");
    if (listItem && listUl.has(listItem).length) {
        listItem.remove();
    };
    
    if(done != 0){
        done --;
        doneDOM.text(done);
    }
}

// FinishList
function finishList(e){
    const listItem = $(e).closest('li');
    $(e).off('click');
    if(listItem && listUl.has(listItem).length){
        listItem.css({
            'backgroundColor' : 'var(--light-background-list-done)'
        });

        listItem.children('p').css({
            'color' : 'var(--light-text-white)'
        });

        listItem.find('button ion-icon').css({
            'color' : 'var(--light-text-white)'
        })
        done ++
        doneDOM.text(done);
    }
}

// Del All
function delAll() {
    let target = listUl.find('li');

    target.remove();
}

// Get Theme
function getTheme(){
    if(localStorage.getItem('theme')){
        return localStorage.getItem('theme');
    }

    else{
        localStorage.setItem('theme', false);
        return 'false';
    }
}


// Render Theme
function renderTheme(){

    if(theme == 'true'){
        // $('*').css('color', 'var(--dark-text-white)');
        $('body').attr('id', 'dark');
        $('.main').attr('id', 'dark');
        themeDOM.html(lightIcon);
    }
    else{
        // $('*').css('color', 'var(--light-text-black)');
        $('body').attr('id', 'light');
        $('.main').attr('id', 'light');
        themeDOM.html(darkIcon);
    }
    
}