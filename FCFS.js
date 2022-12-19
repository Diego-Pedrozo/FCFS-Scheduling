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

  getTask() {
    let copyTask = JSON.parse(JSON.stringify(this.tasks))
    return copyTask;
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
    let i = 0;
    let loop = setInterval(() => {
      if (taskLenght < this.tasks.length) {
        //wait(300);
        if (this.tasks[0].count < this.tasks[0].burstTime) {
          res = this.tasks[0].run();
          salida.innerHTML += `<p>${res}</p>`;
          procesos[c].classList.add("animacion");
          let data = {
            label: this.tasks[0].name,
            y: pos,
            x: i + inicio,
            x2: i + inicio + 1
          }
          console.log(data);
          i++;
          newChart.series[0].addPoint(data);
        }
        else {
          procesos[c].classList.add("finAnimacion");
          procesos[c].classList.add("procesoCompletado");
          res = this.tasks[0].onFinish();
          c++;
          salida.innerHTML += `<p>${res}</p>`;
          i = 0;
          inicio = Number(inicio) + Number(this.tasks[0].burstTime);
          pos++;
          let proceso = this.tasks.shift();
          //procesosVer.push(proceso);
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
    procesos.forEach(element => {
      element.classList.remove("procesoCompletado");
    });
    newChart.series[0].setData([]);
    newChart.yAxis[0].setCategories([]);
    pos = 0;
    inicio = 0;
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
  let boolean = true;
  var nFilas = document.getElementById('tablaProcesos').getElementsByTagName('tr').length - 1;
  if (nFilas == 1) {
    boolean = false;
    Swal.fire(
      'There are no existing processes',
      '',
      'error'
    )
  }
  burstTime.forEach(element => {
    var valor = element.value;
    if (valor == "") {
      boolean = false;
      Swal.fire(
        'Please fill in all the fields',
        '',
        'error'
      )
    }
  });
  if (boolean == true) {
    burstTime.forEach(element => {
      var valor = element.value;
      scheduler.addTask(new Task("P" + nProcess++, valor));
    });
    scheduler.run();
  }
  crearCategorias();
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

//Global
let procesosVer = [];
let newChart = null;
let categories = [];
let pos = 0;
let inicio = 0;

function mountChart() {
  newChart = new Highcharts.chart('container', {
    chart: {
      type: 'xrange',
      className: 'ganttChart',
      backgroundColor: "#202529",
      borderRadius: 5,
      padding: 20
    },
    title: {
      text: '',
      style: {
        color: "#ffff",
        fontSize: 30
      }
    },
    credits: {
      enabled: false,
      href: 'https://github.com/FractureDVL/Priority-Scheduling',
      text: 'FractureDVL',
      style: {
        color: '#ffff',
        fontSize: 10
      }
    },
    colors: ["#FDF5E6", "#FFB6C1", "#ADD8E6", "#FFA07A", "#20B2AA", "#FAFAD2", "#90EE90", "#D3D3D3", "#87CEEB", "#778899", "#B0C4DE", "#FFFFE0", "#00FF7F", "#4682B4", "#D2B48C", "#008080", "#D8BFD8", "#FFE4B5", "#F0FFFF", "#E0FFFF"],
    xAxis: {
      type: 'linear',
      title: 'Series',
      labels: {
        fontFamily: 'Avenir Next W01',
        style: {
          color: "#ffff",
          fontSize: 15
        }
      },
      title: {
        text: ''
      }
    },
    yAxis: {
      //array con categorias
      categories: [],
      reversed: true,
      labels: {
        fontFamily: 'Avenir Next W01',
        style: {
          color: "#ffff",
          fontSize: 15
        }
      },
    },
    series: [{
      name: '',
      // data y: indexador de categorias, x:ragon incio, x2: rango final
      data: []
    }]
  });
}

function crearCategorias() {
  let nProcess = 1;
  let burstTime = document.getElementsByName('burstTime[]');
  burstTime.forEach(element => {
    categories.push("P" + nProcess++);
  });
  console.log(categories);
  newChart.yAxis[0].setCategories(categories);
}

function verProcesos() {
  procesosVer.forEach(element => {
    console.log(element);
    let rango = Number(element.burstTime);
    for (let i = 0; i < rango; i++) {
      let data = {
        label: `${element.name}`,
        y: pos,
        x: i + inicio,
        x2: i + inicio + 1
      }
      newChart.series[0].addPoint(data);
    }
    inicio = inicio + rango;
    pos++;
  });
}


