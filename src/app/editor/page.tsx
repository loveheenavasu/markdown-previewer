"use client";
import { useState, useEffect } from "react";
import "../style/styles.css";
import Editor from "../components/LexicalEditor";
import { FaSun, FaMoon } from "react-icons/fa";
import { Box, Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import theme from "../theme/theme";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [toggleButton, setToogleButton] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);
  const handleToogleButton = () => {
    setToogleButton((prev) => !prev);
  };
  return (
    <div>
      <main>
        {loading ? (
          <Text as="h1" className="loading">
            Please wait while Loading.....
          </Text>
        ) : (
          <Box>
            <Flex
              position={"relative"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box>
                <Text as={"h2"} className="heading">
                  MARKDOWN GENERATOR WITH LEXICAL
                </Text>
              </Box>
              <Box
                position={"absolute"}
                right={30}
                top={"29%"}
                onClick={toggleColorMode}
                cursor={"pointer"}
              >
                <Icon
                  color={toggleButton ? "" : "white"}
                  as={colorMode === "dark" ? FaSun : FaMoon}
                  width={25}
                  height={30}
                />
              </Box>
            </Flex>
            <Editor />
          </Box>
        )}
      </main>
    </div>
  );
}
