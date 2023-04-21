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
} from "@chakra-ui/react";

const avatars = [
  "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1682078075~exp=1682078675~hmac=5945e5498b1cedc5ef1a3d511d4af0c40501a45760598c919441edb7a9a8e326",
  "https://img.freepik.com/free-vector/handsome-man_1308-85984.jpg?w=740&t=st=1682078083~exp=1682078683~hmac=a42e4f99b6efabd07d35d4c21b98bc8a14899b63f07b73ce93968399f4a22a18",
  "https://img.freepik.com/free-vector/cartoon-businesswoman-working-with-laptop-gesture-pose-clip-art_40876-3410.jpg?w=740&t=st=1682078087~exp=1682078687~hmac=7c6a32c810fee832292c308d4015a53111037234cf1f46af61430a548eff4859",
  "https://img.freepik.com/free-vector/smiling-woman-character-hand-drawn-cartoon-vector-art-illustration_56104-2185.jpg?w=740&t=st=1682078478~exp=1682079078~hmac=62d488a55fcf34a8484c33626ad7c5c7d10e7281214fa978f925b3f4bebeba7b",
  "https://img.freepik.com/free-vector/cute-boy-standing-position-showing-thumb_96037-450.jpg?w=826&t=st=1682078503~exp=1682079103~hmac=29a98b97652d7381866398785ef813c5b750115ce188df09d571c51327c48bfc",
  "https://img.freepik.com/free-psd/33-rendering-back-highschool-visual_23-2149577085.jpg?w=740&t=st=1682078557~exp=1682079157~hmac=7b9a1b9e6d6f3418f42298b89402c4bfb58da6b447963e7d5b631a7ce2da430d",
  "https://img.freepik.com/free-photo/fun-3d-cartoon-casual-character_183364-80985.jpg?w=740&t=st=1682078608~exp=1682079208~hmac=5bda94f421b9702240b42ec50a341e816d7abdf681b00b46134d40e3b9b98980",
  "https://img.freepik.com/free-vector/cute-astronaut-with-sword-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated_138676-4773.jpg?w=740&t=st=1682078756~exp=1682079356~hmac=b9529278ca9d19f451a95eef2da73de9446be8008acb2da84fa691078b0dcd6d",
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60564.jpg?w=740&t=st=1682078784~exp=1682079384~hmac=a30422f930bcbc56b2f46f2b2c30880f763e8f28521546773f18f13ec6878faa",
  "https://img.freepik.com/free-psd/3d-rendering-travel-tourist_23-2149667951.jpg?w=740&t=st=1682078818~exp=1682079418~hmac=38fa695f62e156fb94173e8aef0150566d8337fb5c66f4ca38e49095ceae2556",
  "https://img.freepik.com/free-photo/fun-3d-cartoon-teenage-boy_183364-81177.jpg?w=740&t=st=1682078847~exp=1682079447~hmac=27efb18d3c6c4dc273f9204e6f6c82ee1c828d580ca308b767b6c0334a041e92",
  "https://img.freepik.com/free-psd/3d-illustration-male-character-pose-looking-victorious_23-2149504000.jpg?w=740&t=st=1682078872~exp=1682079472~hmac=0da97522fed358a7c29087eb553aeb5d245d41b33085f3ddf9954d19c4cdf5bc",
  "https://img.freepik.com/free-psd/3d-tourist-sit-paper-plane_1150-56174.jpg?w=740&t=st=1682078920~exp=1682079520~hmac=bfe8eff60fe873a571bb18248dcdd5892c65a1a0b12c2b65433a5d3fbd5eb455",
  "https://img.freepik.com/free-psd/business-man-illustration_1150-59004.jpg?w=740&t=st=1682078957~exp=1682079557~hmac=1174c272f70b1466bbdeebe26b17401c6e3faac1245054181dec2df5c14ee351",
  "https://img.freepik.com/free-photo/fun-3d-illustration-cartoon-man-with-vr-helmet_183364-80993.jpg?w=740&t=st=1682079057~exp=1682079657~hmac=76bab36e79c1b96baae4daa2c191d5337c042a997de45d9f23ae6b8db3c3db32",
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60561.jpg?w=740&t=st=1682079094~exp=1682079694~hmac=d59cfa0ca7f204e9d1abe00cd77a781c260805196edca3b8a472259bcbbff733",
  "https://img.freepik.com/free-psd/3d-rending-mike-playing-sport_23-2149321184.jpg?w=900&t=st=1682079305~exp=1682079905~hmac=02308097e322b95125220a8517bba78d5ded6be8ac3fc8d9d0445c0359b7b7f4",
  "https://img.freepik.com/free-psd/3d-female-character-holding-social-media-heart-button_23-2148938908.jpg?w=740&t=st=1682079341~exp=1682079941~hmac=6c7fea163e2ffaf596d8676174d24cff42df0e6fd0137360661ec570e8053918",
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

function AvatarPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  //generating fun lines
  const getMeRandomLines = (arrayOfLines) => {
    const randomIndex = Math.floor(Math.random() * arrayOfLines.length);
    return arrayOfLines[randomIndex];
  };
  let randomStrings = getMeRandomLines(funLines);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    handleClose();
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button onClick={handleOpen}>
          {selectedAvatar ? "Change your avatar" : "Pick your avatar"}
        </Button>
      </Box>

      {selectedAvatar && (
        <div>
          <p style={{ textAlign: "center" }}>{randomStrings}</p>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar name="Avatar" src={selectedAvatar} size="xl" />
          </Box>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={handleClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select your avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            maxH="400px"
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
