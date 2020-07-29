import { getDefaultKeyBinding, RichUtils, KeyBindingUtil } from "draft-js";

const basicTextStylePlugin = {
  keyBindingFn(event) {
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "7"
    ) {
      return "ordered-list";
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "8"
    ) {
      return "unordered-list";
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "9"
    ) {
      return "blockquote";
    }
    return getDefaultKeyBinding(event);
  },

  handleKeyCommand(command, editorState, { getEditorState, setEditorState }) {
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);

    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }
    return "not-handled";
  },
};

export default basicTextStylePlugin;
