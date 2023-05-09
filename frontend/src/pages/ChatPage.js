import { Box } from "@chakra-ui/react";

import { useChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";

const ChatPage = () => {
  const { user } = useChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box>
        {user && <MyChats />}
        {/* {user && <ChatBox />} */}
      </Box>
    </div>
  );
};

export default ChatPage;
