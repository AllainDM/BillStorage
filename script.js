// Основные массивы

let arr = [
    {monter: 'Анатолий Чепига', mac: '10feed1572ab', macConvert: '10feed1572ac', comment: '', status: 'На руках', model: 'c20', idUser: '', date: new Date(2021, 6, 12, 15, 24, 10, 0).toLocaleString()},
    {monter: '', mac: '10feed157311', macConvert: '10feed157312', comment: '', status: 'В офисе', model: 'c20', idUser: '', date: ''},
    {monter: 'Руслан Боширов', mac: '10feed15ba78', macConvert: '10feed15ba79', comment: '', status: 'На руках', model: 'c20', idUser: '15758', date: new Date(2021, 7, 15, 12, 1, 17, 0).toLocaleString()},
    {monter: '', mac: '10feed15bc9f', macConvert: '10feed15bca0', comment: '', status: 'В офисе', model: 'c20', idUser: '', date: ''},
]; 

console.log(arr[0][mac]);
console.log(arr[0].mac);

let arrMac = ['10feed1572ab', '10feed157311', '10feed15ba78', '10feed15bc9f']; // Отдельный массив с маками

let arrHand = [];

// Конвертирование мака

let macConvert;

function hex2dec(hex) { // 16 в 10
  return parseInt(hex,16); 
}

function dec2hex(hex) { // 10 в 16
  return Number(hex).toString(16);
}

function convertMac(mac) { // Функция преобразует мак в десятичное и обратно, между добавляя 1 к значению
    macConvert = hex2dec(mac);
    macConvert += 1;
    macConvert = dec2hex(macConvert);
    console.log(macConvert);
}

// Выбор типо учетки монтажника

let curMonter = 'Анатолий Чепига';

document.getElementById('monter-main').addEventListener('click', () => {
    selectMainMonter();
})

function selectMainMonter () {
    let m = document.getElementById('monter-main');
    mainMonter = m.options[m.selectedIndex].text;
    document.getElementById('router1').innerText = '(1)';
    console.log(mainMonter);
}


// Добавление нового оборудования

document.getElementById('output').addEventListener('click', () => {
    let status;
    let mod = document.getElementById('model');
    let model = mod.options[mod.selectedIndex].text;
    let comment = document.getElementById('comment').value;
    let idUser = '';
    let date = '';

    let mon = document.getElementById('monter');
    let monter = mon.options[mon.selectedIndex].text;
    if (monter != '') {
        status = 'На руках';
    } else {
        status = "В офисе"
    }

    let mac = document.getElementById('mac').value;
    if (mac == '') {
        alert('Укажите мак адрес. Так же нужно сделать проверку на правильное написание мак адреса и на его совпадение');
        return;
    }

    // Проверка на совпадение мака. Временно отключено!!!
    // for (let item = 0; item < arr.length; item++) {
    //     if (mac == arr[item].mac) {
    //         alert('Такой мак адрес уже существует');
    //         return;
    //     }
    // }

    arrMac.push(mac);
    console.log(arrMac);
    convertMac(mac);
    arr.push({monter, mac, comment, model, idUser, date, status, macConvert});  // При добавлении на "склад" не указывать Монтажника, ИД и Дату
    console.log(arr);
    console.table(arr);
    all();
});

// Вывод оборудования. Функция создает новый элемент таблицы из основного массива

function outStart() {
    document.getElementById('tab').innerText = '';
    arr.forEach((item, number) => {
        let a = document.getElementById('tab');
        a.insertAdjacentHTML('beforeend', 
        `<tr class="table-color">
            <td id='th-model'>${item.model}</td>
            <td id='th-mac'>${item.mac}<br>${item.macConvert} </td> 
            <td id='th-status'>${item.status}</td> 
            <td id='th-monter'><select id="monter${number + 1}">
                <option value="222">${item.monter}</option>
                <option value="222">Анатолий Чепига</option>
                <option value="333">Руслан Боширов</option>
                <option value="444">Александр Петров</option>
            </select></td>
            <td id='th-id'><input type="text" class="input-id" id="idUser${number + 1}" size="6px" value="${item.idUser}"></td> 
            <td id='th-comment'>${item.comment}</td> 
            <td id='th-date'>${item.date}</td> 
            <td id='th-model'><button class="btn-save">Сохранить</button></td>
            <td id='th-model'><button class="btn-close">Закрыть</button></td>
        </tr>`)
    })
};

outStart();

// Кнопка сохранить изменения в выбраном роутере

function btnSave() {
    document.querySelectorAll('.btn-save').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            console.log(i);
            // let id = document.getElementById(`idUser${i + 1}`).value;
            
            let mon = document.getElementById(`monter${i + 1}`);
            let monter2 = mon.options[mon.selectedIndex].text;
            arr[i].monter = monter2;
            if (arr[i].monter !== '') {
                arr[i].status = 'На руках';
            }
            arr[i].idUser = document.getElementById(`idUser${i + 1}`).value; //id;
            if (arr[i].idUser !== ''){
                arr[i].comment = `<a href="https://bill.unetcom.ru/?mod=usr&act=viewinfo&uid=${arr[i].idUser}"> ID: ${arr[i].idUser}</a>`;
                arr[i].status = 'Установлен'
            }
            console.log(monter);
            arr[i].date = new Date().toLocaleString();
            all();
        })
    })
};

btnSave();

// Кнопка "закрыть", для удаления роутера в архив

function btnClose() {
    document.querySelectorAll('.btn-close').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if (arr[i].idUser != '') {
                alert(`Роутер с маком ${arr[i].mac} будет удален`);
                arr.splice(i, 1);
            } else {
                alert(`Роутер не установлен`);
            }
            
            all();
            console.log(arr);
        })
    })
};

btnClose();

// Функция сортировки массива по массивам

function newArr() {
    for ( let i = 0; i < arr.length; i++) {
        if (arr[i].status == 'На руках') {
            arrHand.push(i);
            arr.splice(i, 1);
            console.log(arr);
            console.log(arrHand);
            all();
        }
    }
        
    
};

newArr();

// Функция запускающая всякие разные функции

function all() {
    outStart();
    btnSave();
    btnClose();
    newArr();
}

// Добавление даты на страницу

let newDate = new Date().toLocaleString();
document.getElementById('date').innerHTML += `[${newDate}] Время выполнения скрипта: не засекалось!`;

