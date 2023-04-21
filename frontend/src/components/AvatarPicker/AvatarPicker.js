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
} from "@chakra-ui/react";

const avatars = [
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556781.jpg?t=st=1682091288~exp=1682091888~hmac=07337d213b8d16b3f7b11aa52e78fb0b68ccafd86edc9f95414a2113b2cd34a8",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556783.jpg?w=740&t=st=1682091189~exp=1682091789~hmac=c635abaa0beb196b40bb356cab618942b5a715625409184b4e8e6c8a79ccb556",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556777.jpg?w=740&t=st=1682091283~exp=1682091883~hmac=3eb57ec6f8b5fc12dddba37ed652c90831c12fcd84c2b64e8204f2798844b873",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556784.jpg?w=740&t=st=1682091508~exp=1682092108~hmac=196747a5c9e89e3cc2a6f3c711bcb90cb564b5fe68abaeaf56ee335780ce09b2",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556780.jpg?t=st=1682091288~exp=1682091888~hmac=cf3805ddbc4ae653721a5ad7740f95960d7bc3cf0ef7468ff3c57bcae89e334c",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556779.jpg?t=st=1682091288~exp=1682091888~hmac=5dece25070af1825e97188dcb21f3bda90c006f4dacfc4f5868b5bd2913a0f03",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556778.jpg?w=740&t=st=1682091621~exp=1682092221~hmac=2627e8a0036e784fd3f03cae8a2a9c42712015dbbe3d00ad4a78ecb293710cc3",
  "https://img.freepik.com/free-vector/cute-astronaut-with-sword-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated_138676-4773.jpg?w=740&t=st=1682078756~exp=1682079356~hmac=b9529278ca9d19f451a95eef2da73de9446be8008acb2da84fa691078b0dcd6d",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556782.jpg?w=740&t=st=1682091564~exp=1682092164~hmac=6930bbce5bb6d0b0559be48a83f9bcb837421ca7fb939c9d676bc0e01673d6e0",
  "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1682091872~exp=1682092472~hmac=368f8c90314d17a7c01fee9985d163115316f96f144ddef88ebab72cc0816b25",
  "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556786.jpg?w=740&t=st=1682091722~exp=1682092322~hmac=07989bf277d26391e6cc5bc95f26feeb35046d1ecfc0f3d3b6c644d651928b7e",
  "https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?t=st=1682087635~exp=1682088235~hmac=6cd4e6e99fabf323cf276c2fe2985066369332f7e2b94821f21a31e1d0c3f34c",
  "https://img.freepik.com/free-vector/mysterious-gangster-character-concept_23-2148474062.jpg?w=740&t=st=1682092415~exp=1682093015~hmac=8142c9682afc21deb63e1a6683e4333d697c100e995e7076afaad65b3fa58436",
  "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg",
  "https://img.freepik.com/free-vector/cool-beard-man-barber-head-with-glasses-cartoon-vector-icon-illustration-people-barber-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3960.jpg?w=740&t=st=1682092848~exp=1682093448~hmac=bb042383487751eec126a31954db3d3f587e17b6541eec650893ec352f349a08",
  "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436181.jpg?t=st=1682069023~exp=1682069623~hmac=4c9c79f3a0160fca3344cbe2f763d05b82c89b9f13138aa866ede80e48613bd1",
  "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?w=740&t=st=1682092099~exp=1682092699~hmac=2d592c912c4d821e9913a80fa657ce17b0abea08f9b19da06774a35d17d97e78",
  "https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hat_23-2149436195.jpg?w=740&t=st=1682092245~exp=1682092845~hmac=52b828b601fa032f44d58f73df3732603d0f2529132622ba5cced60a5702349f",
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
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button onClick={handleOpen}>
          {selectedAvatar ? "Change your avatar" : "Pick your avatar"}
        </Button>
      </Box>

      {selectedAvatar && (
        <div>
          <p style={{ textAlign: "center" }}>{funStrings}</p>
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
