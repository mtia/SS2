var VF =Vex.Flow;
var mc = "c/5";
var rest = "b/4";
var scorelength = 4;
var tonality = 0;
var old = -1;
var nameChord = '';



var names = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

var totscale = new Array();


for(var i=0; i<97; i++){
  totscale[i] = [i+12, names[i%12], Math.floor(i/12)];
}


// Create an SVG renderer and attach it to the DIV element named "s1".
var ext = document.getElementById("s1");
  var ext0 = document.getElementById("s0");

var renderer = new VF.Renderer(ext, VF.Renderer.Backends.SVG);
  var renderer0 = new VF.Renderer(ext0, VF.Renderer.Backends.SVG);

var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
var voice2 = new VF.Voice({num_beats: 4,  beat_value: 4});
  var prechord = new VF.Voice({num_beats: 1,  beat_value: 4});
  var prebass = new VF.Voice({num_beats: 1,  beat_value: 4});

// Size our svg:
renderer.resize(900, 300);
renderer0.resize(200,300);

// And get a drawing context:
var context = renderer.getContext();
var context0 = renderer0.getContext();

var stafflength = 700;

var stave = new VF.Stave(100, 50, stafflength);
var stave2 = new VF.Stave(100, 160, stafflength);

  var stave0 = new VF.Stave(50, 50, 150);
  var bass0 = new VF.Stave(50, 160, 150);

var lineRight = new Vex.Flow.StaveConnector(stave, stave2).setType(1); // 1 = thin line
//var lineLeft = new Vex.Flow.StaveConnector(stave, stave2).setType(6); //bar end
var brace = new Vex.Flow.StaveConnector(stave, stave2).setType(3); // 3 = brace
  brace.setContext(context).draw();


  var lineRight0 = new Vex.Flow.StaveConnector(stave0, bass0).setType(1); // 1 = thin line
  //var lineLeft0 = new Vex.Flow.StaveConnector(stave0, bass0).setType(6); //bar end
  var brace0 = new Vex.Flow.StaveConnector(stave0, bass0).setType(3); // 3 = brace
    brace0.setContext(context0).draw();

stave.addClef("treble");
stave2.addClef("bass");
  stave0.addClef("treble");
  bass0.addClef("bass");

stave.setContext(context).draw();
stave2.setContext(context).draw();

  stave0.setContext(context0).draw();
  bass0.setContext(context0).draw();

lineRight.setContext(context).draw();
lineRight0.setContext(context0).draw();
changeLang();
var toggles = document.querySelectorAll('input[type="checkbox"]');


var arr = [];
/* arr is a bidimensional array:
        - first dimension refers to the horizontal coordinate (related to the length of the score)
        - second dimension scans vertically the single chord starting from the bass note
*/

var errarr = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
/* errarr has a correspondance in position with arr, indicating errors to highlight in staves*/

var memarr = new Array(); // stack of old arr for undo operations
var memerr = new Array(); // stack of old errarr for undo operations


function cleanScore0(){
  if(prechord.getTickables().length){
    prechord.tickables[0].attrs.el.remove();

  }

  if(prebass.getTickables().length){
    prebass.tickables[0].attrs.el.remove();

  }
}

function cleanScore(){
  if(voice.getTickables().length){
    try{
    voice.tickables[0].attrs.el.remove();
    voice.tickables[1].attrs.el.remove();
    voice.tickables[2].attrs.el.remove();
    voice.tickables[3].attrs.el.remove();
    }catch(err){
      console.log(err.message);
    }
  }

  if(voice2.getTickables().length){
    voice2.tickables[0].attrs.el.remove();
    voice2.tickables[1].attrs.el.remove();
    voice2.tickables[2].attrs.el.remove();
    voice2.tickables[3].attrs.el.remove();
  }
}

function render() {

      cleanScore();

      var l = arr.length;

      var notes = new Array();
      var bass = new Array();

			for(var j=l-1; j>=0; j--){ // for each chord on the sheet
					var chord = arr[l-j-1];
          var ll = chord.length-1;
          var dx = chord.slice(1,chord.length);
          var sx = new Array(chord[0]);


          bass[4-j-1] = new VF.StaveNote({clef: "bass", keys: sx, duration: "q" });
          if(sx[0][1]=="#")
            bass[4-j-1].addAccidental(0, new VF.Accidental('#'));

          if(errarr[4-j-1]!=undefined && notes[4-j-1]!=undefined && errarr[4-j-1][0] != 0){ // painting errors on bass
            switch(errarr[4-j-1][0]){
              case TRI:
                if(toggles[0].checked)
                  bass[4-j-1].setKeyStyle(0,{ fillStyle: errarr[4-j-1][0], strokeStyle: errarr[4-j-1][0] });
                //break;
              case PAR:
                if(toggles[1].checked)
                  bass[4-j-1].setKeyStyle(0,{ fillStyle: errarr[4-j-1][0], strokeStyle: errarr[4-j-1][0] });
                //break;
              case SNS:
                if(toggles[2].checked)
                  bass[4-j-1].setKeyStyle(0,{ fillStyle: errarr[4-j-1][0], strokeStyle: errarr[4-j-1][0] });
                //break;
              case CF:
                if(toggles[3].checked)
                  bass[4-j-1].setKeyStyle(0,{ fillStyle: errarr[4-j-1][0], strokeStyle: errarr[4-j-1][0] });
                //break;
            }
          }

          if(dx.length>1){
            notes[4-j-1] = new VF.StaveNote({clef: "treble", keys: dx, duration: "q" });
            for(var i=0; i<dx.length; i++){
              if(dx[i][1]=="#")
                notes[4-j-1].addAccidental(i, new VF.Accidental('#'));

              if(errarr[4-j-1]!=undefined && errarr[4-j-1][i+1] != 0){ // painting errors on high voices


                switch(errarr[4-j-1][i+1]){
                  case TRI:
                    if(toggles[0].checked)
                      notes[4-j-1].setKeyStyle(i, { fillStyle: errarr[4-j-1][i+1], strokeStyle: errarr[4-j-1][i+1] });
                    break;console.log(errarr[4-j-1][i+1]);
                  case PAR:
                    if(toggles[1].checked)
                      notes[4-j-1].setKeyStyle(i, { fillStyle: errarr[4-j-1][i+1], strokeStyle: errarr[4-j-1][i+1] });
                    break;console.log(errarr[4-j-1][i+1]);
                  case SNS:
                    if(toggles[2].checked)
                      notes[4-j-1].setKeyStyle(i, { fillStyle: errarr[4-j-1][i+1], strokeStyle: errarr[4-j-1][i+1] });
                    break;console.log(errarr[4-j-1][i+1]);
                  case CF:
                    if(toggles[3].checked)
                      notes[4-j-1].setKeyStyle(i, { fillStyle: errarr[4-j-1][i+1], strokeStyle: errarr[4-j-1][i+1] });
                    break;console.log(errarr[4-j-1][i+1]);
                }
                console.log("analysis of errarr: "+errarr[4-j-1][i+1]);
              }
            }
          }
          else{
            notes[4-j-1] = new VF.StaveNote({clef: "treble", keys: [rest], duration: "qr" });
          }



			} // for each rest in the sheet
      for(var j = 3-l; j>=0; j--){
					notes[j] = new VF.StaveNote({clef: "treble", keys: [rest], duration: "qr" });
          bass[j]= new VF.StaveNote({clef: "bass", keys: [rest], duration: "qr" });
			}


    voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice2 = new VF.Voice({num_beats: 4,  beat_value: 4});

    voice.addTickables(notes);
    voice2.addTickables(bass);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice, voice2]).format([voice, voice2], 700);

    // Render voice
    voice.draw(context, stave);
    voice2.draw(context, stave2);
}


function render0() {

      cleanScore0();
      if(renderChord.length < 1)
        return;
      chord = buildChord(renderChord);
      //console.log(chord);


      var notes = new Array();
      var bass = new Array();

          var ll = chord.length-1;
          var dx = chord.slice(1,chord.length);//modificato
          var sx = new Array(chord[0]);

          bass[0] = new VF.StaveNote({clef: "bass", keys: sx, duration: "q" });
          if(sx[0][1]=="#")
            bass[0].addAccidental(0, new VF.Accidental('#'));

          if(dx.length){
            notes[0] = new VF.StaveNote({clef: "treble", keys: dx, duration: "q" });
            //console.log(notes);
            for(var i=0; i<dx.length; i++){
              if(dx[i][1]=="#")
                notes[0].addAccidental(i, new VF.Accidental('#'));
            }
          }
          else
          {
            notes[0] = new VF.StaveNote({clef: "treble", keys: [rest], duration: "qr" });
          }

          //notes = new VF.StaveNote({clef: "treble", keys: [rest], duration: "qr" });
          //bass = new VF.StaveNote({clef: "bass", keys: [rest], duration: "qr" });

    prechord = new VF.Voice({num_beats: 1,  beat_value: 4});
    prebass = new VF.Voice({num_beats: 1,  beat_value: 4});


    prechord.addTickables(notes);
    prebass.addTickables(bass);

    // Format and justify the notes to pixels.
    var formatter = new VF.Formatter().joinVoices([prechord, prebass]).format([prechord, prebass], 700);

    // Render voice
    prechord.draw(context0, stave0);
    prebass.draw(context0, bass0);
}


function add(b){ // b must be an array of length>0
  if(old!=-1){
    errarr.push(motionAnalysis(b, old, tonality, nameChord));
    //console.log(errarr[3]);
  }
  else
    errarr.push([0,0,0,0]);

  errarr.shift();


  old = b.slice(0,b.length);

  b = buildChord(b);
		if(arr.length>=scorelength){
			arr.shift(); // delete first chord and shift
      memarr.push(arr[0]);
      memerr.push(errarr[0]);
    }
  	arr.push(b); 		// push new chord
    render();
}

function midiToNote(n){
	return [totscale[n][1]+"/"+totscale[n][2]];
}

function buildChord(midichord){
	midichord.sort(sortNumber);
	var out = new Array();

	for(var j=0;j<midichord.length;j++)
		out = out.concat(midiToNote(midichord[j]));

	return out;

}

function undo(){
  arr.pop();
  errarr.pop();

  var popped = memarr.pop();
  var error = memerr.pop();

  if(popped!=undefined)
    arr.unshift(popped);
  else
    arr.unshift();

  if(error!=undefined)
    errarr.unshift(error);
  else
    errarr.unshift();

  render();
}

function updateNameChord(n){
  nameChord = n;
}
