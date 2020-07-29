import { RichUtils, KeyBindingUtil } from "draft-js";

const createHighlightPlugin = () => {
  return {
    styleMap: {
      HIGHLIGHT: {
        backgroundColor: "#faed27",
      },
    },
    keyBindingFn: (event) => {
      if (
        KeyBindingUtil.hasCommandModifier(event) &&
        event.shiftKey &&
        event.key === "h"
      ) {
        return "highlight";
      }
    },

    handleKeyCommand: (command, editorState, { setEditorState }) => {
      if (command === "highlight") {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
      }
    },
  };
};

console.log(createHighlightPlugin());
export default createHighlightPlugin;
