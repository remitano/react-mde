import * as React from "react";
import ReactDOM from "react-dom";
import { Box, ChakraProvider, HStack, Textarea } from "@chakra-ui/react";
import { useTextAreaMarkdownEditor } from "../src/hooks/use-markdown-editor";
import { faBold, faItalic, faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bold, code, italic } from "../src";
import { ToolbarButton } from "./toolbar-button";

export type DemoProps = {};

export const Demo: React.FunctionComponent<DemoProps> = () => {
  const { ref, commandController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: bold,
      italic: italic,
      code: code
    }
  });

  return (
    <ChakraProvider>
      <Box p={3}>
        <HStack py={2}>
          <ToolbarButton
            onClick={async () => {
              await commandController.executeCommand("bold");
            }}
          >
            <FontAwesomeIcon icon={faBold} />
          </ToolbarButton>
          <ToolbarButton
            onClick={async () => {
              await commandController.executeCommand("italic");
            }}
          >
            <FontAwesomeIcon icon={faItalic} />
          </ToolbarButton>
          <ToolbarButton
            onClick={async () => {
              await commandController.executeCommand("code");
            }}
          >
            <FontAwesomeIcon icon={faCode} />
          </ToolbarButton>
        </HStack>
        <Textarea
          ref={ref}
          placeholder="I'm a markdown editor"
          fontFamily={"monospace"}
        />
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));

export default Demo;