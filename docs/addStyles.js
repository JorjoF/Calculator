/*
    Code used to dynamicaly add tailwind styling to Components like the screen or buttons
*/

const bodyClass="bg-green-600 bg-gradient-to-br from-zinc-800 bg-opacity-25";
const bdy = document.querySelector('body');
bodyClass.split(' ').forEach((cls) => bdy.classList.add(cls));

const calcBdy = "max-w-lg rounded overflow-hidden shadow-2xl bg-green-300 bg-gradient-to-tr from-emerald-800 bg-opacity-75 flex flex-col";
const clc = document.getElementById('calculator');
calcBdy.split(' ').forEach((cls) => clc.classList.add(cls));

const outputClass = "flex flex-col w-auto h-12 justify-center items-end m-1 bg-gray-300 text-gray-900 font-semibold px-2 border border-black hover:border-gray-500 rounded";
const otp = document.getElementById('output');
outputClass.split(' ').forEach((cls) => otp.classList.add(cls));

const previousNumberClass ="flex max-w-lg h-1/3 pb-5 pt-1 text-gray-600 text-xs";
const pn = document.getElementById('previousNumber');
previousNumberClass.split(" ").forEach((cls) => pn.classList.add(cls));

const currentNumberClass ="flex max-w-lg h-2/3 pd-2 text-xl";
const cn = document.getElementById('previousNumber');
currentNumberClass.split(" ").forEach((cls) => cn.classList.add(cls));

const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
    addClasses(btn);
});

function addClasses(btn){
    const btnNumberClass = "hover:bg-green-500 border-green-500";
    const btnClearClass = "hover:bg-orange-500 border-orange-500";
    const btnOpClass = "hover:bg-blue-500 border-blue-500";
    const btnEqClass = "hover:bg-red-500 border-red-500";
    const btnDecClass = "hover:bg-yellow-500 border-yellow-500";
    if(btn.classList.value === 'number'){
        btnNumberClass.split(' ').forEach((cls) => btn.classList.add(cls));
    } else if(btn.classList.value === 'operator'){
        btnOpClass.split(' ').forEach((cls) => btn.classList.add(cls));
    } else if(btn.classList.value ==="clear" || btn.classList.value === "sign"){
        btnClearClass.split(' ').forEach((cls) => btn.classList.add(cls));
    } else if(btn.classList.value ==="equal"){
        btnEqClass.split(' ').forEach((cls) => btn.classList.add(cls));
    } else if(btn.classList.value ==="decimal"){
        btnDecClass.split(' ').forEach((cls) => btn.classList.add(cls));
    }
    const baseClass = "flex w-12 h-12 justify-center items-center m-1 font-bold py-2 px-2 hover:border-transparent rounded text-white border-2 text-2xl"
    baseClass.split(' ').forEach((cls) => btn.classList.add(cls));
}
