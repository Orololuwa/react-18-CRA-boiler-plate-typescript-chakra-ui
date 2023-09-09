import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import { IconType } from "react-icons";
import HeaderNav from "./nav";
import { WithIconLink } from "core/components/nav-link/with-icon";
import { Logo } from "core/components/logo";
import Content from "./content";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, to: "/dashboard" },
  { name: "Trending", icon: FiTrendingUp, to: "/dashboard" },
  { name: "Explore", icon: FiCompass, to: "/dashboard" },
  { name: "Favourites", icon: FiStar, to: "/dashboard" },
  { name: "Settings", icon: FiSettings, to: "/dashboard" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <WithIconLink key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </WithIconLink>
      ))}
    </Box>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <HeaderNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Content />
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
