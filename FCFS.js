class Task {
  constructor(name, burstTime) {
    this.name = name
    this.count = 0;
    this.burstTime = burstTime;
  }

  run() {
    this.count++;
    console.log(this.name + " " + this.count + " " + this.burstTime + " \r");
    return this.name + " " + this.count + " " + this.burstTime;
  }

  onFinish() {
    console.log("Process " + this.name + " Completed")
    return "Process " + this.name + " Completed";
  }
}

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

class Scheduler {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task)
  }

  run() {
    let procesos = document.querySelectorAll("tbody > tr.procesos")

    let cnt = document.getElementById('cnt');
    cnt.innerHTML = `<p id="salida"></p>`;
    let salida = document.getElementById('salida');
    salida.innerHTML += `<p>Processing...</p>`;
    console.log("Processing...");
    let res = "";
    let taskLenght = 0;
    let c = 0;
    let loop = setInterval(() => {
      if (taskLenght < this.tasks.length) {
        //wait(300);
        if (this.tasks[0].count < this.tasks[0].burstTime) {
          res = this.tasks[0].run();
          salida.innerHTML += `<p>${res}</p>`;
          procesos[c].classList.add("animacion");
        }
        else {
          procesos[c].classList.add("finAnimacion");
          res = this.tasks[0].onFinish();
          c++;
          salida.innerHTML += `<p>${res}</p>`;
          this.tasks.shift();
        }
        cnt.scrollTop = cnt.scrollHeight;
        procesos[c].classList.remove("finAnimacion");
      }
      else {
        clearInterval(loop);
        salida.innerHTML += `<p>All processes have been completed.</p>`;
        cnt.scrollTop = cnt.scrollHeight;
        //salida.innerHTML += `<h1>MAMAMA MAINKRA.</h1>`;
        //salida.innerHTML += `<img style="width: 500px" src="https://pbs.twimg.com/media/CdZhbN3UkAE4SSs.jpg:large" alt=""></img>`
      }
    }, 1000);
  }
}

function limpiar() {
  document.location.reload();
}

function insertarFila() {
  var nFilas = document.getElementById('tablaProcesos').getElementsByTagName('tr').length - 1;

  let tablaProcesos = document.getElementById('tablaProcesos').insertRow(nFilas);
  tablaProcesos.className = "procesos";
  let col1 = tablaProcesos.insertCell(0);
  let col2 = tablaProcesos.insertCell(1);
  let col3 = tablaProcesos.insertCell(2);


  col1.innerHTML = `<td id="name[]" name="name[]">P${nFilas}</td>`;
  col2.innerHTML = `<input id="burstTime[]" name="burstTime[]" type="number" style="width: 40px; border: none; background-color: transparent;" class="text-center">`;
  col3.innerHTML = `<td>${nFilas - 1}</td>`;
}

function crearProcesos() {
  let nProcess = 1;
  let burstTime = document.getElementsByName('burstTime[]');
  burstTime.forEach(element => {
    var valor = element.value;
    scheduler.addTask(new Task("P" + nProcess++, valor));
  });
}

const scheduler = new Scheduler();

// scheduler.addTask(new Task("1", 6));
// scheduler.addTask(new Task("2", 3));
// scheduler.addTask(new Task("3", 8));
// scheduler.addTask(new Task("4", 3));

function ola() {
  let procesos = document.querySelectorAll("tbody > tr.procesos");

  procesos[0].classList.add("animacion");
  setTimeout(() => {
    procesos[0].classList.remove("animacion");
  }, 1000);

}


