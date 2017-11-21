
function cleanArchive() {
  //remove all Arc* labels from archived messages
   var threads = GmailApp.search('is:unread -in:inbox', 0, 50);
  for (var i=0; i<threads.length; i++) {
    // Does the message thread have any user-assigned labels
    var labels = threads[i].getLabels();
    if (labels.length == 0) {
      // Mark the entire thread as read
      threads[i].markRead();
    }
  }
  
};

function myFunction() {
 cleanThreadsX("Arc30");
};


function cleanThreadsX(strLabel) {
  //called by cleanInbox
  Logger.log('cleanThreadsX: invoked with parameter:'+strLabel);
  var strWhatDo = strLabel.slice(0,3);
  var intDelay = parseInt(strLabel.slice(3));
  var maxDate = new Date();
  
  //Archiven
  if (strWhatDo == "Arc")
  {
  maxDate.setDate(maxDate.getDate()-intDelay);
  var label = GmailApp.getUserLabelByName(strLabel);
  var threads = label.getThreads();
  for (var i = 0; i < threads.length; i++) {
    var boolInbox = threads[i].isInInbox();
    Logger.log('cleanThreadsX: is in the inbox? : ' + boolInbox );
    if (boolInbox) 
    {
      if (threads[i].getLastMessageDate()<maxDate)
      {
        Logger.log ('cleanThreadsX: threadid '+threads[i].getId());
        if (threads[i].hasStarredMessages())
        {
          //SKIP
          Logger.log ('cleanThreadsX: skipped archiving '+threads[i].getFirstMessageSubject());
        }
        else
        {
          threads[i].moveToArchive();
          Logger.log ('cleanThreadsX: archived '+threads[i].getFirstMessageSubject());
        }
        
      } 
    }  
    else { 
     Logger.log('cleanThreadsX: ignored, already archived.');
   } 
 } 
  
  Logger.log('cleanThreadsX done.');
};//end function



function DummycleanInbox() {
  //main functie
  //welke labels hebben we?
  //(filters assignen Del00 en Arc00 labels)
  var labels = GmailApp.getUserLabels();
  var strWhatDo = "  ";
  var intDelay = 0;
  
  var nrLabels = 0;
  
  for (var i = 0; i < labels.length; i++) {
    strWhatDo = labels[i].getName().slice(0,3);
    Logger.log (' ');
    Logger.log('I:label:'+labels[i].getName());
    Logger.log ('I:slice: '+strWhatDo);
    
    if ((strWhatDo == "Del") || (strWhatDo == "Arc")) 
    {
      //nu alle mailthreads met deze labels verwerken 
      nrLabels = nrLabels + 1;
      DummycleanThreads(labels[i].getName());
    }
    //reset
    intDelay = 0;
    strWhatdo = "";
  }
  Logger.log('Aantal labels processed:'+nrLabels);
};

function DummycleanThreads(strLabel) {
  //called by cleanInbox
  var strWhatDo = strLabel.slice(0,3);
  var intDelay = parseInt(strLabel.slice(3));
  var maxDate = new Date();
  Logger.log ('T:-what: '+strWhatDo);   
  Logger.log ('T:-delay: '+intDelay);   
 
//  var delayDays = 2 // Enter # of days before messages are moved to trash
  
  //Deleten
  if (strWhatDo == "Del")
  {
 
  Logger.log ('T:Deleten');
  maxDate.setDate(maxDate.getDate()-intDelay);
  var label = GmailApp.getUserLabelByName(strLabel);
  var threads = label.getThreads();
  Logger.log ('T:-aantal threads: '+threads.length);  
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].getLastMessageDate()<maxDate)
      {
        if (threads[i].hasStarredMessages())
        {
        //SKIP
        Logger.log ('T:-STARRED: '+threads[i].getFirstMessageSubject()); 
        }
        else
        {
        //threads[i].moveToTrash();
        Logger.log ('T:-move to trash: '+threads[i].getFirstMessageSubject());   
        }
      } else { Logger.log ('T:-te jong'+threads[i].getLastMessageDate());}
   }
  } else { Logger.log ('T:false "Del"');}
  
  //Archiven
  if (strWhatDo == "Arc")
  {
  Logger.log ('T:Archiven');
  maxDate.setDate(maxDate.getDate()-intDelay);
  var label = GmailApp.getUserLabelByName(strLabel);
  var threads = label.getThreads();
  Logger.log ('T:-aantal threads: '+threads.length);  
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].getLastMessageDate()<maxDate)
      {
        if (threads[i].hasStarredMessages())
        {
        //SKIP
        Logger.log ('T:-STARRED: '+threads[i].getFirstMessageSubject()); 
        }
        else
        {
        //threads[i].moveToArchive();
        //threads[i].removeLabel();
        Logger.log ('T:-move to archive: '+threads[i].getFirstMessageSubject());   
        Logger.log ('T:-removelabel: '+threads[i].getFirstMessageSubject()); 
        }
      } else { Logger.log ('T:-te jong'+threads[i].getLastMessageDate());}
   }
  } else { 
    Logger.log ('T:false "Arc"');
  }
}
  
};//end function
