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
    let cnt = document.getElementById('cnt');
    cnt.innerHTML = `<p id="salida"></p>`;
    let salida = document.getElementById('salida');
    salida.innerHTML += `<p>Processing...</p>`;
    console.log("Processing...");
    let res = "";
    let taskLenght = 0;
    let loop = setInterval(() => {
      if (taskLenght < this.tasks.length) {
        //wait(300);
        if (this.tasks[0].count < this.tasks[0].burstTime) {
          res = this.tasks[0].run();
          salida.innerHTML += `<p>${res}</p>`;
        }
        else {
          res = this.tasks[0].onFinish();
          salida.innerHTML += `<p>${res}</p>`;
          this.tasks.shift();
        }
      }
      else {
        clearInterval(loop);
        salida.innerHTML += `<p>All processes have been completed.</p>`;
        salida.innerHTML += `<h1>MAMAMA MAINKRA.</h1>`;
        salida.innerHTML += `<img style="width: 500px" src="https://pbs.twimg.com/media/CdZhbN3UkAE4SSs.jpg:large" alt=""></img>`
      }
    }, 500);
    // while (this.tasks.length) {
    //   wait(300);
    //   if (this.tasks[0].count < this.tasks[0].burstTime) {
    //     res = this.tasks[0].run();
    //     salida.innerHTML += `<p>${res}</p>`;
    //   }
    //   else {
    //     res = this.tasks[0].onFinish();
    //     salida.innerHTML += `<p>${res}</p>`;
    //     this.tasks.shift();
    //   }
    // }
    // salida.innerHTML += `<p>All processes have been completed.</p>`;
    // console.log("All processes have been completed.")
  }
}

// function prueba() {
//   let a = 0;
//   let salida = document.getElementById('salida');
//   let loop = setInterval(() => {
//     if (a < 10) {
//       salida.innerHTML += `<p>${a}</p>`;
//       a++;
//     }
//     else clearInterval(loop);
//   }, 1000);
// }

function limpiar2() {
  var zParrafos = document.querySelectorAll("p") //array de nodos párrafo;
  var zBody = document.querySelectorAll("body")[0];
  zBody.removeChild(zParrafos[1]);
}

function limpiar() {
  document.location.reload();
}

const scheduler = new Scheduler();

scheduler.addTask(new Task("A", 6));
scheduler.addTask(new Task("B", 3));
scheduler.addTask(new Task("C", 8));
scheduler.addTask(new Task("D", 3));

//scheduler.run();

