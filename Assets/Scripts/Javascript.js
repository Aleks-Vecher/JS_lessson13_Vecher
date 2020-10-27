async function server() {
    let response = await fetch('https://reqres.in/api/users?page=2');
    let data = await response.json();
    return data.data;
}

function drow(mass) {
    let table = document.querySelector('.table');
    table.innerHTML = '';
    mass.forEach(item => {
        table.innerHTML += `
          <tr>
            <th><img src='${item.avatar}'></th>
            <th>${item.first_name}</th>
            <th>${item.last_name}</th>
            <th>${item.id}</th>
            <th>${item.email}</th>           
          </tr>
        `
    })
}

server().then(data => drow(JSON.parse(localStorage.getItem('users')) || data));

let btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
    let select = document.querySelector('select');
    let str = '';
    let table = document.querySelector('.table');
    let user = [];
    if (select.value != 'all') {
        for (let i = 0; i < select.value; i++) {
            server().then((item) => {
                str += `
            <tr>
              <th><img src='${item[i].avatar}'></th>
              <th>${item[i].first_name}</th>
              <th>${item[i].last_name}</th>
              <th>${item[i].id}</th>
              <th>${item[i].email}</th>           
            </tr>
          `
                table.innerHTML = str;
                user.push(item[i]);
                localStorage.setItem('users', JSON.stringify(user));
            });
        }
    } else {
        server().then(data => {
            drow(data);
            localStorage.setItem('users', JSON.stringify(data))
        });
    }
}
)