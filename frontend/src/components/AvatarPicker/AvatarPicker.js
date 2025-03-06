import { useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Image,
  useToast,
  Text,
} from "@chakra-ui/react";

import theme from "../../constants/theme";

const avatars = [
  "https://cdn.pixabay.com/photo/2023/03/15/09/32/woman-7854120_1280.png",
  "https://cdn.pixabay.com/photo/2024/04/16/17/13/ai-generated-8700519_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/03/28/05/58/work-8660318_1280.png",
  "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
  "https://cdn.pixabay.com/photo/2022/04/01/23/47/face-7105935_1280.png",
  "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027367_1280.png",
  "https://cdn.pixabay.com/photo/2024/01/26/15/53/monster-8534186_1280.png",
  "https://cdn.pixabay.com/photo/2023/12/09/10/10/woman-8439003_1280.png",
  "https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_1280.png",
  "https://cdn.pixabay.com/photo/2015/01/22/15/13/businessman-607834_1280.png",
  "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027365_1280.png",
  "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png",
  "https://cdn.pixabay.com/photo/2024/02/20/08/40/cartoon-8584938_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/02/23/20/17/man-7031423_1280.png",
  "https://cdn.pixabay.com/photo/2017/12/26/16/58/sketch-3040895_1280.png",
  "https://cdn.pixabay.com/photo/2024/03/27/08/57/ai-generated-8658502_1280.jpg",
  "https://cdn.pixabay.com/photo/2025/01/22/20/10/ai-generated-9353031_1280.png",
  "https://cdn.pixabay.com/photo/2022/04/03/13/54/woman-7109043_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/06/25/01/46/woman-7282714_1280.png",
  "https://cdn.pixabay.com/photo/2016/11/01/21/11/avatar-1789663_1280.png",
  "https://cdn.pixabay.com/photo/2021/08/17/09/03/girl-6552421_1280.png",
  "https://cdn.pixabay.com/photo/2022/04/03/13/54/woman-7109043_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/10/18/20/15/woman-995164_1280.png",
  "https://cdn.pixabay.com/photo/2014/04/03/10/22/man-310254_1280.png",
  "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
  "https://cdn.pixabay.com/photo/2013/07/13/10/24/woman-157149_1280.png",
  "https://cdn.pixabay.com/photo/2016/04/01/09/16/actress-1299250_1280.png",
  "https://cdn.pixabay.com/photo/2023/07/04/19/43/man-8106958_1280.png",
  "https://cdn.pixabay.com/photo/2016/03/31/20/37/face-1295907_1280.png",
  "https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png",
  "https://cdn.pixabay.com/photo/2020/10/23/17/52/fox-5679446_1280.png",
  "https://cdn.pixabay.com/photo/2016/03/31/19/10/avatar-1294775_1280.png",
  "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png",
  "https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png",
  "https://cdn.pixabay.com/photo/2016/04/25/07/49/man-1351346_1280.png",
  "https://cdn.pixabay.com/photo/2014/03/25/15/23/man-296678_1280.png",
  "https://cdn.pixabay.com/photo/2016/04/25/12/06/man-1351761_1280.png",
  "https://cdn.pixabay.com/photo/2019/02/22/17/04/man-4013984_1280.png",
  "https://cdn.pixabay.com/photo/2014/04/03/09/59/head-309540_1280.png",
];

const funLines = [
  "Wow, looking sharp with your new avatar!",
  "Nice choice! That avatar really suits you.",
  "Great pick! Your new avatar is looking fantastic.",
  "I'm loving the new look you've got with that avatar.",
  "That avatar is perfect for you! You're looking awesome.",
  "Excellent choice! Your avatar is now the envy of all the other avatars.",
  "That avatar really brings out your best features! Looking great.",
  "Nice job! You've got a great eye for choosing avatars.",
  "Your new avatar is looking fresh and stylish!",
  "With that avatar, you're ready to take on the world! Great choice.",
  "Looking good!",
  "Nice choice!",
  "That's a great look for you!",
  "You rock that avatar!",
  "Wow, you're looking stylish!",
  "I'm loving this new look on you!",
  "You're a natural at picking avatars!",
  "You're bringing your A-game with that avatar!",
  "That avatar was made for you!",
];
let checkingAvatar = null;
function AvatarPicker(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [funStrings, setFunStrings] = useState("");
  const toast = useToast();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    if (!checkingAvatar) {
      toast({
        title: "Please Select an Avatar!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  //generating fun lines
  const getMeRandomLines = (arrayOfLines) => {
    const randomIndex = Math.floor(Math.random() * arrayOfLines.length);
    return arrayOfLines[randomIndex];
  };

  const handleAvatarClick = (avatar) => {
    let randomStrings = getMeRandomLines(funLines);
    if (avatar !== selectedAvatar) {
      setFunStrings(randomStrings);
    } else {
      setFunStrings("Looks like you're sticking with a classic!");
    }
    setSelectedAvatar(avatar);
    props.avatarHandler(avatar);
    checkingAvatar = "success";
    handleClose();
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
        <Button
          onClick={handleOpen}
          bg={theme.tertiary}
          color="white"
          _hover={{ bg: theme.secondary, color: theme.primary }}
        >
          {selectedAvatar ? "Change your avatar" : "Pick your avatar"}
        </Button>
      </Box>

      {selectedAvatar && (
        <div>
          <Text
            color={theme.tertiary}
            fontSize="md"
            fontStyle="italic"
            mb={3}
            textAlign="center"
          >
            {funStrings}
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar
              name="Avatar"
              src={selectedAvatar}
              size="xl"
              borderRadius="full"
              borderWidth="3px"
              borderColor={theme.orange}
            />
          </Box>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={handleClose} size="sm">
        <ModalOverlay />
        <ModalContent bg={theme.light}>
          <ModalHeader>Select your avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            maxH="200px"
            overflowY="scroll"
            sx={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "gray.300",
                borderRadius: "4px",
              },
            }}
          >
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {avatars.map((avatar) => (
                <GridItem key={avatar}>
                  <Image
                    src={avatar}
                    alt="Avatar"
                    boxSize="100px"
                    cursor="pointer"
                    onClick={() => handleAvatarClick(avatar)}
                  />
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AvatarPicker;
