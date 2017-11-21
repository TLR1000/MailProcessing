/**
 * Retrieves all inbox threads and logs the respective subject lines.
 * For more information on using the GMail API, see
 * https://developers.google.com/apps-script/class_gmailapp
 */
function processInbox() {
  // get all threads in inbox
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    // get all messages in a given thread
    var messages = threads[i].getMessages();
    // iterate over each message
    for (var j = 0; j < messages.length; j++) {
      // log message subject
      Logger.log(messages[j].getSubject());
    }
  }
};

/**
 * Retrieves a given user label by name and logs the number of unread threads
 * associated with that that label.
 * For more information on interacting with GMail labels, see
 * https://developers.google.com/apps-script/class_gmaillabel
 */
function processLabel(labelName) {
  // get the label for given name
  var label = GmailApp.getUserLabelByName(labelName);
  // get count of all threads in the given label
  var threadCount = label.getUnreadCount();
  Logger.log(threadCount);
};


/**
 * Marks the email thread with the specified ID as important.
 * For more information on interacting with GMail threads, see
 * https://developers.google.com/apps-script/class_gmailthread
 */
function markThreadImportant(threadId) {
  var thread = GmailApp.getThreadById(threadId);
  thread.markImportant();
};
