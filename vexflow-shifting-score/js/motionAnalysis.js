
function motionAnalysis(newChord, oldChord, tonality, nameChord){
  var newlen = newChord.length;
  var oldlen = oldChord.length;
  var errors = new Array(newlen);
  var txt = document.getElementById('logarea');
  errors.fill(0);


  // MOTION
  var motion = new Array(newlen);
  if( oldlen = newlen)
    for(var i=0; i<newlen; i++){
      motion[i] = (newChord[i]-oldChord[i]);
      //console.log("---> motion "+i+": "+newChord[i]+" - "+oldChord[i]);
    }


  //  TRITONE ERROR
  for(var i=0; i<newlen; i++)
    for(var j=0; j<oldlen; j++)
      if( Math.abs(newChord[i]-oldChord[j]) == 6)     // if a note is a tritone distant from a past note
        if( newChord[i] != oldChord[i] ){               // if the tritone wasn't already present in oldChord
          errors[i] = TRI;
          //console.log("---xxx---> tritone");
          txt.innerHTML = "<p style=\"color: blue\">"+" ["+nameChord+"]: "+msg[lang][IDXTRI1]+(i+1)+msg[lang][IDXTRI2]+(j+1)+"</p>"+txt.innerHTML;
        }

  // HIDDEN PARALLEL INTERVALS
  var check;
  if( oldlen = newlen)
    for(var i=1; i<newlen; i++)
      for(var j=0; j<i; j++){
        check = (newChord[i]-newChord[j])%12;
        if(check==0 || check%7==0) // if the interval is fifth or octave
          if(Math.sign(motion[i]) == Math.sign(motion[j])){ // and it's reached by moto recto
            errors[i]=PAR;
            errors[j]=PAR;
            txt.innerHTML = "<p style=\"color: brown\">"+" ["+nameChord+"]: "+msg[lang][IDXPAR1]+i+" & "+j+" "+msg[lang][IDXPAR2]+"</p>"+txt.innerHTML;
          }
      }


  
  return errors;
}
