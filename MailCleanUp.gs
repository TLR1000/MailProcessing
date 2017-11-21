function cleanInbox() {
  Logger.log('cleanInbox started.');
  //main functie
  //welke labels hebben we?
  //(filters assignen Del00 en Arc00 labels)
  var labels = GmailApp.getUserLabels();
  var strWhatDo = "  ";
  var intDelay = 0;
  for (var i = 0; i < labels.length; i++) {
    strWhatDo = labels[i].getName().slice(0,3);
   
    if ((strWhatDo == "Del") || (strWhatDo == "Arc")) 
    {
      //nu alle mailthreads met deze labels verwerken 
      
      cleanThreads(labels[i].getName());
    }
    //reset
    intDelay = 0;
    strWhatdo = "";
  }
  Logger.log('cleanInbox done.');
};

function cleanThreads(strLabel) {
  //called by cleanInbox
  Logger.log('cleanThreads: invoked.');
  var strWhatDo = strLabel.slice(0,3);
  var intDelay = parseInt(strLabel.slice(3));
  var maxDate = new Date();
  
  //Deleten
  if (strWhatDo == "Del")
  {
  maxDate.setDate(maxDate.getDate()-intDelay);
  var label = GmailApp.getUserLabelByName(strLabel);
  var threads = label.getThreads(); 
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].getLastMessageDate()<maxDate)
      {
        if (threads[i].hasStarredMessages())
        {
        //SKIP
        Logger.log ('cleanThreads: skipped deleting '+threads[i].getFirstMessageSubject());
        }
        else
        {
        threads[i].moveToTrash();
        Logger.log ('cleanThreads: deleted '+threads[i].getFirstMessageSubject());
        }
      } else { }
   }
  } else { }
  
  //Archiven
  if (strWhatDo == "Arc")
  {
  maxDate.setDate(maxDate.getDate()-intDelay);
  var label = GmailApp.getUserLabelByName(strLabel);
  var threads = label.getThreads();
  for (var i = 0; i < threads.length; i++) {
    var boolInbox = threads[i].isInInbox();
    //Logger.log('cleanThreadsX: is in the inbox? : ' + boolInbox );
    if (boolInbox) //prevent re-archiving of already archived labels
    {
      if (threads[i].getLastMessageDate()<maxDate)
      {
        //Logger.log ('cleanThreadsX: threadid '+threads[i].getId());
        if (threads[i].hasStarredMessages())
        {
          //SKIP
          Logger.log ('cleanThreads: skipped archiving '+threads[i].getFirstMessageSubject());
        }
        else
        {
          threads[i].moveToArchive();
          Logger.log ('cleanThreads: archived '+threads[i].getFirstMessageSubject());
        }
        
      } 
    }  
    else { 
     //Logger.log('cleanThreads: ignored, already archived.');
   } 
  } }
  
  Logger.log('cleanThreads done.');
};//end function
