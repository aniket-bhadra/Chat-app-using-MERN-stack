export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

// ! this isSameSender logic shoule be optimized, and these 2 logics (isSameSender, isLastMessage) can be optimized such way that we can put these 2 into an one function than 2 dedicated functions-----refactor it later

export const isSameSender = (
  messages,
  currentMessage,
  currentMessageIndex,
  loginUser
) => {
  return (
    currentMessageIndex < messages.length - 1 &&
    (messages[currentMessageIndex + 1].sender._id !==
      currentMessage.sender._id ||
      messages[currentMessageIndex + 1].sender._id === undefined) &&
    currentMessage.sender._id !== loginUser
  );
};

export const isLastMessage = (messages, currentMessageIndex, loginUser) => {
  return (
    currentMessageIndex === messages.length - 1 &&
    messages[currentMessageIndex].sender._id &&
    messages[currentMessageIndex].sender._id !== loginUser
  );
};

export const isSameUser = (messages, currentMessage, currentMessageIndex) => {
  return (
    currentMessageIndex > 0 &&
    currentMessage.sender._id === messages[currentMessageIndex - 1].sender._id
  );
};
