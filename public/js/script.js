const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
  
  function newActivity(id) {
    //Cria uma nova atividade com seus atributos
    actList[id] = {
      title: null,
      project: null,
      tags: null,
      billable: null,
      timeList: [],
    }
  }
  
  let actList = {} //Lista de todas as atividades e seus atributos
  
  function timestrToSec(timestr) {
    //converte formato de tempo para segundos
    var parts = timestr.split(':')
    return parts[0] * 3600 + parts[1] * 60 + +parts[2]
  }
  
  function pad(num) {
    if (num < 10) {
      return '0' + num
    } else {
      return '' + num
    }
  }
  
  function formatTime(seconds) {
    //Converte segundos para formato de tempo
    return [
      pad(Math.floor(seconds / 3600)),
      pad(Math.floor(seconds / 60) % 60),
      pad(seconds % 60),
    ].join(':')
  }
  
  !(function updateTimers() {
    //Função de atualiza todos os relógios
    setTimeout(updateTimers, 500)
  
    for (var prop in actList) {
      if (actList[prop]['timeList'].length % 2) {
        let soma = 0
        //ESTÁ ATIVO
        for (var i = 0; i < actList[prop]['timeList'].length - 1; i = i + 2) {
          soma =
            soma +
            Math.abs(
              actList[prop]['timeList'][i + 1] - actList[prop]['timeList'][i]
            ) /
              1000
        }
        //alert(soma)
  
        let a = Math.round(
          soma +
            Math.abs(
              new Date() -
                actList[prop]['timeList'][actList[prop]['timeList'].length - 1]
            ) /
              1000
        )
        document.getElementById('timer--' + [prop]).innerText = formatTime(a)
      }
    }
  })()
  
  function makeTimerActive(arg) {
    if (arg in timeList) {
      timeList[arg].push(new Date())
    } else {
      timeList[arg] = []
      timeList[arg].push(new Date())
    }
  }
  
  function makeTimerDisabled(arg) {
    timeList[arg].push(new Date())
  }
  
  function iconUpdate(arg, id) {
    if (timeList[id].length % 2) {
      //Insere icone de pause
      document.getElementById(arg).innerHTML =
        '<i class="fa-solid fa-pause"></i> Pause'
    } else {
      document.getElementById(arg).innerHTML =
        '<i class="fa-solid fa-play"></i> Start'
    }
  }
  
  function createLine(id, date) {
    let input_txt = document.getElementById('activity-title--' + id).value
  
    let theLine = document.getElementById('the-line')
  
    let current_int_id = '--' + parseInt(id)
  
    let new_int_id = '--' + (parseInt(id) + 1)
  
    let sRegExInput = new RegExp(current_int_id, 'g')
  
    createDateTitle(date) //Verifica se existe titulo com resumo para o dia
  
    document
      .getElementById(
        'date-title-' + (date.getMonth() + 1) + '-' + date.getDate()
      )
      .insertAdjacentHTML(
        'afterend',
        '<div class="create-activity-line input-group">' +
          theLine.innerHTML +
          '</div>'
      )
    theLine.innerHTML = theLine.innerHTML.replace(sRegExInput, new_int_id)
  
    document.getElementById('activity-title' + current_int_id).value = input_txt
  }
  
  let cache = {
    project: null,
    tags: null,
    billable: false,
  }
  
  function actionManager(arg) {
    let id = null
    switch (true) {
      case arg.id.includes('ctrl--'): //Caso seja botão de controle start/pause
        id = arg.id.replace('ctrl--', '')
        startAct(id)
        break
      case arg.id.includes('tags--'): //Caso seja tag
        break
  
      case arg.id.includes('billable-'): //Caso seja billable
        id = arg.id.replace('billable--', '')
        isBillable(id)
        break
      default:
        console.log('Houve um erro. Contate o administrador do site.')
    }
  }
  
  function createDateTitle(date) {
    if (
      document.getElementById(
        'date-title-' + (date.getMonth() + 1) + '-' + date.getDate()
      ) == null
    ) {
      document
        .getElementById('resume-table')
        .insertAdjacentHTML(
          'afterbegin',
          '<div id="date-title-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate() +
            '" class="resume-day-title d-flex justify-content-between"><div>' +
            dayNames[date.getDay()] +
            ', ' +
            monthNames[date.getMonth()] +
            ' ' +
            date.getDate() +
            '.</div><div>Total:<span id="date-time-'+date.getDate()+date.getMonth()+'" class="time"> 00:00:00</span></div></div>'
        )
    }
  }
  
  function startAct(id) {
    let date = new Date()
  
    if (!actList[id]) {
      newActivity(id) //Cria a atividade e seus atributos
  
      //Passa os dados da variavel de cache para os dados da atividade
      actList[id]['project'] = cache['project']
      actList[id]['tags'] = cache['tags']
      actList[id]['billable'] = cache['billable']
  
      //Reinicia a variável de cache
      cache['project'] = null
      cache['tags'] = null
      cache['billable'] = false
  
      //Cria a linha com os dados das atividade
      createLine(id, date)
    }
    actList[id]['timeList'].push(date)
  }
  
  function isBillable(id) {
    if (!actList[id]) {
      //Se a atividade não tiver sido criada, grava na variavel de cache
      if (cache['billable'] == false || cache['billable'] == null) {
        document.getElementById('billable--' + id).style.color = '#0d6efd'
        cache['billable'] = true
      } else {
        document.getElementById('billable--' + id).style.color = 'gray'
        cache['billable'] = false
      }
    } else {
      //Se a atividade tiver sido iniciada, grava no objeto.
      if (actList[id]['billable'] == false || actList[id]['billable'] == null) {
        document.getElementById('billable--' + id).style.color = '#0d6efd'
        actList[id]['billable'] = true
      } else {
        document.getElementById('billable--' + id).style.color = 'gray'
        actList[id]['billable'] = false
      }
    }
  }
  