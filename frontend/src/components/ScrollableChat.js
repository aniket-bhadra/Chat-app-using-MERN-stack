import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div key={message._id} style={{ display: "flex" }}></div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
