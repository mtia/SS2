
ITA = 1;
ENG = 0;

var lang = 1;

IDXTITLE = 1;
IDXNAMECHORD = 2;
IDXTONALITY = 3;
IDXUNDO = 4;
IDXPAR1 = 5;
IDXPAR2 = 6;
IDXTRI1 = 7;
IDXTRI2 = 8;
IDXTONALITY2 = 9;
IDXTIMER = 10;
IDXCHORD2 = 11;
IDXBTNLBLS = 12;



msg = [
  [
    "",
    "hold on the chord to plot it",
    "it is not a chord",
    "Tonality: ",
    "undo",
    "parallels",
    "voices",
    "tritone between voice ",
    "and past voice ",
    "",
    "Timer: ",
    "Detected chord: ",
    "Tritone <br><br> Parallels <br><br> Sensibles <br><br> Cantus"
  ],
  [
    "",
    "mantieni un accordo",
    "accordo non riconosciuto",
    "Tonalità: ",
    "annulla",
    "voci ",
    " 5° o 8° per moto retto",
    "tritono tra la voce ",
    "e la precedente ",
    "",
    "Tempo: ",
    "Accordo rilevato: ",
    "Tritono <br><br> Parallele <br><br> Sensibili <br><br> Cantus"
  ]
]




function changeLang(){
  langdiv = document.getElementById("lang");
  titlediv = document.getElementById("titleh");
  undolbl = document.getElementById("undobutton");
  tonaldiv = document.getElementById("tonalitylbl");
  timer = document.getElementById("timer");
  detectedChordlbl = document.getElementById("chordlbl");
  buttonLabel = document.getElementById("buttonlabels");
  switch(lang){
    case 0:
      lang=1;
      langdiv.innerHTML = "ITA";
      break;
    case 1:
      lang=0;
      langdiv.innerHTML = "ENG";
  }
  titlediv.innerHTML = msg[lang][IDXTITLE];
  undolbl.innerHTML = "<i class=\"fa fa-undo\"></i> "+msg[lang][IDXUNDO];
  tonaldiv.innerHTML = msg[lang][IDXTONALITY];
  timer.innerHTML = msg[lang][IDXTIMER];
  detectedChordlbl.innerHTML = msg[lang][IDXCHORD2];
  buttonLabel.innerHTML = msg[lang][IDXBTNLBLS];
}
