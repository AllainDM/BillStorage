// Основной массив

let arr = [
    {id: 3, monter: 'Анатолий Чепига', mac: '10feed1572ab', comment: '', model: 'a20', idUser: '15758', date: ''},
    {id: 2, monter: 'Анатолий Чепига', mac: '10feed157311', comment: '', model: 'a20', idUser: '', date: ''},
    {id: 1, monter: 'Руслан Боширов', mac: '10feed15ba78', comment: '', model: 'a20', idUser: '', date: ''},
    {id: 0, monter: 'Александр Петров', mac: '10feed15bc12', comment: '', model: 'a20', idUser: '', date: ''},
]; 

// Добавление нового оборудования

document.getElementById('output').addEventListener('click', () => {
    let mon = document.getElementById('monter');
    let monter = mon.options[mon.selectedIndex].text;
    // console.log(monter);

    let mod = document.getElementById('model');
    let model = mod.options[mod.selectedIndex].text;
    // console.log(model);

    let date = new Date().toLocaleString();
    // console.log(date);

    let mac = document.getElementById('mac').value;
    if (mac == '') {
        alert('Укажите мак адрес. Так же нужно сделать проверку на правильное написание мак адреса и на его совпадение');
        return;
    }
    // console.log(mac);

    let comment = document.getElementById('comment').value;
    // console.log(comment);

    let idUser = '';

    arr.push({monter, mac, comment, model, idUser, date});  // При добавлении на "склад" не указывать Монтажника, ИД и Дату
    console.log(arr);
    outStart();
    btnSave();
});

// Вывод оборудования

function outStart() {
    document.getElementById('tab').innerText = '';
    arr.forEach((item) => {
        let a = document.getElementById('tab');
        // a.insertAdjacentHTML('afterbegin', `<div> Модель: ${item.model} Mac: ${item.mac} Монтажник: ${item.monter} ID: ${item.idUser} Комментарий: ${item.comment} Дата: ${item.date}</div>`)
        a.insertAdjacentHTML('beforeend', 
        `<tr class="table-color" ><td id='th-model'>${item.model}</td>
        <td id='th-mac'>${item.mac}</td> 
        <td id='th-monter'><select id="monter">
            <option value="222">${item.monter}</option>
            <option value="222">Анатолий Чепига</option>
            <option value="333">Руслан Боширов</option>
            <option value="444">Александр Петров</option>
        </select></td>
        <td id='th-id'><input type="text" class="input-id" id="idUser" size="6px" value="${item.idUser}"></td> 
        <td id='th-comment'>${item.comment}</td> 
        <td id='th-date'>${item.date}</td> 
        <td id='th-model'><button class="btn-save">Сохранить</button></td>
        <td id='th-model'><button>Закрыть</button></td>
        </tr>`)
    })
};
// <td id='th-comment'>${item.comment}</td> 
// <td id='th-monter'>${item.monter}</td>

outStart();

function btnSave() {
    document.querySelectorAll('.btn-save').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            console.log(i);
            console.log(arr[i].mac);
            let id = arr[i].mac;
            arr[i].idUser = id;
            outStart();
            btnSave();
        })
    })
};

btnSave();

