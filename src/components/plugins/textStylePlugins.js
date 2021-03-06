import { getDefaultKeyBinding, RichUtils, KeyBindingUtil } from "draft-js";

const basicTextStylePlugin = {
  keyBindingFn: (event) => {
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "x"
    ) {
      return "strikethrough";
    }
    return getDefaultKeyBinding(event);
  },

  handleKeyCommand: (
    command,
    editorState,
    { getEditorState, setEditorState }
  ) => {
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (!newEditorState && command === "strikethrough") {
      newEditorState = RichUtils.toggleInlineStyle(
        editorState,
        "STRIKETHROUGH"
      );
    }

    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }
    return "not-handled";
  },
};

export default basicTextStylePlugin;
