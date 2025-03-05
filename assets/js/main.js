const inp = document.getElementById('inp');

var m = [1,2,3,4, 5, 6, 7, 8, 9];
var curretOrdo = 0;
var ordo = 2;
function render() {
    for(let i = 0; i < ordo*ordo; i++) {
        if(m[i] !== undefined) {
            document.getElementById(`m${i+1}`).innerHTML = m[i];
        } else {
            document.getElementById(`m${i+1}`).innerHTML = null;
        }
    }
}

function reset() {
    m = [];
    render();
}

inp.addEventListener('keydown', function(event){
    if(event.key === 'Enter' ) {
        const value = event.target.value;
        if(value.length == 0) {
            alert(`Masukkan nomor`);
        } else if(isNaN(value)) {
            alert(`${value} bukan nomor`);
        } else {
            if(m.length < ordo*ordo) {
                m.push(value);
                render();
                inp.value = ''
            }
        }
    }
});

const contain = document.getElementById('contain');
function setOrdo(val) {
    ordo = val;
    // reset();
    render();
    if(val === 2) {
        contain.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
        contain.style.width = '8rem';
        for(let el = 5; el <= 9; el++) {
            document.getElementById(`m${el}`).classList.add('hidden');
            document.getElementById(`m${el}`).classList.remove('flex');
        }
    } else {
        contain.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
        contain.style.width = '12rem';
        for(let el = 5; el <= 9; el++) {
            document.getElementById(`m${el}`).classList.remove('hidden');
            document.getElementById(`m${el}`).classList.add('flex');
        }
    }
}

let index = 0;
let message = '';
const result = document.getElementById('result');

function typeWritter() {
    if(index <= message.length) {
        if(message.charAt(index) === '\n') {
            result.innerHTML += '<br>';
        } else if (message.charAt(index) === '[') {
            // Format element html [tag:value]
            let tag = '';
            while (message.charAt(index) !== ']') {
                tag += message.charAt(index);
                index++;
            }
            if(tag.includes('[sb:')) {
                tag = `<sub>${tag.substr(4)}</sub>`
            } else if(tag.includes('[sp:')) {
                tag = `<sup>${tag.substr(4)}</sup>`
            }
            
            result.innerHTML += tag;
        } else {
            result.innerHTML += message.charAt(index);
        }
        index++;
        setTimeout(typeWritter, 10);
    }
}

function sarrusOrdo2() {
    message += "Mencari determinan metode sarrus?\n";
    message += `|D| = (${m[0]} x ${m[3]}) - (${m[1]} x ${m[2]})\n`;
    message += `|D| = (${m[0] * m[3]}) - (${m[1] * m[2]})\n`;
    message += `|D| = ${(m[0] * m[3]) - (m[1] * m[2])}\n`;
    typeWritter();
}

function sarrusOrdo3() {
    message += "Mencari determinan metode sarrus?\n";
    message += `|D| = (${m[0]} x ${m[4]} x ${m[8]}) + (${m[1]} x ${m[5]} x ${m[6]}) + (${m[2]} x ${m[7]} x ${m[3]}) \n- `;
    message += `(${m[2]} x ${m[4]} x ${m[6]}) + (${m[5]} x ${m[7]} x ${m[0]}) + (${m[8]} x ${m[3]} x ${m[1]})\n`;
    message += `|D| = (${m[0] * m[4] * m[8]} + ${m[1] * m[5] * m[6]} + ${m[2] * m[7] * m[3]}) - (${m[2] * m[4] * m[6]} + ${m[5] * m[7] * m[0]} + ${m[8] * m[3] * m[1]})\n`;
    message += `|D| = ${m[0] * m[4] * m[8] + m[1] * m[5] * m[6] + m[2] * m[7] * m[3]} - ${m[2] * m[4] * m[6] + m[5] * m[7] * m[0] + m[8] * m[3] * m[1]}\n`;
    message += `|D| = ${(m[0] * m[4] * m[8] + m[1] * m[5] * m[6] + m[2] * m[7] * m[3]) - (m[2] * m[4] * m[6] + m[5] * m[7] * m[0] + m[8] * m[3] * m[1])}\n`;
    typeWritter();
}

function mk2() {
    message += "Mencari determinan metode minor kofaktor?\n\n";
    message += `M[sb:11] = ${m[3]} → a[sb:11] = (-1)[sp:(1+1)] x ${m[3]} = ${1 * m[3]}, a[sb:11] = ${m[0]}\n`;
    message += `M[sb:12] = ${m[2]} → a[sb:12] = (-1)[sp:(1+2)] x ${m[2]} = ${-1 * m[2]}, a[sb:12] = ${m[1]}\n`;
    message += `|D| = (${m[0]} x ${1 * m[3]}) + (${m[1]} x ${-1 * m[2]}) =`;
    message += `${m[0] * 1 * m[3]} + ${m[1] * -1 * m[2]} = `;
    message += `${(m[0] * 1 * m[3]) + (m[1] * -1 * m[2])} \n\n`;

    message += `M[sb:21] = ${m[1]} → a[sb:21] = (-1)[sp:(2+1)] x ${m[1]} = ${-1 * m[1]}, a[sb:21] = ${m[2]}\n`;
    message += `M[sb:22] = ${m[0]} → a[sb:22] = (-1)[sp:(2+2)] x ${m[0]} = ${1 * m[0]}, a[sb:22] = ${m[3]}\n`;
    message += `|D| = (${m[2]} x ${1 * m[1]}) + (${m[3]} x ${-1 * m[0]}) =`;
    message += `${m[2] * -1 * m[1]} + ${m[3] * 1 * m[0]} = `;
    message += `${(m[2] * -1 * m[1]) + (m[3] * 1 * m[0])}\n\n`;

    message += `Determinan = ${(m[2] * -1 * m[1]) + (m[3] * 1 * m[0])}\n`
    
    typeWritter();
}

function mk3() {
    message += "Mencari determinan metode minor kofaktor?\n\n";
    message += `M[sb:11] = (${m[4]} x ${m[8]}) - (${m[5]} x ${m[7]}) = ${m[4] * m[8] - m[5] * m[7]} → a[sb:11] = (-1)[sp:(1+1)] x ${m[4] * m[8] - m[5] * m[7]} = ${1 * (m[4] * m[8] - m[5] * m[7])}, a[sb:11] = ${m[0]}\n`;
    message += `M[sb:12] = (${m[3]} x ${m[8]}) - (${m[5]} x ${m[6]}) = ${m[3] * m[8] - m[5] * m[6]} → a[sb:12] = (-1)[sp:(1+2)] x ${m[3] * m[8] - m[5] * m[6]} = ${-1 * (m[3] * m[8] - m[5] * m[6])}, a[sb:12] = ${m[1]}\n`;
    message += `M[sb:13] = (${m[3]} x ${m[7]}) - (${m[4]} x ${m[6]}) = ${m[3] * m[7] - m[4] * m[6]} → a[sb:13] = (-1)[sp:(1+3)] x ${m[3] * m[7] - m[4] * m[6]} = ${1 * (m[3] * m[7] - m[4] * m[6])}, a[sb:13] = ${m[2]}\n`;
    message += `|D| = (${m[0]} x ${1 * (m[4] * m[8] - m[5] * m[7])} + (${m[1]} x ${-1 * (m[3] * m[8] - m[5] * m[6])}) + (${m[2]} x ${1 * (m[3] * m[7] - m[4] * m[6])}) = `;
    message += `${m[0] * 1 * (m[4] * m[8] - m[5] * m[7])} + ${m[1] * -1 * (m[3] * m[8] - m[5] * m[6])} + ${m[2] * 1 * (m[3] * m[7] - m[4] * m[6])} = `;
    message += `${m[0] * 1 * (m[4] * m[8] - m[5] * m[7]) + m[1] * -1 * (m[3] * m[8] - m[5] * m[6]) + m[2] * 1 * (m[3] * m[7] - m[4] * m[6])}\n\n`;

    message += `M[sb:21] = (${m[1]} x ${m[8]}) - (${m[2]} x ${m[7]}) = ${m[1] * m[8] - m[2] * m[7]} → a[sb:21] = (-1)[sp:(2+1)] x ${m[1] * m[8] - m[2] * m[7]} = ${-1 * (m[1] * m[8] - m[2] * m[7])}, a[sb:21] = ${m[3]}\n`;
    message += `M[sb:22] = (${m[0]} x ${m[8]}) - (${m[2]} x ${m[6]}) = ${m[0] * m[8] - m[2] * m[6]} → a[sb:22] = (-1)[sp:(2+2)] x ${m[0] * m[8] - m[2] * m[6]} = ${1 * (m[0] * m[8] - m[2] * m[6])}, a[sb:22] = ${m[4]}\n`;
    message += `M[sb:23] = (${m[0]} x ${m[7]}) - (${m[1]} x ${m[6]}) = ${m[0] * m[7] - m[1] * m[6]} → a[sb:23] = (-1)[sp:(2+3)] x ${m[0] * m[7] - m[1] * m[6]} = ${-1 * (m[0] * m[7] - m[1] * m[6])}, a[sb:23] = ${m[5]}\n`;
    message += `|D| = (${m[3]} x ${-1 * (m[1] * m[8] - m[2] * m[7])} + (${m[4]} x ${1 * (m[0] * m[8] - m[2] * m[6])}) + (${m[5]} x ${-1 * (m[0] * m[7] - m[1] * m[6])}) = `;
    message += `${m[3] * -1 * (m[1] * m[8] - m[2] * m[7])} + ${m[4] * 1 * (m[0] * m[8] - m[2] * m[6])} + ${m[5] * -1 * (m[0] * m[7] - m[1] * m[6])} = `;
    message += `${m[3] * -1 * (m[1] * m[8] - m[2] * m[7]) + m[4] * 1 * (m[0] * m[8] - m[2] * m[6]) + m[5] * -1 * (m[0] * m[7] - m[1] * m[6])}\n\n`;

    message += `M[sb:31] = (${m[1]} x ${m[5]}) - (${m[2]} x ${m[4]}) = ${m[1] * m[5] - m[2] * m[4]} → a[sb:31] = (-1)[sp:(3+1)] x ${m[1] * m[5] - m[2] * m[4]} = ${1 * (m[1] * m[5] - m[2] * m[4])}, a[sb:31] = ${m[6]}\n`;
    message += `M[sb:32] = (${m[0]} x ${m[5]}) - (${m[2]} x ${m[3]}) = ${m[0] * m[5] - m[2] * m[3]} → a[sb:32] = (-1)[sp:(3+2)] x ${m[0] * m[5] - m[2] * m[3]} = ${-1 * (m[0] * m[5] - m[2] * m[3])}, a[sb:32] = ${m[7]}\n`;
    message += `M[sb:33] = (${m[0]} x ${m[4]}) - (${m[1]} x ${m[3]}) = ${m[0] * m[4] - m[1] * m[3]} → a[sb:33] = (-1)[sp:(3+3)] x ${m[0] * m[4] - m[1] * m[1]} = ${1 * (m[0] * m[4] - m[1] * m[3])}, a[sb:33] = ${m[8]}\n`;
    message += `|D| = (${m[6]} x ${1 * (m[1] * m[5] - m[2] * m[4])} + (${m[7]} x ${-1 * (m[0] * m[5] - m[2] * m[3])}) + (${m[8]} x ${1 * (m[0] * m[4] - m[1] * m[3])}) = `;
    message += `${m[6] * 1 * (m[1] * m[5] - m[2] * m[4])} + ${m[7] * -1 * (m[0] * m[5] - m[2] * m[3])} + ${m[8] * 1 * (m[0] * m[4] - m[1] * m[3])} = `;
    message += `${m[6] * 1 * (m[1] * m[5] - m[2] * m[4]) + m[7] * -1 * (m[0] * m[5] - m[2] * m[3]) + m[8] * 1 * (m[0] * m[4] - m[1] * m[3])}\n\n`;

    message += `Determinan = ${m[6] * 1 * (m[1] * m[5] - m[2] * m[4]) + m[7] * -1 * (m[0] * m[5] - m[2] * m[3]) + m[8] * 1 * (m[0] * m[4] - m[1] * m[3])}\n`;
    
    typeWritter();
}

function search(method) {
    index = 0;
    result.innerHTML = '';
    message = '';
    if(m.length >= ordo*ordo) {
        if(ordo === 2) {
            method === 'sa' ?
            sarrusOrdo2() :
            mk2();
        } else {
            method === 'sa' ?
            sarrusOrdo3() :
            mk3();
        }
    } else {
        alert("Angka tidak lengkap");
    }
}

render();